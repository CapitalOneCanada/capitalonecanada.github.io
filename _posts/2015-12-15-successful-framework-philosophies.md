---
layout: post
title: "Philosophies that Shaped Successful Frameworks"
date: 2015-12-15 16:05:00
author: Qiang Xue
tags: [frameworks]
category: blog
images:
  framework-app-lib: /assets/posts/successful-framework-philosophies/framework-app-lib.png
  sinatra-pipeline: /assets/posts/successful-framework-philosophies/sinatra-pipeline.png
  sails-mvc: /assets/posts/successful-framework-philosophies/sails-mvc.png
---

During the past decade we’ve seen many software frameworks pop up. Frameworks such as [Spring](http://spring.io/) and [Ruby on Rails](http://rubyonrails.org) have become so successful that mastering them means opening the door to numerous job opportunities. However, for every framework that succeeds, there are even more that fade away without being noticed by most developers. [Wikipedia](https://en.wikipedia.org/wiki/Software_framework) listed 67 web frameworks on January 1, 2008. As of today however, more than two thirds of them have either fallen off the list or haven’t been updated for over three years. As the creator of the [Yii framework](http://www.yiiframework.com), I’ve spent a lot of time investigating various frameworks and understanding why some have succeeded and others failed. In this post, I will describe some of my findings on the philosophies that have shaped those successful frameworks.

<!--more-->

## Why Frameworks?

To build a successful framework it’s important to understand what a framework does and why developers need them.

[Douglas C. Schmidt, et al.](https://queue.acm.org/detail.cfm?id=1017005) describes a framework as an integrated set of software artifacts (such as classes, objects, and components) that collaborate to provide a reusable architecture for a family of related applications. According to this definition, a framework is like a semi-complete application skeleton consisting of reusable and customizable components. Developers are expected to extend and customize a framework by providing their application and domain specific logic to form a complete application.

A defining characteristic of a framework is the so-called [inversion of control](http://martinfowler.com/bliki/InversionOfControl.html). A framework usually plays the role of the main program in orchestrating and calling application code. The flow of control is inverted here – it calls me rather than me calling the framework. The diagram below illustrates the relationships between frameworks, libraries, and applications. Note that frameworks often provide ready-to-use features in terms of libraries to help developers build applications even faster.

[![Framework, Library and App Relationship]({{ site.baseurl | append: page.images.framework-app-lib }})]({{ site.baseurl | append: page.images.framework-app-lib }})

The foremost reason that frameworks are useful for developers is how they improve productivity and help improve code quality. For example, modern frameworks (e.g. [Play](https://www.playframework.com/), [django](https://www.djangoproject.com/)), often provide code generation tools or boilerplates to help jump-start new projects immediately. Also, well-designed frameworks usually have baked-in security measures that help prevent developers from committing typical security flaws. 

In an enterprise, an additional benefit of using frameworks is that it helps enforce standards that can be applied across the whole enterprise. A framework provides documented patterns, detailed designs, and implementation of tools used to provide a consistent structure across all applications. For example, at Capital One we’ve developed a framework called “Chassis” which serves as an integrated foundation to unify many API producer and consumer applications developed within the company.

Of course, not all developers like using frameworks. Some consistent complaints include steep learning curves, tight coupling with the chosen framework, low performance, and so on. Today, most of these complaints no longer hold true, as modern frameworks have addressed them very well by sticking to the philosophies being explained in this post.

## The Philosophy

Like any product, the success of a framework depends on many factors including the ideas behind it, the code quality, the documentation, the community surrounding it, the marketing, the support, etc. In my opinion, one item of particular importance is the philosophy taken into account when a framework is being designed and developed.

Long time Pythoneer Tim Peters expressed the design principles behind Python in twenty aphorisms known as [The Zen of Python](https://www.python.org/dev/peps/pep-0020/). “Beautiful is better than ugly; explicit is better than implicit; simple is better than complex...” They have inspired many [similar programming language zens](https://redd.it/15itwl), and I’ve found some of these aphorisms to be applicable in framework design as well. Leaning on my framework development experience, I am hereby condensing and summarizing the philosophies I consider most important to the success of any framework.

* Simple is better
* Monolithic is worse
* Be consistent
* Explicit over implicit
* Convention over configuration

### Simple is Better

Converting a developer to a new framework is never an easy task. However, when a developer does adopt a framework, they’ll become heavily invested in it and come to count on it for their current and possibly future projects. Moreover, unlike using a library - where a developer can learn an API only when implementing it - learning a framework requires developers to fully understand the framework rules before putting it into actual use. Therefore, it’s important to ensure simplicity when designing a framework to make it more accessible, enjoyable, and easy to learn, adopt, and utilize.

To achieve simplicity, a framework should limit the number of rules it is enforcing; also, those rules should be designed in a consistent way and be well documented. The more rules a framework enforces, the steeper the learning curve and the less likely it is to be adopted by developers. When rules are consistent, developers can learn them faster. Also, without documentation, a framework is simply useless because no one will spend time to reverse engineer its rules.

A good example of framework rule design is the routing syntax set by the [Express.js framework](http://expressjs.com/), a very popular web application server framework. Routing is an important concept in web applications and determines how an application responds to a client request to a particular endpoint (a combination of a HTTP method and a URI). Express.js introduces a simple rule for defining a route, `app.METHOD(PATH, HANDLER)`, where `METHOD` is an HTTP request method (e.g. `GET`, `POST`), `PATH` is a URI path on the server, and `HANDLER` is the callback function to be executed when the route is matched. The following code snippet shows what Express.js routing code looks like.

```javascript
var express = require('express');
var app = express();
 
// accept homepage request 
app.get('/', function (req, res) {
  res.send('Hello World!');
});
 
// accept POST request at /user 
app.post('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
 
// accept DELETE request at /user 
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

The above code is self-explanatory, as it resembles how a HTTP request would look. Because of this, it takes very little effort for developers to learn and memorize this routing syntax and apply its usefulness to their projects. 

### Monolithic is Worse

Here the term monolithic refers to frameworks built as a single unit with a tightly coupled code base. When web frameworks first became popular, they tended to be monolithic since their primary goal was to provide full spectrum support for rapid web application development. Gradually, people realized that monolithic frameworks have many issues. For example, a change made to a small part of the framework requires the entire monolith to be retested and released, which in turn causes the applications built with the framework to be rebuilt even if the change is totally irrelevant. The fact that the code in monolithic frameworks is interwoven makes it extremely difficult for these frameworks to keep backward compatibility between different versions. Last but not least, with more readily available specialized frameworks, such as those specialized in caching, logging, and database, people become less willing to be bound to a single monolithic framework.

Modern frameworks tend to be loosely coupled in their architecture. Full-stack frameworks (e.g. [Spring](http://spring.io/)) have evolved into frameworks composed of loosely coupled components that can be used independently or swapped with third-party ones. Specialized frameworks are built by explicit contracts to support better [interoperability](https://en.wikipedia.org/wiki/Interoperability), which makes applications less dependent on specific frameworks. For example, a very popular flavor of web routing framework are the so-called “Sinatra-type frameworks”, such as [Sinatra](http://www.sinatrarb.com/), [Express.js](http://expressjs.com/), and [Martini](http://martini.codegangsta.io/). These frameworks use the following middleware pipeline architecture to support request routing and handling in web applications. The frameworks themselves are very small, but the open architecture allows them to be enriched without limit by all kinds of middleware components.

[![Sinatra Pipeline]({{ site.baseurl | append: page.images.sinatra-pipeline }})]({{ site.baseurl | append: page.images.sinatra-pipeline }})

### Be Consistent

Being consistent means a framework sticks to uniform patterns in its usage design, naming convention, code style, code organization, etc. A consistent framework will lower its barrier to entry since users can learn one aspect of the framework and apply that same pattern towards quickly learning the rest of the structure. Being consistent also helps users reduce the likelihood of typos or misuses of framework features.

For example, when designing the query builder for the Yii framework, we took consistency as a guiding criterion. A query builder allows you to build a DB-agnostic SQL statement programmatically and avoid SQL injection attacks. To help users more easily memorize its APIs, we introduced the [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) and named the methods after the corresponding SQL keywords. The following code snippet shows how a SQL statement can be built using the query builder we designed.

```sql
(new Query())
    ->select('id, email')
    ->from('user')
    ->orderBy('last_name, first_name')
    ->limit(10)
    ->all();
```

The above code will generate and execute the following MySQL statement:

```sql
SELECT `id`, `email`
FROM `user`
ORDER BY `last_name`, `first_name`
LIMIT 10
```

As you can see, the code reads very similarly to how you would write the SQL statement. Such consistency between the query builder and the SQL syntax makes it easy to learn the query builder.

###	Explicit over Implicit

Explicit over implicit is about writing self-explanatory code and avoiding too much “auto-magic.” There are two reasons for sticking to this philosophy. First, explicit code is easier to understand and maintain. Since the code is self-explanatory, maintainers who may not be the original authors of the code do not need to jump back and forth to dig out what the code actually does. Second, explicit code is less error-prone. While being explicit may require writing more lines of code, it reduces the chance of overlooking important code under the hood of seemingly simple implicitness.

Take a look at the following two pieces of [ORM (Object-Relational Mapping)](https://en.wikipedia.org/wiki/Object-relational_mapping) code in PHP. They both want to achieve the same goal of establishing foreign key referential constraint between an "order" DB record and a "customer" DB record.

```php
$order->link('customer', $customer);
```

versus

```php
$order->customer = $customer;
```

The first version is a normal method call. The second version looks much cooler because the complex DB linking operation can be done by a seemingly simple assignment. However, this is an illusion as the simplicity of the second version is overshadowed by complexity hidden elsewhere. For example, users would have to learn this special assignment syntax through some form of documentation in order to use it in practice. Also, because the linking operation looks like a normal assignment, users may forget to handle potential exceptions caused by it and thus cause the whole program to malfunction.

As a matter of fact, during the development of Yii, we debated a lot over both version and finally settled on the first version, which has received very few complaints.

### Convention over Configuration

The concept of convention over configuration has been around for years. The idea is that a framework should take sensible default values that adhere to conventions while still allowing extensibility via configuration. The goal is to reduce the number of decisions developers need to make, thus achieving Philosophy #1 – simplicity.

Convention over configuration was first popularized in the [Ruby on Rails](http://rubyonrails.org/) framework. Rails provides an ActiveRecord library that deals with mappings between a class and a table in the database. By convention, the table name is a pluralized form of the class name. Thus, the class Account will have a table called Accounts. If the table is not named this way, the user would have to explicitly configure the mapping between the class name and the table name.

Many MVC frameworks use convention over configuration to route requests to particular pieces of code. As shown in the diagram below, the [Sails.js framework](http://sailsjs.org/) uses a convention where a request for the `/we/say/hi` URL will be routed to the `hi` action of the `SayController` controller class located under the `controllers/we` directory. By following this convention, developers no longer need to define the routing rules for controller actions. However, should a developer want to use a different routing rule, they can still do so by explicitly binding a route to a controller action.

[![Sails.js Request Routing]({{ site.baseurl | append: page.images.sails-mvc }})]({{ site.baseurl | append: page.images.sails-mvc }})

Convention over configuration helps reduce the amount of code that needs to be written. However, it can come at the cost of introducing additional rules developers need to follow. Also, it also tends to conflict with the "explicit over implicit" philosophy discussed earlier. In fact, while earlier versions of the Spring framework used a similar routing convention to Sails.js, Spring now requires developers to explicitly specify the mappings via annotations. Therefore, judicious judgment should be taken when deciding whether to introduce new rules to support convention over configuration.

## Summary

Building a successful framework is all about striking the right balance between power and simplicity. Throughout the process of building a framework, trade-offs often need to be considered in order to stick to, and exemplify, the philosophies described above. 

Sometimes, you may face the situation where one philosophy is in direct conflict with another. Is consistency more important than simplicity? Are conventions more crucial than explicitness? In this case, keep in mind that the ultimate goal of a framework is to simplify the work of developers and streamline the process of writing code. So keep it simple and straightforward. Conventions can be sacrificed if they conflict with explicitness because the former would introduce hidden complexity. Similarly, consistency can be slightly violated if sticking to it strictly would cause additional complication.
