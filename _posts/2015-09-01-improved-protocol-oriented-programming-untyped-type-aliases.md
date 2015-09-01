---
layout: post
title: "Improved Protocol-Oriented Programming with Untyped Type Aliases"
date: 2015-09-01 16:35:00
author: Michi Kono
tags: [swift, ios, mobile, protocal oriented programming]
category: blog
---
[Protocol-Oriented Programming](https://developer.apple.com/videos/wwdc/2015/?id=408) is crucial to writing great Swift code. But the reusability of a protocol is greatly restricted because Swift explicitly disallows adding generics to one. This can be overcome by using an untyped typealias as a generic — something most Swift developers have never seen.

*This is the first of a two-part series that explores the topic of using a typealias as a generic inside protocols. We recommend you copy and paste the sample code into Xcode as you read along, or you can use the accompanying [Playground file](https://github.com/michikono/swift-using-typealiases-as-generics-1).*

## A Generic Crash Course
Before we can explore the purpose of an untyped `typealias`, we will briefly discuss generics to ensure all readers can follow along.

A generic is a way is to limit a variable to a specific protocol at compile time. This means avoiding run time checks (`let` ... `as`). For example, let’s say we create a consistent interface between two types for "adding one."

```
extension Int {
    func addOne() -> Int {
        return self + 1
    }
}

extension String {
    func addOne() -> String {
        return self + "1"
    }
}
```

Then, we wrap these in an increment method that works with both interfaces:

```
func increment(foo: Any) -> Any {
    if let fooStr = foo as? String {
        return fooStr.addOne()
    }
    else if let fooInt = foo as? Int {
        return fooInt.addOne()
    }
    fatalError("unknown type can't addOne")
}

increment("foo")
increment(1)
increment(1.0) // <== this causes a runtime error
```

This particular code is dangerous because you wouldn’t catch the issue while compiling (e.g., a production bug). Another approach might leverage a generic. First, you would add a protocol to the previous extensions:

```
protocol CanAddOne {
    func addOne() -> Self
}

extension Int: CanAddOne {
    func addOne() -> Int {
        return self + 1
    }
}

extension String: CanAddOne {
    func addOne() -> String {
        return self + "1"
    }
}
```

And now you could rewrite the increment method to check if the argument conforms to `CanAddOne`:

```
func incrementBetter<T: CanAddOne>(foo: T) -> T {
    return foo.addOne()
}

incrementBetter("foo")
incrementBetter(1)
incrementBetter(1.0) // <== compile error
```

The `T` represents any type that conforms to `CanAddOne`. We now gain compile time checking for code that previously required runtime checks. This concept is leveraged heavily in situations where we only need a subset of functionality from an object or objects. This is most readily seen when working with Arrays or Dictionaries, but is also extremely common in Cocoa.

The problem is that generics and protocols do not play well together in Swift. To use them together, you must use a `typealias` instead. From this point forward, you should understand the basics around [generics](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID180).

## Inferred Type Aliases

Did you know you could write a [`typealias`](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID361) in a protocol without specifying what it is an alias for? For example, in the following code, `M` is inferred in the implementation. Notice how `Chair` and `Lamp` have different return types for the methods in question. 

```
protocol Furniture {
    typealias M
    func mainMaterial() -> M
    func secondaryMaterial() -> M
}

struct Chair: Furniture {
    func mainMaterial() -> String {
        return "Wood"
    }
    func secondaryMaterial() -> String {
        return "More wood"
    }
}

struct Lamp: Furniture {
    func mainMaterial() -> Bool {
        return true
    }
    func secondaryMaterial() -> Bool {
        return true
    }
}
```

The above code assumes `M` (which could have been any unused identifier) is unknown within the protocol but should be consistent once inside any implementation. So in this example, changing only one return type would cause an error:

```
struct Stool: Furniture { <<< does not conform to Furniture
    func mainMaterial() -> String {
        return "Wood"
    }
    func secondaryMaterial() -> Bool {
        return false 
    }
}
```

In the above examples, `M` can be anything, but we can actually constrain it. For example, let’s create some structures representing materials.

```
protocol Material {}
struct Wood: Material {}
struct Glass: Material {}
struct Metal: Material {}
struct Cotton: Material {}
```

Now we modify our `Furniture` protocol to for M to be `Material`:

```
protocol Furniture {
    typealias M: Material
    func mainMaterial() -> M
    func secondaryMaterial() -> M
}
```

Our `Chair` and `Lamp` structures immediately complain about not conforming to the protocol. Here’s an example of a fixed `Chair` structure:

```
struct Chair: Furniture {
    func mainMaterial() -> Wood {
        return Wood()
    }
    func secondaryMaterial() -> Wood {
        return Wood()
    }
}
```

Swift correctly recognizes that the intended value of `M` is `Wood`, an implementation of `Material`. If you want `mainMaterial()` and `secondaryMaterial()` to return different types, you would need to change the `Furniture` protocol accordingly:

```
protocol Furniture {
    typealias M: Material
    typealias M2: Material
    func mainMaterial() -> M
    func secondaryMaterial() -> M2
}
```

The other slightly unintuitive thing is that neither `mainMaterial()` nor `secondaryMaterial()` can be declared to return `Material`. For example, the following code will not work:

```
struct Chair: Furniture { <<< does not conform to Furniture
    func mainMaterial() -> Material {
        return Wood()
    }
    func secondaryMaterial() -> Material {
        return Wood()
    }
}
```

## Type Alias for Self

Swift 2.0 prevents protocols from containing aliases that reference themselves; however, in Swift 1.2, the mentioned pattern is valid. This type of constraint in a generic is useful in patterns such as Factory. Let’s examine how we might add a static factory method to Furniture’s protocol in Swift 1.x+:

```
protocol Furniture {
    typealias M: Material
    typealias T: Furniture
    
    func mainMaterial() -> M
    func secondaryMaterial() -> M2
    static func factory() -> T
}
```

In Swift 2+, there are two approaches to self-referencing protocols. The first is to create a separate protocol entirely.

```
protocol HouseholdThing { }
protocol Furniture: HouseholdThing {
    typealias M: Material
    typealias M2: Material
    typealias T: HouseholdThing
    
    func mainMaterial() -> M
    func secondaryMaterial() -> M2
    static func factory() -> T
}
```

In this protocol, we are now expecting `factory()` to return a `HouseholdThing`. Here’s how this might look on `Chair`:

```
struct Chair: Furniture {
    func mainMaterial() -> Wood {
        return Wood()
    }
    func secondaryMaterial() -> Cotton {
        return Cotton()
    }
    static func factory() -> Chair {
        return Chair()
    }
}
```

While this code models a very popular design pattern (`Factory`), it doesn't quite work as you would expect. There is a major drawback in Swift regarding how `typealias` (as opposed to a true generic) seems to work: it is not possible to force a method to return an instance of itself. To better illustrate, look carefully at the same method in `Lamp`:

```
struct Lamp: Furniture {
    func mainMaterial() -> Glass {
        return Glass()
    }
    func secondaryMaterial() -> Glass {
        return Glass()
    }
    
    static func factory() -> Chair {
        return Chair()
    }
}
```

Notice: `factory()` in `Lamp` is returning `Chair` and still conforms to the protocol!

The second way to have a protocol reference itself in Swift 2+, is to use `Self`:

```
protocol Furniture {
    typealias M: Material
    typealias M2: Material
    
    func mainMaterial() -> M
    func secondaryMaterial() -> M2
    static func factory() -> Self
}
```

For structures, this will solve the issue and the compiler will now recognize that `factory()` does not return the intended return type. For a class, [Swift 2.0 lets you](http://www.infoq.com/news/2015/06/protocol-oriented-swift) mark it as `final` to properly take advantage of `Self`:

```
final class Lamp: Furniture {
    func mainMaterial() -> Glass {
        return Glass()
    }
    func secondaryMaterial() -> Glass {
        return Glass()
    }
    
    static func factory() -> Lamp {
        return Lamp()
    }
}
```

`Lamp.factory()` will no longer compile if it written to returns anything but Lamp.

## Wrapping Up

This concludes the first part of the series on this topic. We covered how the type of a `typealias` can be inferred by the compiler. We also learned how to leverage this feature to create new types of constraints when creating protocols. Finally, we learned how Self has special caveats in these contexts. 

In the next part of the series, we will explore how class inheritance introduces new problems. These problems are crucial to overcome if you plan to build on top of existing data structures that leverage generics.

At Capital One, we are excited at the new constructs that Swift enables. We strive to leverage the latest and greatest technologies and are working hard to give back to the community in the form of insights, knowledge, and [open source](https://github.com/capitalone). I hope that this article demystifies some of the darker corners of Swift for you, but if you have any questions, please reach out!

