---
layout: post
title: "From the Inside Out: Taking Your API Out In Public"
date: 2015-12-11 17:00:00
author: Lorinda Brandon
tags: [API]
category: blog
images:
  what-problem: /assets/posts/inside-out-taking-api-public/WhatProblem.jpeg
  come-in: /assets/posts/inside-out-taking-api-public/ComeIn.jpeg

---

API professionals talk a lot about concepts like “Design First” and “API First”, all of which are great platitudes if you’re starting your API from scratch. However, most of us don’t work for brand new companies with zero APIs in our stack. It’s much more common to start your API program journey with a bunch of APIs built for internal use in developer-led projects that weren’t initially designed for close public scrutiny.

<!--more-->

Like your coworker who works from home, these internal APIs thought they could sit around wearing sweats and eating junk food all day. As long as they read requests and gave responses, appearances wouldn’t matter, right?

But no. Now your management team thinks this API could be their next big product release. The next Slack even! Instead of sitting in the internal confines of the company, your API needs to get out and *mingle* with the public. But is it ready for the spotlight or does it need some serious grooming beforehand?

So, how do you make your API socially acceptable?

Here are a few things to figure out before taking your API public.

## Start With Why

In his now famous TED talk, [Simon Sinek brought up the concept of the Golden Circle](https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action?language=en) when discussing why some companies are successful and some aren’t. According to Sinek, two companies can make the same product in much the same way, but one will succeed and the other won’t due to very important differences in their process. This difference is that the failing company will start from the outside circle and work inward – they’ll figure out the *What* and *How* before they can answer or communicate the *Why*.

<div class="container">
	<iframe class="video" src="https://www.youtube.com/embed/u4ZoJKF_VuA" allowfullscreen></iframe>
</div>

But the *Why* is the most important part. *Why are you building an API? Why THAT API?*

In my experience at Capital One, they have put forth a good, well communicated understanding of the *Why* – why build APIs to begin with. It’s one of the reasons I joined the Digital Services Group to help take their APIs from internal assets to external products. During the interview process, I talked to them about what they wanted to do, how they wanted to do it, and why they were building specific products; and everyone at Capital one answered me with *Whys*. 

### The *What* and *How* are driven by the *Why*

How does this relate to making presentable APIs? When you’re told to build an API that does *x*, first ask *Why* (and if you work somewhere where it’s not okay to ask *Why*, you should consider working elsewhere). You can’t build an API that fits the vision of your company and the needs of your customers without answering that essential question. Your *Why* can be anything from “We want to expand our brand awareness” to “We need to bring in more revenue” and many things in between. Don’t stop asking until you get to that *“Aha! Now I see the vision!”* moment.

## Dress for Success

Part of answering your API’s *Why* is understanding your customers’ *Why*. API customers are using your tools to drive their own product development. Your API is a building block, to best serve their needs you have to understand not only what they’re building, but also who they are, and what they’re looking for from your API.

[![What Problem?]({{ site.baseurl | append: page.images.what-problem }})]({{ site.baseurl | append: page.images.what-problem }})

For example, API professionals talk a lot about the Developer Experience  - a very important topic in our industry. But *why* is it important? The Developer Experience begins with, you guessed it, the developer. But not all developers are from the same tribe and to properly target your API you’ll need to know for whom you’re designing. 

Your developer portal, documentation, logo, and all the other trappings of your API should reflect the attitude of the developers you most directly associate with. Developers creating mobile music apps may expect a completely different user experience from developers creating SaaS products for the financial market. Understanding your customers’ expectations and preferences ensures that your API can show up to the party and get noticed (in a good way).

Additionally, knowing both your customers and your customers’ customers can help you prioritize the capabilities of your API before sending it to the outside world. When your API was still an internal API, you had easy visibility and perhaps a company mandate that supported internal product teams. Factors which made it easier to decide what data to expose and how teams could interact with that data.

But once you put your API into the public sphere, that dynamic becomes much more complex. Your external customers are using your building blocks to create individual and unique products with their own roadmaps and schedules. Understanding their market and how *they* dress for success can help your API become successful as well. After all, a great API provider knows what *their* customers are trying to present to their customers and ensures their API plays to the dress code.

## Check Your Zipper

Like we said, your internal APIs have been sitting around, working from home in their sweats with unwashed hair. They’re not known as snappy, polished dressers because they haven’t had to be. But we’re going to have to change that. In order to make your API presentable, you’ll need to pay close attention to what your APIs are exposing and what they’re covering up when they go out in public.

