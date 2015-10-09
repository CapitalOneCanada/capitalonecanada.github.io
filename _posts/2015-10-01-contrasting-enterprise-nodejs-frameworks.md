---
layout: post
title: "Contrasting Enterprise Node.js Frameworks: Hapi vs. Kraken vs. Sails.js vs. Loopback"
date: 2015-10-01 16:15:00
author: Azat Mardan
tags: [node.js, hapi, kraken, sails.js, loopback]
category: blog
redirect_from: /blog/contrasting-enterprise-nodejs-iojs-frameworks/
---

[Node.js](https://nodejs.org)/[Io.js](https://iojs.org) is a non-blocking I/O platform based on the JavaScript language. It has been capturing the hearts and minds of software developers for the past couple of years. It has been doing this not only for developers in startups And small companies, but more interestingly for enterprise developers as well. For example, *PayPal, LinkedIn, Walmart, Netflix, eBay, Uber and other tech giants switched from Java and the likes to Node*. Its popularity is attributed to better performance and having one language (JavaScript) for all layers: back-end, database and front-end.

As with any new platform, there are a lot of Node.js/Io.js frameworks to choose from. However, before we proceed, we need to define what *enterprise* means. For the sake of simplicity, an enterprise project is one where you have teams of more than 10 developers working on it, where you have huge traffic to handle and high stakes, meaning the services must be running 24x7x365.

Judging frameworks is highly subjective. When it comes to building enterprise-level applications, we need to consider some of the following things:

1. Best practices and patterns: Whether the framework is DIY or provides clear patterns to use.
2. Configuration: How easy it is to configure the framework.
3. Convention: Is there a convention to follow if that's the preferred route?
4. Horizontal scaling: How easy it is to scale apps built with this framework.
5. Testing: How to test the application.
6. Scaffolding: How much developers have to code manually vs. using built-in code generators.
7. Monitoring: How to monitor the application
8. Track record: How proven a framework is, i.e., who supports it and how well it is maintained.
9. Integration: How rich the ecosystem of plugins/connectors is.
10. ORM/ODM: Is there an object relational/document mapper.

While performance is important, it varies on the requirements and business logic of a particular project. Running meaningful benchmark tests is [non-trivial](http://hueniverse.com/2014/08/20/performance-at-rest).

The main focus of this post is to compare the four Node.js/Io.js frameworks: [Hapi](http://hapijs.com), [Kraken](http://krakenjs.com), [Sails.js](http://sailsjs.org) and [Loopback](http://loopback.io). There are many other frameworks to consider, but I had to draw the line somewhere.

Frameworks like [Express.js](http://expressjs.com) and [Restify](http://mcavage.me/node-restify), while widely used in enterprise projects, were excluded for their DIY-ness, meaning they provide very little structure and require bringing many other modules to configure them to do the bare minimum. On the other hand, the poster child of hackathons, the Meteor framework, was excluded because I couldn't find any large enterprise deployments of it. If you know of any, send me a link.

One might argue that comparing these frameworks is like comparing apples to oranges. That's true, to an extent. Hapi and Loopback might fall into slightly different sub-categories, but the truth is their categories are close enough. The frameworks solve a similar high-level problem that is building a scalable or maintainable web application.

It's possible to deliver successful enterprise applications on Sails, Kraken, LoopBack or Hapi. It's even possible to build high-scale and large projects with Express.js or the core Node.js modules, as well as with many other worthy frameworks that were left out of the scope of this analysis. In fact, that's what we did at Storify when there were no other alternatives but to DIY.

So what's a tradeoff in using a minimalistic Node.js framework? The tradeoff is increase in time and harder maintainability, because when a team chooses an open-source project, they can leverage other contributors for maintenance. This is not the case when the same team settles on a closed-source in-house system that is supported only by this company.

In the end, you need to think for yourself and make your own decisions. Your target application might focus and/or need different things. This article can only highlight certain facts. And even that is most likely in a subjective manner, as with almost anything written or spoken by a person. ;-)

Let's discuss Hapi, Kraken, Sails, and Loopback frameworks in the light of these items.

## Hapi

[Hapi](http://hapijs.com) (for **H**TTP **API** server) is supported by [Walmart Labs](http://www.walmartlabs.com), so it clearly has a proven track record of serving a lot of traffic in production ([\#nodebf](https://twitter.com/hashtag/nodebf)- Node Black Friday).

Hapi comes with built-in support for input validation, caching, authentication and other features. It does not provide an ORM/ODM right out of the box, but there is an extensive list of [third-party plugins](http://hapijs.com/plugins).

**The power of Hapi is that you get a great amount of control over the request handling**. This comes in handy in enterprise applications, because they need to handle a lot of logic. Other pros include:

* Plugin-based architecture: Pick and choose modules to scale your app
* Caching: Improve performance
* Configuration-centric: Use configuration files
* Rich web server functionality: Speed up your development
* Detailed API documentation: Learn the framework quickly
* Proven track record and support: Get support from community and contributors
* Supports micro-services: Get better separation of business logic and scalability with [Seneca](http://senecajs.org) and [chairo](https://github.com/hapijs/chairo) plugin.

Some of the drawbacks of Hapi include:

* Developers need to figure out the code structure on their own
* "Locks" developers into using hapi-specific [modules](http://hapijs.com/plugins) and plugins such as catbox, joi, boom, tv, good, travelogue, and yar; and which are not compatible with Express/Connect
* Endpoints are created manually
* Refactoring is manual
* Endpoints are tested manually

Having no built-in ORM/ODM is not a minus per se as not all enterprise apps need a database. For example, an orchestration layer that pulls data from a legacy SOAP service doesn't need a MongoDB driver with models and schemas because it is getting data from services and might be caching the data in Redis.

As far as the code goes, Hapi is distinct from the other frameworks in this article, because it wasn't built on top of Express. This architecture require additional learning for developers familiar with Express (as the majority of us are) because they can apply their Express.js skills to Hapi.

A simple Hapi server with two routes `GET /` and `GET /name` would look like this:

```js
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
```

As you see, each route is defined as a JSON object and has many properties by which developers can control this route's behavior.

To get started simply install Hapi with npm as you would any other dependency:

```
$ npm install hapi --save
```

Social proof for Hapi is at 4,337 GitHub stars and 67,390 npm downloads in the last month as of this writing (July 2015).

Website: <http://hapijs.com>

GitHub: <http://github.com/hapijs/hapi>

npm: <https://www.npmjs.org/package/hapi>

## Kraken

[Kraken](http://krakenjs.com) is not a framework per se, it's more of a layer on top of Express.js that **provides extra structure and control** needed when working on large projects. Kraken was built by PayPal engineers. They had specific problems and solved them by using Express.js with the added level of organization.

Kraken provides Node.js developers with these main benefits:

1. Internalization: Makes your application support many languages from the ground up.
2. Security: Pre-configured module [Lusca](http://github.com/krakenjs/lusca) provides simple-yet-critical best application security practices.
3. Development speed: Automatic code creation with generators that save development time and reduce human error.

Other Kraken pros:

* More out-of-the-box functionality than Express.js
* Clear structure and code organization compared to bare-bone Express.js
* Security module
* Code generators
* Easy learning curve for developers familiar with Express.js
* Possible to leverage a rich ecosystem of Express.js/Connect middleware modules with Kraken

Kraken cons:

* No built-in models or ORM/ODM
* DIY approach (it could be an advantage for highly-customized projects)
* Not very comprehensive

A simple Kraken server will look a lot like the Express.js one:

```js
'use strict';

var kraken = require('kraken-js'),
    app = require('express')(),
    options = {
        onconfig: function (config, next) {
            config.get('view engines:js:renderer:arguments').push(app);

            next(null, config);
        }
        /* more options are documented in the README */
    },
    port = process.env.PORT || 8000;

app.use(kraken(options));

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
```

To start with Kraken scaffolding:

```
$ npm install -g yo generator-kraken bower grunt-cli
$ yo kraken
```

The skeleton project structure might look something like this:

* `/config`: Application configuration, including environment-specific configs
* `/controllers`: Routes and logic
* `/locales`: Language specific content bundles
* `/models`: Models
* `/public`: Static assets that are publicly available as well as server templates
* `/tasks`: Grunt tasks to be automatically registered by [grunt-config-dir](https://github.com/logankoester/grunt-config-dir)
* `/tests`: Unit and functional test cases

Social proof, Kraken is at 3,399 GitHub stars and 22,248 npm downloads in the last month as of this writing (July 2015).

Website: <http://krakenjs.com>

GitHub: <https://github.com/krakenjs/kraken-js>

npm: <https://www.npmjs.org/package/kraken-js>

## Sails

Sails.js was built on top of Express.js; therefore it's easier to learn for people already familiar with Express.js.

Sails.js has a rich scaffolding. Think Ruby on Rails (hence the name "sails"). This allows developers to create RESTful API endpoint **without writing any code**. The auto-generated code can be customized later to suit particular business needs.

Sails.js is an MVC framework and it comes with the database ORM/ODM [Waterline](https://github.com/balderdashy/waterline-docs), which supports various databases.

Sails.js also comes with built-in support for WebSockets with Socket.io and an asset tool (Grunt). However, Sails.js lets you decide on the front-end layer, which is often implemented with Angular.js, Backbone.js or [any other front-end framework](http://todomvc.com).

The advantages of Sails.js:

* Provides good code organization and blueprints
* Built-in support for WebSockets
* Supports various [databases](http://sailsjs.org/#!/documentation/concepts/extending-sails/Adapters/adapterList.html)
* Data validation
* Auto-generated code for controllers, models, and routes
* Many out-of-the-box security features, e.g., CSRF and compatibility with Lusca
* Built-in file upload library
* Good documentation
* Flexible and modular architecture with hooks and plugins

The Sails.js disadvantages:

* Steep learning curve
* Opinionated

Here's an example of defining routes in the `config/routes.js` file of a Sails.js project:

```js
module.exports.routes = {
  'get /signup': { view: 'conversion/signup' },
  'post /signup': 'AuthController.processSignup',
  'get /login': { view: 'portal/login' },
  'post /login': 'AuthController.processLogin',
  '/logout': 'AuthController.logout',
  'get /me': 'UserController.profile'
}
```

As you see, the abstraction --- meaning the logic for the routes is somewhere else --- keeps the routes.js file lean and clean. This is important in large enterprise-level applications, because it provides control and good code organization.

To get started with Sails.js, install it as a command-line tool with npm and run the generator:

```
$ npm -g install sails
$ Sails.js new sails-test
$ cd sails-test
$ Sails.js lift
```

The resulting skeleton project will have these folders:

* `/api`: all server-side logic such as controllers, models, policies, responses (request handlers) and services (re-usable components)
* `/assets`: static assets, such as images, front-end JavaScript, styles, etc.
* `/config`: configuration settings, such as environments, locales, middleware
* `/tasks`: Grunt build tasks
* `/views`: server-side templates

Social proof, Sails.js is at 10,963 GitHub stars and 63,859 npm downloads in the last month as of this writing (July 2015).

Website: <http://sailsjs.org>

GitHub: <https://github.com/balderdashy/sails/>

npm: <https://www.npmjs.org/package/sails>

## Loopback

Last but not least, we contrast a framework from the maintainers and contributors of Express.js, ([StrongLoop](https://strongloop.com)). Meet Loopback!

The framework is marketed as enterprise (as many other StrongLoop's solutions). Loopback is an open-source project and it fits nicely with other tools and services (some of the services are paid) offered by StrongLoop. The toolchain is called [StrongLoop Arc](https://strongloop.com/node-js/arc).

In a nutshell, LoopBack is a flexible, yet comprehensive framework that was built on top of Express.js. **LoopBack is considered the next evolution of Express.js** and it has built-in ORM/ODM with a wide-range of drivers (official list and third-party list), connectors for existing SOA, components for third-party services and mobile SDKs.

There are three ways to develop with LoopBack:

1. Web-based graphical user interface: Easy to use but features are limited compared to the next options
2. Command-line: Automatically generate code, create API endpoints, set access control levels, database relationships, etc. with commands
3. API, i.e., writing code manually

The [list of the LoopBack enterprise users](http://loopback.io/users) is affirming.

Similarly to Sails.js, LoopBack is *bring your own client* (BYOC). It means, LoopBack doesn't provide the front-end layer, but it plays nicely with the most popular frameworks like Backbone.js and Angular.

Although there are server-side Node.js frameworks that integrate front-end e.g., Meteor, Derby.js, having no built-in front-end layers is not a drawback necessarily since most projects will prefer not to be locked in and have the ability to customize or maybe an option to re-use their existing front-end components.

LoopBack's advantages are:

* Mobile client SDKs for Android, iOS, and Angular.js
* Leverages StrongLoop ecosystem of tools for Build & Deploy, Monitoring, Profiling (StrongLoop Arc, API Gateway)
* Built-in API explorer and API documentation with [Swagger](http://swagger.io)
* Built-in access-level controls (ACLs)
* Built-in ORM/ODM with [Juggler](https://www.npmjs.com/package/loopback-datasource-juggler) with various drivers
* Great documentation
* Provides code organization and structure as well as best practices
* Support scaling and microservices
* Built-in file upload library

And here are the LoopBack disadvantages:

* Steep learning curve due to its comprehensiveness
* Opinionated, meaning you have to know how to do it the LoopBack way

To get started with LoopBack, we need to install StrongLoop toolchain then run the generator and answer questions:

```
$ npm install -g strongloop
$ slc loopback
```

A typical LoopBack application will utilize the following folder structure:

* `/client`: All client-side files and assets
* `/server`: All server-side Node.js/Io.js files, including boot scripts, as well as JSON configuration files for middleware, models, datasources, etc.

Social proof, LoopBack is at 4,117 GitHub stars and 21,960 npm downloads in the last month, as of this writing (July 2015).

Website: <http://loopback.io>

GitHub: <https://github.com/strongloop/loopback>

npm: <https://www.npmjs.com/package/loopback>

## Decisions, Decisions, Decisions

We intentionally left out the default choice for building Node.js/Io.js apps, Express.js, because it would have been too easy to pick on its lack of code generators, organization, and built-in database support. However, you shouldn't discount Express.js. It might be a better choice for rapid prototyping or highly-customized projects. The number of Express.js/Connect middleware modules is vast. This is the reason why you might want to pick Kraken, Sails.js or LoopBack. They are compatible with Express.js middleware.

Kraken is very lightweight. The [PayPal team even doesn't position it as a framework](https://blog.safaribooksonline.com/2014/02/21/use-kraken), only as a layer on top of Express.js. However, this layer is very useful because it will give you security, internalization, code organization and code generators.

The next contenders are Sails.js and LoopBack. They are definitely heavy-weights in the Node.js-framework space at the moment (July 2015). They bring built-in ORM/ODM and rich scaffolding, which will save hours for developers. The third-party selection of database drivers for LoopBack seems to offer [more libraries](https://github.com/pasindud/awesome-loopback), than offered by the [Sails.js ORM/ODM community](https://github.com/balderdashy/waterline#community-adapters).  

LookBack might have a clearer server-client separation useful for building RESTful servers for single-page applications, as well as API Explorer (documentation) which is a great visual tool for creating, managing and testing of endpoints.

The drawback of Sails.js and LoopBack is obvious. As with any comprehensive frameworks, especially the ones that use convention over configuration and which performs a lot of magic for developers, there's some amount of learning required. You'll might even have to get a book [*Sails.js in Action* [2015, Manning]](http://www.manning.com/mcneil).

Hapi stands on its own because its architecture is different from Express.js by design. This allows for more granular control over the request and response life-cycle.

Although I'm including GitHub start and last month's nmp downloads as a proxy for trends, take the social proof with a grain of salt. It's not always accurate, because the longer a framework is out there, and the better it's promoted, the bigger the stats will be. Conversely, the stats for a superior library might be lower just because this module is newer.

I'm not going to advocate for any of the particular frameworks from the list (Hapi, Kraken, Sails, LoopBack). They are obviously superior to writing and maintaining your own libraries or using bare-bone Express.js *in the most cases*. My recommendation is to use them based on their pros and cons as it suits your particular project.

For an updated list of hand-picked Node.js/Io.js frameworks and libraries, visit [NodeFramework.com](http://nodeframework.com).

P.S.: I might be biased towards Express-based frameworks, being an author of the [*Pro Express.js*](http://proexpressjs.com/) book, but (in case you were wondering) **my personal favorite Node.js framework for enterprise projects is Loopback**!