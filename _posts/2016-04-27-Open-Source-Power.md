---
layout: post
title: "Open Source Power"
date: 2016-04-27 15:00:01
theme: 
author: John Cavan
tags: engineering blog
category: blog
images:
---
Many years ago – we won’t talk about how many – the professional services company that I worked for was hired by a major Canadian bank to make web-based versions of a number of their forms and applications. At this point in time, the king of the Internet was Netscape – you browsed using Netscape and the commercial web server of choice was Netscape. Basically, it was Netscape or nothing – especially for big banks. The challenge; however, was that this particular project was being built on AIX 4, using Perl Common CGIs that screen-scraped an AS/400. And I bet you can guess which web server the client chose to power all of this with ... You’ve got it, none other than the massive Netscape Enterprise Server.
<br/><br/>

<!--more-->

This being the day of dial up, some of the things we take for granted now, like multi-threaded applications, were still in their infancy. For AIX, there were no threads and you had to fork your processes to handle multiple requests. This is exactly what the Netscape Enterprise Server did, and it did it for each and every request that came its way. Not too much of a surprise, when we put a little bit of load – let’s say 5 users – on the system it came to a glorious and screeching halt. At this point, if you guessed that the IBM server had four CPUs, you were right.
<br/><br/>

So, in order to progress with user testing, I installed the Apache HTTP web server on the server. Now, like Netscape, Apache still had to fork on AIX, but the processes were so lightweight and so quick that the server was able to manage many more requests and stay stable. We got through the testing, but before going live, the Managing Director on that project was insistent that we get Netscape working. His reasoning was that Netscape was a commercial product with support and that they wouldn’t have support if they went with Apache. I disagreed, the Apache community has remained a phenomenally supportive community, but I also noted that Apache worked and Netscape didn’t. 
<br/><br/>

The CTO for the bank chose Apache. 
<br/><br/>

Fast forward many years later and Open Source is everywhere. Many of us have it powering smart devices in our homes, in our pockets and on our wrists. Banks are no different. 
<br/><br/>

Capital One® is making a significant investment in the adoption of Open Source technology and we’re powering more and more of our solutions with Linux, MongoDB, Apache Tomcat, AngularJS, PostgreSQL, Node.js and more. We’re using these technologies because they enable us to create the experiences we want to create for our customers. Not only can we use these technologies to harness the massive power of the Open Source community, but we can also use them to enhance and adjust for our needs in ways that classic commercial software just doesn’t allow for – and we can do it on a massive scale. It has to be a massive scale; after all, we’re not a corner store!
<br/><br/>

We’re not just using Open Source; we’re giving back to it too. Not only are we able and willing to contribute to existing Open Source platforms, we’re adding our own and putting them up on GitHub [link to our repo] for anyone to use. This is how much we believe that Open Source is the key to creating great customer experiences.
<br/><br/>

At the end of the day, if your business has been bypassing the Open Source world because you’re concerned about issues like support, then you’re missing the real wave. It’s not even the future, it’s here and now. Open Source is able to power some of the largest businesses in the world and it’s making deep inroads into powering the world of finance.
<br/><br/>

More importantly, from my perspective as a technologist and software engineer, it powers innovation and empowers me. That’s a hard thing to beat.
<br/><br/>
