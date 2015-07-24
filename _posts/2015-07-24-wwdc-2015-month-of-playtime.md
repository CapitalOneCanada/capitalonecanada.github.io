---
layout: post
title: "WWDC 2015: A Month of Playtime"
date: 2015-07-23 23:20:00
author: Natasha Murashev
tags: [ios, mobile, wwdc]
category: blog
---

Our Mobile Engineering team had a very strong presence at Apple's annual [World Wide Developer Conference (WWDC)](https://developer.apple.com/videos/wwdc/2015/) this year. We woke up at 4am to stand in line together for the keynote, learned about the newest iOS, Swift, WatchOS breakthroughs, met mobile engineers from all over the world, attended the Walk the Moon concert, and proudly sponsored the [James Dempsey and the Breakpoints concert](https://ti.to/jdbp/live-near-wwdc-2015) and the [WWDC Girls Lunch](http://www.eventbrite.com/e/women-at-wwdc-lunch-2015-edition-tickets-17103838040)!

![James Dempsey and Capital One Mobile]({{ site.baseurl }}/assets/posts/james-dempsey-breakpoints.png)

Now, a month later, our mobile engineers have been playing around with the latest and greatest. Here is what we're most excited about!

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/jimmy-s.jpeg" alt="Jimmy">
</div>

### [Jimmy](https://twitter.com/jsambuo) - watchOS 2
At WWDC, I was most excited about the watchOS 2 features and went to all of the WatchKit sessions. I’m glad a lot of the known pain points from OS1 were addressed. WatchConnectivity would have helped us a lot while making our watch app. I can’t wait to see the native apps that people make!

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/alex-c.jpg" alt="Jimmy">
</div>

### [Alex](https://twitter.com/jacabanilla) - Contextual Awareness
Apple continues to make the user experience seamless and smooth by expanding the usability of their products.  Whether it's responsiveness on the surface through improved touch, more efficient animations, or better utilization of the hardware beneath, there's a renewed commitment to engage users with reactive applications.  A great example of this is the new improved Siri with contextual awareness and intelligent reminders that go straight to the calendar.

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/chad-l.jpeg" alt="Jimmy">
</div>

### [Chad](https://twitter.com/chadlandis) - Swift 2.0
Apple added a lot of great new features to Swift 2.  Protocol extensions & default implementations allows for adding new functionality to existing standard library types, as well as your own.  For example, it is now very easy to add new capability to all collection types, in a single place.  Also, by composing your own types primarily of protocols, you get the benefits of multiple inheritance (shared behavior) without all the drawbacks (shared state).  This sounds great in theory; it will be interesting to see how this works in practice.  Also, there’s a new error handling model that enforces safer code at the language level (with new language keywords of do/try/catch).  Errors must now be handled at the call-site.  Previously errors could just be ignored, which allowed issues to slip by.  Now, all those edge cases must be handled explicitly, providing a more stable/predictable code base.  

The new #availability syntax allows for compile time checks to see if a class, property, or method is available for your deployment target.  Supporting multiple OSs is no fun, but this will make it a little easier/safer.  You can even annotate your own code to work with this feature.  There are a number of other improvements that will make working with Swift more enjoyable day to day.  New keywords (guard & defer) will make your code cleaner and more explicit.  Swift now supports multi-payload enums.  Working with generics is a little easier.  Reflection is also now more capable.
	
Finally, and possibly the most important and exciting announcement, Swift will be open source.  Apple has committed to releasing the compiler and standard library, with support for Linux later this fall.  This opens the door to using Swift on the back-end in the future.  This transforms a client-side mobile developer into a full-stack mobile developer. :)

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/johnathan-l.jpg" alt="Jimmy">
</div>

### [John](https://twitter.com/jglawrence) - App Thinning
App thinning is a great new feature introduced by Apple. There are three components to this: App Slicing, which delivers only the resources an individual devices needs to that device; On Demand Resources, which allows you to store app resources in the App Store and off the device until you need them; and finally, Bitcode, which keeps your app optimized by allowing the App Store to re-compile your app with the latest compiler optimizations. 

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/authors/natasha-murashev.jpeg" alt="Jimmy">
</div>

### [Natasha](https://twitter.com/natashatherobot) - WatchKit Complications
It's exciting to have access (however limited) to develop for the consumer's main interface on the Apple Watch: the actual watch face! Despite their name, Complications (with Time Travel!) are pretty simple to develop for. The complicated part is going to be designing the complication in a way that makes sense for multiple sizes of complication on the watch face - there are currently **five** sizes to consider: Modular Small, Modular Large, Utilitarian Small, Utilitarian Large, and Circular Small!

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/mark-a.jpg" alt="Jimmy">
</div>

### [Mark](https://twitter.com/markemer) - Xcode Server
I've been excited about upcoming release of Xcode Server, seeing how we can use all of its new features to help speed our development in the enterprise. This release has a lot to rave about - highly detailed reports, background thread testing, the ability to test on multiple real devices hooked up to the server, code coverage, and videos and screenshots of UI tests. I'm particularly thrilled to be playing with the new APIs that will let us write a ton of new tools to improve both our workflow and the products we send to the customer.

<div class="contributor">
	<img src="{{ site.baseurl }}/assets/img/contributors/victor-l.jpg" alt="Jimmy">
</div>

### [Victor](https://twitter.com/Victor_Ralov) - Developer Tools
As an iOS developer, Xcode 7 and iOS 9 bring improvements that will be reflected in better apps. This year, Apple focused on making better services and tools, such as App Thinning, Xcode 7 UI testing, code
coverage, and address sanitizing. These new features, along with Multitasking, hint to Apple¹s encouragement to build Universal Apps. As a user, I'm excited about iPad's Multitasking and Apple Music. I just started using this new music service and I love it!
