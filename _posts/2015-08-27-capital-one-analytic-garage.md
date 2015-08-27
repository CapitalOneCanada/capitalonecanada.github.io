---
layout: post
title: "What's in your wallet? Capital One Analytic Garage"
date: 2015-08-27 09:50:00
author: Santosh Bardwaj
tags: [analytic garage, docker, big data, mesos, hadoop, open source]
category: blog
---

As part of Capital One's Data strategy, we have embarked on an overall technology transformation to ensure our analytic leadership as we move to the world of Big Data. The key objectives of this strategy include:

* Build an analytics architecture centered on a Hadoop-based Enterprise Data Hub
* Empower our associates to dream and disrupt by providing them access to state-of-the-art tools, unconstrained data and processing

A key aspect of this strategy involved fast prototyping of insights by leveraging the power of open source tools. To engineer an environment that enables the pace of innovation, we had to incorporate the following guiding principles:

* Enable self-evaluation and localized testing
* Given the volume and variety of tools in the open source landscape, incorporate workload isolation and management
* Accommodate fast prototyping of new tools/insights and progressing these to production

## Solution Description

Capital One's Data Engineering team developed the 'Analytic Garage' as part of the overall Big Data ecosystem to enable our users and analysts to prototype new tools and insights.  The evolution of the Analytic Garage went through a couple of iterations, where we struggled to manage the variety of workload originating from the different types of tools.  We evaluated Docker container technology as a way of isolating workloads and offer our Data Scientists a personal sandbox to carry out their evaluation and development work without impacting other users on the environment. This also helped isolate the impact of long running jobs or tool-related issues just to that sandbox.

Further, the Docker Analytic Garage was integrated with the rest of the Big Data ecosystem. This enabled the Analytic Garage to be part of the 'satellite region' with high-speed access to the Hadoop Data Lake and ensured it was governed by appropriate Data management controls.

![Dashboard]({{ site.baseurl }}/assets/posts/analytics-garage/analytic-garage-evolution.png)

To increase adoption of the Analytic Garage, the engineering team enhanced the capability of this platform by incorporating the functionalities into a self-service portal, which gave the users a UI to self-deploy analytic sandboxes and integration with Kerberos, providing a single sign-on experience for the users. 

![Dashboard]({{ site.baseurl }}/assets/posts/analytics-garage/environment-snapshot.png)

As we were designing the analytic sandbox image, we had an option of developing individual images for each tool. This approach would have meant we'd have more than 30-40 different container images, resulting in complexity orchestrating model development across multiple containers.  To minimize complexity of adoption, we created a virtual private server by integrating multiple analytic services into a single Docker image, providing our users a familiar data-centric sandbox environment.

Security on the Analytic Garage was setup to audit both changes to the sandbox image and audit certain roles. In addition, the Docker containers were integrated with Kerberos and a centralized Active Directory to access Data on the Hadoop Lake. This ensured that the data management and governance that was on the Data Lake could be enforced on the Analytic Garage as well.

## Performance

When we proposed the concept of container-based sandboxes, our analysts were skeptical about the performance and scalability of this platform. We had tested running analytics on Virtual Machines (VMs) and found the performance to be inadequate.  Given the performance sensitivity of many of our analytic/statistical models, it was critical that the performance penalty on the Docker Analytic Garage be kept to a minimum. We were very pleased when we saw the performance on the Analytic Garage was virtually on par with bare metal and this gave us the confidence to test intensive models on this platform.

![Dashboard]({{ site.baseurl }}/assets/posts/analytics-garage/execution-time.png)

## What's in your wallet?

As the usage of the Analytic Garage expanded, we wanted to extend the functionality of this platform and be available in the back pockets of our users (Literally!!) to test and deploy new tools without having to connect to the server farm.  We leveraged 'Boot2Docker' to create a complete data-analytic stack with a comprehensive list of analytic tools, operational data stores, and Hadoop build, all packaged in a USB drive. The team is putting finishing touches on the 'Analytic Garage in your wallet' and is working toward offering this to others as an open source contribution.  We'll soon share more about when it will be available.

![Dashboard]({{ site.baseurl }}/assets/posts/analytics-garage/analytic-garage-banner.png)

We are working on expanding the use of this platform to a larger group of users and minimizing some of the orchestration complexity by migrating to a Docker only stack. 
