---
layout: post
title: "EASE iPhone - Lessons Learned"
date: 2015-08-19 12:00:00
author: Jimmy Sambuo
tags: [ios, mobile, engineering]
category: blog
---

It has been about one month since my team released version 5 of the Capital One iPhone app. The project to convert our hybrid app into a fully native one has taken us over a year, and our journey has been full of growth, change, and learning.

We've faced many issues during the beta releases of Xcode 6 and Swift, and while we can write a book about the 101+ things we've been through, that would make for a really long blog post. Here are just a few of the things that we've learned.

![EASE iPhone Team Photo]({{ site.baseurl }}/assets/posts/ease-iphone-lessons-learned/team-photo.png)

## Swift and Xcode
We had an existing app in the App Store, which afforded us some time to develop the app, so we had the opportunity to use Swift and the latest version of Xcode as it came out. Working with Swift was very enjoyable as it gave us powerful language constructs that Objective-C couldn't offer, such as optionals and associated enums. It also allowed us to attract new engineers who are excited about using the latest technologies from Apple. There were a lot of beta versions of Xcode during that time, and some of them were easier to adopt than others. We were able to update most of them without any changes to our code, but some of them required syntax changes, which took a bit of effort for us to update and coordinate with the build server and the rest of the team. We've had our fair share of Xcode crashes and build issues with vague error messages, but overall we've enjoyed the head start in learning and practicing Swift and don't regret the decision to use it.

![SourceKitService Crashed]({{ site.baseurl }}/assets/posts/ease-iphone-lessons-learned/source-kit-service-crashed.png)

## Storyboards / Interface Builder
My team decided to try to use storyboards and interface builder as much as possible. There are many pros and cons to this approach, but overall it has been beneficial for us. It was really helpful to make modifications and see the changes at design time without needing to build and run the application every time we made a UI change. There are times when we had to specify UI elements in both code and storyboard, such as when using NSAttributedStrings or segues. At times, this would cause confusion about where an element actually needs to be changed. Things like IBDesignables help to alleviate the problem, but we would need to spend more time to understand and fix the problem everywhere. Storyboards can also become really big, making it difficult to work with due to merge conflicts and general Xcode performance issues. Xcode 7 will bring storyboard references which should help us a lot.

## CocoaPods
We decided to use CocoaPods to manage project dependencies. We had also considered using git submodules and Carthage, but at the time, CocoaPods was best for our needs. We have an internal pod repository to host our private pods, and it works very nicely. We spoke with members of the CocoaPods team and received help on how we can better utilize CocoaPods. One change we made was to commit the Pods directory. There haven’t been any major drawbacks, and it gives us benefits such as being able to build the project right after cloning without needing CocoaPods to even be installed on the computer. Another thing we've done was to mirror external pods within our internal pods repository. This allows us to update the pods faster, as well as gives us a greater assurance of being able to access the pod in case something happens to the public repo.

## GitHub Pull Request Builder
We use GitHub with a pull request model, where you submit a pull request and two of the developers have to approve it before it can get merged into the main codebase. One thing that really helped us was this plug-in for GitHub and Jenkins where if someone submitted a pull request, Jenkins would automatically look into it, build it and run the unit tests to see if it was fine or not. This was really helpful, because before we had that, I would often have to download the pull request and run it, which would take about ten minutes per pull request. It was really tedious to do. After using this plugin, I would say it saves us at least ten minutes per pull request, which comes out to hundreds of hours over a year of active development.

![GitHub Pull Request Builder]({{ site.baseurl }}/assets/posts/ease-iphone-lessons-learned/github-pull-request-builder.png)

## Accessibility
One thing I've learned while working on this project is accessibility for iOS. There was a person on our team whose main focus was working on accessibility. After working with him, I appreciate it a lot more now, and I know now that people who are visually impaired will appreciate it when using your app. I'm proud about how accessibility is handled in our app, and I encourage you to think about it when designing your apps and check out how it is done on other apps.

![Accessibility 5-star Review]({{ site.baseurl }}/assets/posts/ease-iphone-lessons-learned/accessibility-5-star-review.png)

## Conclusion
Our app launched about a month ago, and it's a great time to stop and think about the good and pain points of this project to help with future projects. Hopefully you can also benefit from our experience. There are so many more topics that we've had to deal with, including Core Data, Animations, supporting iOS 7, unit testing, analytics, beta testing, and TableViewControllers to name a few.
