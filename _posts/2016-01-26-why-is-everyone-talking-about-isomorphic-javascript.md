---
layout: post
title: "Why Everyone is Talking About Isomorphic / Universal JavaScript and Why it Matters"
date: 2016-01-26 13:30:00
author: Azat Mardan
tags: [javascript, isomorphic javascript, universal javascript, node.js, react.js, lazo.js]
category: blog
images:
  isomorphism-diagram: /assets/posts/why-is-everyone-talking-about-isomorphic-javascript/Isomorphism-diagram.png
---

<div class="excerpt_hidden centered">
	<div>
		i·so·mor·phic
	</div>
	<div class="bold">
		/ˌīsəˈmôrfik/
	</div>
	<div class="italic">
		adjective
	</div>
	<div>
		corresponding or similar in form and relations.
		<br/>
		having the same crystalline form.
	</div>
	<div class="italic">
		* definition by Google
	</div>
	<br/>
</div>

Originally applied to mathematics, the term “isomorphic” was first popularized in relation to Javascript development by [Spike Brehm of Airbnb](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/). Since the beginning, many developers have objected to the usage, and it’s been in the newscycle recently as the competing buzzword “universal Javascript” has emerged (most notably in [Michael Jackson’s post](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)) as an alternative to “isomorphic Javascript.” For simplicity, I’ll stick with the catchier word isomorphic because it was first, and also to avoid getting into the terminology wars so prevalent in tech. In this post, we’ll dive deeper and demystify the concept of isomorphism, as well as shed some light on why it’s important to web development – regardless of the catchphrases used to describe it.

<!--more-->