Are you using HTTP status codes and verbs correctly? Are your error codes and messages easily and quickly understood? How do you identify the version of your API – for example, is it in the namespace (and hence the URL) or is it in the Accept-Header? And how do people know which version is the most current or when it is expected to change?

Additionally, are you minding the endpoints you’re providing access to – possibly, there are some you’ll want to keep internal. In fact, for many companies and APIs, this is often the best strategy. After all, just because you’re taking your API out into the world doesn’t mean you have to dress it like a red carpet celebrity with lots of skin showing. Some aspects you may want to hide to give your company an edge so consider adding a big winter coat to your API’s wardrobe.

Remember that when you go out in public, you want developers to quickly understand your API without having to ask a lot of questions. With internal APIs it’s easier to take shortcuts or use custom codes because of the direct communication line between app developers and API developers. However, when you engage third-party developers, you need to make sure your API behaves in expected and well-understood ways that can be easily consumed by external teams.

## Find Your Safe Space

This is when you need to make some serious business plans based on the goals for your API.

First – every single aspect about APIs and API development is a religious debate and you’re not going to get everything right for everybody. Some people will grumble loudly if you break a minor belief of theirs - like whether you put the version in the header or make it transparent in the URL. You will get it wrong and that is okay. Just breathe, implement what you believe in (find your *Why*), and stick to your guns.

### Unless it isn’t working. Then be adaptable.

When you have an internal-only API, you’re working with a known group of consumers. You can estimate how many calls your API will need to handle hourly and which resources will be most in demand. That information lets you make decisions up-front about server capacity and load balancing so you can ensure optimal performance.

But for an external API you need to make decisions with serious implications for the adoption of your API by third-party developers. For example, how much load can you really sustain? Are you trying to hit some SLA – and more importantly, do your partners expect a certain level of performance to accomplish *their* goals?

And as always, what can your competitors do?

All of this translates into some very real technical implementation decisions. Your performance goals should dictate your load testing plans which in turn should dictate design decisions like what kind of rate limits will you impose, are you going to use caching, what kind of monitoring do you need to set up, etc? All of these decisions ultimately circle back to *Why* – the answer to that question will help guide your choices when setting up your infrastructure. 

For example, if the *Why* is to enable fast and easy online purchasing, then performance and accuracy are key measurements. If your API processes payments against a credit card, being able to get balances and approvals quickly is essential. Setting up a production monitor to regularly measure the response time of those API calls in sequence ensures that you’re meeting your customers’ needs and can react quickly to issues.

This is also where you should make your sandbox plans. The best way to keep your API performing well in production is to put development activities – yours AND third-party developers – in an isolated environment where they can hit virtual instances of your API without impacting production. You probably already do this for your internal APIs. Now take that same principle and apply it to external APIs.

## Have a Plan

I was recently talking to a group of students at the [Defrag conference](http://defragcon.com) in Colorado. They run a fairly successful hackathon group called [HackCU](https://www.facebook.com/letsHackCU/), but were struggling with the business focuses of the post-hackathon world – *you built this thing, now what do you do with it?*

[![Come In]({{ site.baseurl | append: page.images.come-in }})]({{ site.baseurl | append: page.images.come-in }})

This is a common problem in the API space too – you have a mandate to externalize your APIs so you clean them up, make them pretty, follow all the advice you’ve heard about presentability and best practices and put it out there. You’re so proud...

And then you wait. And wait...

### It turns out dressing for success is only part of the equation.

Taking your APIs into the public space requires the same cross-functional, long-term attention as any product. For instance, you need marketing behind it, otherwise how are you going to get the word out? And here’s something API developers like to pretend isn’t true – your marketing needs to be more than just Developer Evangelism. Devangelism is great when you want a direct interface to developers already looking at your API. But how do you get their attention to begin with? Creating industry buzz requires real, traditional-minded marketing – analyst briefings, social media, targeted campaigns, etc. This requirement can’t be “disrupted” away.

And once you’ve reached out to developers, it takes more than just marketing to keep their interest. It takes community support – once you establish your Devangelists, who will work alongside them to manage forums, set up meet-ups, and help generate interest in your API-related hackathons?
And it’s not just about marketing and community support, add into the mix business models and roadmaps as well. If you really want to have a successful external API, you need to assign a Product Owner – someone focused on how to get business value from that API and where to take that API in the future.

To sum up - __*Once you dress it up and take it out on the town, your external API is a product.*__

Treat it the same way you treat all of your other products. That means building a cross-functional team that can look at all aspects of bringing an API to market – from market analysis to experience design to infrastructure. Putting the right plans in place from the beginning converts your sloppy Cheeto-stained API into a fashionista that makes your whole company look good. And that everyone will want to stand next to at the holiday party.
