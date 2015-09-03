---
layout: post
title: "Improved Protocol-Oriented Programming with Untyped Type Aliases, Part 2"
date: 2015-09-03 16:00:00
author: Michi Kono
tags: [swift, ios, mobile, protocal oriented programming]
category: blog
---

*This is part two of a series that explores the topic of using a typealias as a generic inside protocols. Part one can be found [here](http://www.capitalone.io/blog/improved-protocol-oriented-programming-untyped-type-aliases/).*

In the last article, we learned how a `typealias` can serve as a generic when not explicitly set to a specific type. 

It turns out that adding inheritance (and classes) to the mix causes new problems. These problems are crucial to overcome if you plan to build on top of existing data structures that leverage generics. By the end, you should understand how to use the strategies covered to achieve common design patterns. To follow along, it is expected that you know the basics around [generics](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID180) and [type aliases](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID361).

*We recommend you copy and paste the sample code into Xcode as you read along, or you can use the accompanying [Playground file](https://github.com/michikono/swift-using-typealiases-as-generics-2).*

## Inheritance and Generics

When attempting to perform inheritance with a generic class, things can get tricky. This might seem like something you wouldn’t do often, but you might see this in action when trying to extend a collection such as `Dictionary` or `Array`.

To illustrate, let's create a Pet and Inspector concept.

```
class Pet {}
class Inspector<P> {}
```

`Inspector` is a generic class that has an unused generic type called `P`. In theory, you could use `Inspector` like this:

```
let inspector = Inspector<Pet>()
```

In this case, within `Inspector`, any usage of `P` would need to adhere to `Pet`’s protocol. Things feel a little strange when you extend Inspector and add a new generic concept. The parent class can have its own generic, but its generic is completely unrelated to the child:

```
class FurnitureInspector<C: Chair>: Inspector<C> {
    func getMaterials(thing: C) -> Wood {
        return thing.mainMaterial()
    }
}
```

It may not be immediately obvious that `C` is actually extending `Chair` in this example. This means `Chair` cannot be defined as a struct and must be a class. You may also be surprised to know that the generic definition provided to `Inspector` can be unrelated to `FurnitureInspector`’s:

```
class FurnitureInspector<C: Chair>: Inspector<Pet> {
```

You would then use this class like this:

```
let inspector = FurnitureInspector<Chair>()
inspector.getMaterials(Chair())
```

When dealing with concrete types as a generic, an interesting thing happens. You are able to omit their inclusion in the implementation. The previous two lines are equivalent to the following:

```
let inspector = FurnitureInspector()
inspector.getMaterials(Chair())
```

Because `<C: Chair>` is a concrete class, it is inferred that it is being provided during the initializer. There are times where this scenario does not always involve a concrete class, which we will explore next.

## A Type Alias as a Return Type
The return type of `inspector.mainMaterial()` is `Wood` because `Chair` was used, but what happens if it was `Lamp` instead? As in:

```
let inspector = FurnitureInspector()
inspector.getMaterials(Lamp()) <<< Error
```

This code errors because `FurnitureInspector` expects `C = Chair`. We need to alter the generic declaration so that it supports `Lamp` OR `Chair`. But it is more difficult than that; changing `C`'s type from `Chair` to `Furniture` is not enough. Pay special attention to this line in `getMaterials()`:

```
func getMaterials(thing: C) -> Wood {
```

Do you see the problem? It is expecting `Wood` to always return, but we cannot guarantee that as soon as we change `C` to be something more generic than `Chair` (for example, `Lamp` is made of `Glass`). To get around this, we have to access the type alias directly (pay special attention to the `C.M` line):

```
class FurnitureInspector<C: Furniture>: Inspector<Pet> {
    func getMaterials(thing: C) -> C.M {
        return thing.mainMaterial()
    }
}

let inspector1 = FurnitureInspector<Chair>()
inspector1.getMaterials(Chair())

let inspector2 = FurnitureInspector<Lamp>()
inspector2.getMaterials(Lamp())
```

The change to `<C: Furniture>` forces us to provide a concrete class (as mentioned earlier). We also use the type alias name directly, which you can see as `C.M`. This correlates to this line in `Furniture`:

```
typealias M: Material
```

The `C` is defined in the `FurnitureInspector` and could have been any other name. In fact, Xcode should have autosuggested `M` as you typed in `C`:

![Dashboard]({{ site.baseurl }}/assets/posts/improved-protocol-oriented-programming-untyped-type-aliases/swift-typealias-generics-code1.png)

## Constraining Generics using WHERE

So far, we’ve learned how to constrain a `typealias`. When implementing an actual generic, you are able to constrain it using the `where` keyword in a much more powerful way than what a `typealias` can do. For example, you can constrain the generic type based on the value of a `typealias`.

Let’s say we add a new `typealias` to `Furniture` called `A`:

```
protocol Furniture {
    typealias A
    func label() -> A
    // rest of protocol ... 
}
```

And then we implement `label()`:

```
class Chair: Furniture {
    func label() -> Int {
        return 0
    }
    // rest of Chair class ... 
}

class Lamp: Furniture {
    func label() -> String {
        return ""
    }
    // rest of Lamp class ... 
}
```

Again, we are relying on Swift to infer the type of `A`. In this case, we have elected for different signatures between `Chair` and `Lamp`. Now for changes to the generic constraint:

```
class FurnitureInspector<C: Furniture where C.A == Int> {
    func calculateLabel(thing: C) -> C.A {
        return thing.label()
    }
}

let inspector1 = FurnitureInspector<Chair>()
let inspector2 = FurnitureInspector<Lamp>() <<< Error
```

In the above code, `FurnitureInspector` requires that `C` (instance of `Furniture`) implements a method `label()` that returns an `Int`. The second inspector fails because `Lamp` implements a `label()` method that returns something that is not an `Int`. Much like before, we could even constrain the protocol’s definition of `A`. For example, we can constrain it to `Any` just to show it can be done:

```
protocol Furniture {
    typealias A: Any
    func label() -> A
}
```

Protocols, combined with inferred type aliases, can make keeping track of types confusing. Don’t fret. The compiler will almost certainly know exactly what is going on. But it is a good practice to be careful when casting objects involving generics. The obvious example of this in the wild is when dealing with dictionaries and arrays of mixed types (e.g., an `Array` of `Any`).

## Implementing Patterns

In the previous article, we looked at objects in charge of initializing themselves in a static method (for a Factory pattern). What about in the case of a separate class or service being delegated this responsibility? For example, if you were building an ORM, you might have a `ModelFactory` that spits out objects implementing a `Model` protocol (e.g., `UserModel`). How well does Swift handle things then?

Here is an example of a service responsible for building furniture:

```
////// Error
class FurnitureMaker<C: Furniture> {
    func make() -> C {
        return C()
    }
    
    func material(furniture: C) -> C.M {
        return furniture.mainMaterial()
    }
}
```

The above code does NOT work, but we’ll fix that. It’s actually very close to working as is. This class will do two things:

1. Build and return `Furniture` objects. This is a simple example, but you can imagine the `make()` method accessing a service registry, for example, to return instances appropriate to the environment, such as during testing.
2. `material()` acts as a delegator for calling `mainMaterial()`. Again, we can think about how `material()` might encapsulate other logic such as logging or aggregating more complex behavior.

The above code breaks because C does not have any initializers according to Xcode.

![Dashboard]({{ site.baseurl }}/assets/posts/improved-protocol-oriented-programming-untyped-type-aliases/swift-typealias-generics-code2.png)

In order to fix the above code, we must add it into the protocol:

```
protocol Furniture {
    init()
    // rest of protocol ... 
    typealias M: Material
    func mainMaterial() -> M
}
```

Then we need to add `init()` declarations to each `Furniture` definition:

```
class Chair: Furniture {
    required init() {}
    
    func mainMaterial() -> Wood {
        return Wood()
    }
} 
class Lamp: Furniture {
    required init() {}
    
    func mainMaterial() -> Glass {
        return Glass()
    }
}
```

Now we can use our factories:

```
let chairMaker = FurnitureMaker<Chair>()
let chair1 = chairMaker.make()
let chair2 = chairMaker.make()
chairMaker.material(chair2) // returns Wood

let lampMaker = FurnitureMaker<Lamp>()
let lamp = lampMaker.make()
lampMaker.material(lamp) // returns Glass
```

Earlier, we discovered that if a concrete class is used in a generic class declaration, we can omit it during initialization. We can actually clean up the implementation at the expense of the class declaration (note that in Swift 1.x, you need `<C:Chair>` added to `ChairMaker`'s declaration):

```
class ChairMaker: FurnitureMaker<Chair> {}

let betterChairMaker = ChairMaker()
let chair3 = betterChairMaker.make()
let chair4 = betterChairMaker.make()
betterChairMaker.material(chair4) // returns Wood
```

The caller does not need to worry about passing in `Chair` each time they create a `FurnitureMaker` because `ChairMaker` implicitly handles it for them. You might write something like this if you were creating a model service, for example.

## Wrapping Up

We covered how inheritance showcases a few quirks in generic classes in Swift. We also learned that the compiler keeps track of much of this complexity for you. Finally, we learned about how to restrict a generic or `typealias` to a subset of types. Using this knowledge, my hope is that you can achieve better abstraction in your code. Many of these concepts are universal across typed languages.

At Capital One, we are excited at the new constructs that Swift enables. We strive to leverage the latest and greatest technologies and are working hard to give back to the community in the form of insights, knowledge, and [open source](https://github.com/capitalone). I hope this article demystifies for you some of the darker corners of Swift, but if you have any questions, please reach out!