**Isomorphism** as applied to web development means rendering pages on both the server and client side. It usually implies the use of JavaScript and Node.js/Io.js because they allow for the re-use of libraries, allowing browser JavaScript code to be run in the Node.js/Io.js environment with very little modification. As a result of this interchangeability, the Node.js and JavaScript ecosystem supports a wide variety of isomorphic frameworks such as [React.js](http://reactjs.net/), [lazo.js](http://lazojs.org/), and [Rendr](http://rendrjs.github.io/) amongst others.

[![Isomorphism Diagram]({{ site.baseurl | append: page.images.isomorphism-diagram }})]({{ site.baseurl | append: page.images.isomorphism-diagram }})

The three main reasons developers rave about isomorphism are:

* Better Search Engine Optimization (SEO)
* Better performance
* Better maintainability

Before we touch on each one of these benefits, let’s take a step back and look at the history of web and how that relates to isomorphism.

## Quick Overview of Web Development

In the early days of the web, servers rendered all HTML pages and the web experience was drastically worse than of desktop apps. Pages had to refresh every time a user interacted with them and most interactions were single actions like submit some data or update a record. Add to that a poor awareness about user experience (UX) and slow connection and you get the picture...

By the end of 2000's, so-called single-page applications (SPAs) became more popular, since this architecture allowed for snappier and more user-friendly apps that performed more like desktop apps. (Nowadays, desktop apps are built with web technologies using wrappers like Electron or Adobe Air, so the tables are turned!) The defining characteristic of SPAs is that they don’t require page reloads, loading data asynchronously so users can do something else while the data loads. For example, you can star multiple emails in Gmail in parallel without waiting for the first process of starring an email to finish successfully. This improves user experience because SPAs can function more like desktop apps. Which is why you probably use a lot of SPAs - Google Docs is a good example- or have maybe even developed one.

An additional feature of SPAs is that the HTML is rendered and manipulated on the client side, i.e., browser. This decreases the size of the payload, because instead of HTML, the server returns only JSON. However, there are some downsides to this approach:

* Most search engines don’t support client-side rendering when crawling websites. Even Google states that the [code must be simple enough for its crawlers to interpret properly](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html).
* As SPAs become larger they require users to download more and more front-end JavaScript code, leading to increased waits (“loading…” message) before the application can be used.
* Users must have JavaScript turned on.
* Users have to wait for the data to come back via AJAX/XHR in JSON after the page skeleton has loaded.

Patching these issues with non-isomorphic tactics is cumbersome at best. For instance, rendering pages on the server-side was a practice long before isomorphic JavaScript became a popular term. However, rendering server-side along SPAs usually required using different sets of templates and logic since server-side platforms used languages like Ruby, Java or PHP. Likewise, another non-trivial tactic involved redirecting crawlers to [separate machines running a headless browser like Phantom.js](https://cdnjs.com/libraries/backbone.js/tutorials/seo-for-single-page-apps).

With the advent of Node.js, it became possible to write code that rendered on both the browser and server. Needless to say, having only one set of code is dramatically better from a maintainability perspective and started out edging out other web development tactics. So how does isomorphism address the issues of SEO, performance, and maintainability?

### Ability for Search Engines to Index Pages Properly

Single-page applications built with frameworks like Backbone.js, Angular.js, Ember.js, etc. are widely used for writing protected apps, i.e., apps that require a username and password to access. Most SPAs serve protected resources and don’t need web indexing since they don’t have public dashboards. For example, everyone from Capital One Online Banking to Gmail to Evernote.com requires the user to login before seeing the actual app.

However, the vast majority of websites are not protected behind log-ins. For these public apps and pages, SEO is actually mandatory because their business model depends heavily on search indexing and organic traffic. Recently, Google added JavaScript rendering capability to their crawlers. In theory, this means that Google will render a SPA just like a normal browser would do, and index its content. However, Google itself states, “Sometimes things don’t go perfectly during rendering, which may negatively impact search results for your site.” — [Understanding web pages better](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html). So to be on the safe side, SPA developers **still need to mirror their non-JavaScript rendering** as closely as possible to the JavaScript-enabled (browser or SPA) rendering to avoid being overlooked by the crawlers. For example, the Capital One home page must be indexed by search engines in order for our customers to easily find the publicly accessible pages.

### Better Performance with Faster Perceived Loading Time

While some applications place a priority on proper search engine indexing, others thrive on fast performance. Websites like mobile.walmart.com ([article](http://www.walmartlabs.com/2014/06/in-search-of-the-holy-grail-again)) and Twitter.com ([article](https://blog.twitter.com/2012/improving-performance-on-twittercom)) did research showing that increasing speed on the first page (first load) improved general site performance.

This research confirms the practice that server side rendering needs to show the first page as quickly as possible, while other code can be loaded while the user browses the page. As a result, when the user loads the first page he/she won’t see the *“loading...”* message; they’ll see a functional page, thus having a better user experience (UX) and generally better experience of the app in general.

### Better Code Maintainability

Code is a liability. The more there is, the more you and your team will need to support. For this reason, you generally want to avoid using different templates and logic for the same page. Luckily, Node.js/Io.js – as well as template engines like Handlebars, Mustache, and Dust - makes it effortless to use front-end/browser modules on the server.

In addition to re-using templates, developers can also re-use the same libraries and utilities on both the server and browser, further reducing the need for excess code. Libraries like Underscore.js, lodash, Request, and SuperAgent are hugely popular for this reason. Having the same library on both the server and browser allows for better development and code reuse which leads to happier software engineers and less time spent maintaining the code. If we take this a step further, we can even develop our own in-house modules to be shared between browser and server. We did just that at Storify with jade-browser. This module allows your Node.js and Express.js powered apps to expose Jade templates to the browser, where they can be used by your browser JavaScript code (we used Backbone and jQuery on the browser).

One additional advantage of isomorphic JavaScript is that data models can be shared between the browser and server, e.g., Meteor or [Falcor](http://netflix.github.io/falcor). This maximizes consistency across the browser and the server. At DocuSign, we tweaked Backbone.js models (a browser framework) to work on the server. This allowed us to fetch the data for the DocuSign web SPA ahead of the AJAX/XHR request, thus boosting performance of the application.

## Options: React.js, Lazo.js and Rendr

So you want to work isomorphism into your web development? While there’s a wide variety of libraries and frameworks that allow developers to use isomorphism in JavaScript, some of the most popular choices are React.js, Lazo.js and Rendr. A quick comparison of these libraries follows.

### Rendr

Rendr is a library developed at AirBnb to address slow first-page load. It was designed to utilize Backbone.js architecture on the server. Rendr also works with Express.js. If we explore a Rendr all closely, you’ll see that the routes are set up akin to those in Backbone.js:

```javascript
module.exports = function(match) {
	match('', 					'home#index');
	match('repos', 				'repos#index');
	match('repos/:owner/:name', 'repos#show');
	match('users', 				'users#index');
	match('users/:login', 		'users#show');
};
```

The Rendr app will have it’s own instance of Express.js which we mount to the main server with:

```javascript
var server = rendr.createServer({
	dataAdapterConfig: dataAdapterConfig  // Some configurations
});

//...

app.use('/', server.expressApp); // Mount Rendr app to the main app
```

More Rendr examples are available at [https://github.com/rendrjs/rendr-examples](https://github.com/rendrjs/rendr-examples). There are quite a few similar projects that utilize the Backbone library to write code that can run on the server or design components to be shared between both the client and server. Some of these projects can be found here: [backbone-serverside]() and [previewcod]().

### Lazo.js

Lazo is similar to Rendr in that it utilizes Backbone.js. In addition, it leverages RequireJS and jQuery front-end JavaScript libraries. Lazo routes are stored in JSON file:

```javascript
{
	"routes": {
		"":				{ "component": "todos-single" },
		"multiple(/)":	{ "component": "todos-multiple" },
		"single(/)":	{ "component": "todos-single" },
		"layout(/)":	{ "component": "main", "layout": "todos-layout" },
		"header(/)":	{ "component": "header" },
		"main(/)":		{ "component": "main" },
		"footer(/)":	{ "component": "footer" },
		"hello(/)":		{ "component": "hello", "layout": "todos-layout" }
	},
	"css": ["/app/client/base.css"]
}
```

The modules are defined in RequireJS style:

```javascript
define(['lazoBundle'], function (LazoBundle) {...})
```

### React.js

React.js isn’t a model-view controller (MVC) framework; it just has the view layer of a MVC. This means it can be used with most of other libraries front-end libraries such as Backbone.js. React.js is often used with the JSX language, which is a mix of JavaScript and XML/HTML.  In this scenario, the JSX code is compiled into the native JavaScript before execution in the browser. The major advantage of using React.js over other libraries is that is uses virtual DOM for rendering, meaning only the delta of changes will be rendered on the page, leaving the unchanged elements intact.

Here’s an example of React’s front-end code:

```javascript
var Header = React.createClass({
	render: function(){
		return (<h1>Message Board</h1>)
	}
})
//...
```

The brilliance of React is that there are no templates - all HTML elements are rendered from JavaScript code. The XML-like syntax is just sugar coating and because the functionality is split between JS and HTML, this approach helps prevent constant jumping from JS to HTML to JS to HTML and so forth. When it compiles to isomorphism, React is effortlessly rendered on the server, enabling the faster first-page load we discussed earlier, while the later interactions are enabled by the browser React.

Let’s take a look at the same component Header rendered on a server built with Express.js. The `public/js/app.js` is the browser file with React components, which we’ll re-use on the server:

```javascript
var React = require('react/addons'),
	components = require('./public/js/app.js'),
	Header = React.createFactory(components.Header)
	//...
	app.get('/', function(req, res, next) {
		req.messages.find({}, {sort: {_id: -1}}).toArray(function(err, docs){
			if (err) return next(err)
			res.render('index', {
				header: React.renderToString(Header()),  props: '<script type="text/javascript">var messages='+JSON.stringify(docs)+'</script>'
			})   
		})
	}
```

The data passed in the `props` will be exposed on the client/browser. The server-side template for the view (Handlebars template engine) look like this:

{% raw %}
```
{{{props}}}
<div id="header">
	{{{header}}}
</div>
```
{% endraw %}

Once the client React code gets its data from a datastore (Reflux, jQuery, Backbone, etc.), it will check the checksums on the server-rendered elements. They will match, because the data is the same, and there would be no unnecessary re-rendering to slow page times. The first time this page loads will be super fast since the rendering happened on the server with later partial DOM updates happen on the browser.

## Summary

As SPAs became more widespread, the need for a single client/se code base to support SEO, non-JavaScript clients, better UX, and fast first page load grew larger.  In a nutshell, isomorphic JavaScript is the answer to this web development problem.

The isomorphic approach solves these issues by using one set of code (usually JavaScript/Node.js) that renders both on the back end and the front-end, allowing for better maintainability, indexing by search engines, and user experience.
While a contentious term, the utility of the concept is solid. Node.js/Io.js made isomorphic development easier and more accessible, allowing it to grow in popularity and expand into multiple frameworks.

JavaScript is already the *ONE LANGUAGE* to rule them all – if by “them all” you mean every layer of the web tech stack from browser to server to database. What if isomorphic JavaScript represents the next evolution of web development, stripping away the complexity of keeping track of a thousand moving bits of code? What if all those abbreviations that crowd web developer resumes - HTML, CSS, HTTP, SQL, RoR, J2EE, PHP – could be replaced with a single beautiful isomorphic approach to JavaScript? Wouldn’t that be universally great?
