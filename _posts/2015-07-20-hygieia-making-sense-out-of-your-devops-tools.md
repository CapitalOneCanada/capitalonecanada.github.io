---
layout: post
title: "Hygieia Dashboard - Making sense out of your DevOps tools"
date: 2015-07-20 10:25:00
author: Tapabrata Pal
tags: [devops, open source]
category: blog
---

Tools are a big part of today's Agile and DevOps methodologies. A typical project deals with Agile Project Management tool, Source Control, Continuous Integration (CI) tool, Testing tools, Static Code Analysis and Security Scanning tools, Deployment and Monitoring tools to name a few. Large enterprises and complex systems sometimes use multiple CI, Testing and Scanning tools. Each of these has nice dashboards to present key information stored in it. But what is lacking is a single, comprehensive end-to-end view of the state of a delivery pipeline in near real time. 

At Capital One, we believe that while tools, automation and collaboration are very important, a continuous feedback loop is critical to DevOps success. 

We looked for such a visualization tool in the commercial market as well as in the Open Source community. There are some excellent commercial Application Lifecycle Management (ALM) tools that allow one to visualize traceability between stories, code, tests and builds. These tools, however, do not cross over from build to deployment, meaning they do not provide visibility into deployment activities in the same dashboard. There are some good commercial Operations tools that provide visibility into server and applications’ run-time health, metrics, analytics, etc. These also do not provide visibility into the development and build activities. Open source tools/frameworks, such as Grafana, provide generic framework to build a dashboard, but collecting data from the DevOps tools is still a challenge.

So after evaluating many such dashboard products, we decided it was time to create our own because Capital One needed one single dashboard to visualize the full delivery pipeline at any given point in time.

When designing and building the dashboard, we focused on making it simple to configure and easy to use. Plus, since we knew it would be useful to others, we built it with the intention of sharing it with the world and offering an open source version.

Our DevOps dashboard, now known as Hygieia, is used extensively across Capital One, and we’re pleased to now offer it to you.

One of the [Three Ways of DevOps](http://itrevolution.com/the-three-ways-principles-underpinning-devops/) as described by Gene Kim is “Amplify Feedback Loop”. Hygieia is meant to amplify and shorten the feedback loop.
 
Here is a sample view of a dashboard configured for a real-life application:

![Dashboard]({{ site.baseurl }}/assets/posts/hygieia-making-sense-of-devops-tools-1.png)
![Dashboard]({{ site.baseurl }}/assets/posts/hygieia-making-sense-of-devops-tools-2.png)

The dashboard provides two views: Widget view and Pipeline view. 

The widget view shows information about features in the current sprint, code contribution activities, continuous integration activities, code analysis, security analysis, unit and functional test results, deployment and environment status. 

The pipeline view shows the components’ lifecycle progression through DEV, INT, QA, PERF and PROD. 

The main purpose of this dashboard is to make any clog in the pipeline easily visible so that a member of the team can take immediate action to remove it.

Out of the box, the dashboard application integrates with VersionOne, Jira, Subversion, Github, Hudson/Jenkins, Sonar, HP Fortify, Cucumber/Selenium and IBM Urbancode Deploy. 

We are actively building new features and enhancements, and are asking for feedback from many external organizations. So far, we have received awesome input from tools vendors and many big enterprises. 

Going forward we are hoping for contributions from Open Source communities as well as commercial tools vendor. 

The product will be launched during OSCON July 20-24, 2015 in Portland and is available on [Github](https://github.com/capitalone/Hygieia).
