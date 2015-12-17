---
layout: post
title: "Fast Data Platform at Capital One"
date: 2015-12-17 17:06:00
author: Javed Roshan
tags: [fast data, go, docker, cassandra]
category: blog
---

Data and data analysis are two of the founding principles on which Capital One’s success is built. As a digital leader and major player in the finance industry, our applications require speed, accuracy, and the ability to handle, store, and analyze huge amounts of data. After being hired as a Director, Data Services earlier this year, I spent time exploring the current data landscape in our Financial Services (FS) organization with an eye towards process optimization. From this in-depth analysis, I was able to identify key areas in the landscape where data processing could be made more efficient, helping Capital One to deliver on the speed, accuracy, and digital capacity our customer’s require.

<!--more-->

The resulting proposal was to adopt several specific open source technologies to create a new data platform for Capital One. The core set of technologies we chose – Go with Docker, Kafka, & Cassandra - would enable us to reduce the total cost of ownership, switch from 24-hour batched processing to near real-time data handling, and ensure data consistency with a single destination data store.

## Executing A Proof of Concept

Before committing to a new technology stack, we wanted to take it for a test drive and validate it for our use case. We set out to create a 'proof of concept' by picking up two existing operational reports and delivering them end-to-end. This PoC phase was completed in three weeks and we successfully delivered the two reports. The decision to go to a cloud platform helped tremendously in the pace of the delivery. 

What was the logic behind using this specific technology stack? For coding data transformation services we used “Go” since it promised the ability to process data at a high rate; using Kafka as the message broker system provided us a highly available solution for data distribution; and given the nature of our data and our preference for a No-SQL data store, Cassandra was an obvious choice as the destination reporting DB. Rounding out the PoC, we also developed a Single Page Application (SPA) as a data visualization layer using Angular.js, Bootstrap and RESTful services to fetch and render data on the web page. The API and web servers were written in “Go” as well.

## A New Fast Data Platform – Core Guiding Principles

After the 'proof of concept' was done, the next step was to start working on the design and development of the platform. Knowing development would be a long journey, we took the approach of building it incrementally rather than as a big-bang cutover. Our plan was to deliver the reports in a phased manner by retiring them from the old platform and bringing them over to the new platform one-by-one. 

*The two core guiding principles used when creating the platform in this method were:*

1. Move the data when available at the source system. i.e., Avoid 24 hour batch processing.
2. Transform/Aggregate when all data available. If the complete data to perform an action is unavailable, keep collecting until all data is available. Then trigger the completion of the transformation upon the last data element’s arrival.

Using this method, we delivered the first scorecard/report in production with a few pilot business users in just under four months.

## Technology Rationalization – Key Components

As stated above, the three key components of the platform are a service to ingest and transform/aggregate data, a messaging layer that acts as both a buffer and as data distribution to other subscribers, and a data store. Also, we wanted the platform built around the core guiding principles of move the data when available and transform/aggregate when all data available. Here is a more in-depth breakdown of the elements in our program.

### The Ingestion Layer

“Why not Spark?” This is the most common question developers ask about our new Fast Data platform. 

When we started building this platform, we decided on an ingestion framework using “Go”. At its core, this framework is very basic with a generic pipeline-based workflow using plugins that create a single service (read process). We decided to use this same framework to transform our data rather than adding a yet another framework - like Spark - into the platform.

**Why Go?**

The choice of “Go” was based on the following facts:

* Code that compiles to native machine level binary. No intermediate code and no runtime requirements.
* Inherent support for concurrency.
* Fast compile and run-times.
* The confidence that a superior quality of code can be written in “Go” rather than in Java/JVM based languages.
* The positive experiences and biases that Mukaram Aziz and I had from using “Go” on previous projects.☺

### The Messaging Layer

Using Kafka for the messaging layer was an obvious choice since it can handle very high throughputs of messages. We benchmarked Kafka with writes up to 400k messages per second.

Kafka also serves the following additional purposes in our platform:

* Buffer to handle the back-pressure when necessary.
* Replay messages when required. This is useful because messages are re-processed from Kafka instead of pulling them again from the source systems.
* Distribution channel for other systems interested in the data created on this platform.

### The Data Store

Why Cassandra? We wanted to create an industrial strength operational reporting environment where all data processing would be systemic rather than ad-hoc. The analytical platform on the Hadoop based Data Lake will be used for exploratory/ad-hoc data processing. The decision to go for a No SQL data store and not with the traditional RDBMS was obvious because of these requirements:

* Fast writes and fast reads.
* Ability to store wide rows of data.
* High availability.
* A single consistent store for the entirety of data being handled.
* Disaster Recovery support out of the box.
* Open source based platform.
* Ability to store time-series data.

We spent a lot of time modeling data for efficient, fast reads and deliberated on various indexing schemes. In my opinion, this is where we will spend a lot of time in the coming months as we onboard more scorecards on to the platform.

### DevOps

The Continuous Integration and Deployment was setup with Jenkins, Docker, Make, and Bash scripts. All components of the platform are Dockerized except Cassandra. 

We are using Mesos to manage the cloud infrastructure and Marathon as the scheduler and monitoring tool for all Docker containers. Mesos/Marathon helps us to scale and run “x” number of service instances.

The configs for the services and other run-time information is hosted in Consul. Services self-discover themselves using the configs stored in Consul. They also store their intermediate state for any recovery to restart the processing from the last state.

![Solution Stack]({{ site.baseurl }}/assets/posts/fast-data-platform-capital-one/solution-stack.png)

## Cassandra Summit 2015 (Santa Clara, CA)

Our team has started the journey of building the new Fast Data Platform at Capital One and we have plans to make big strides in the next couple of quarters. 

Mukaram Aziz and I presented a talk about building the Fast Data Platform at the Cassandra Summit hosted by Datastax (September 21st-24th). We shared our experiences in using Cassandra in building to build this platform. We also learnt how other companies are using Cassandra for their use cases.

Our presentations are available online at:

**Video:** [https://vimeopro.com/user35188327/cassandra-summit-2015/video/143823838](https://vimeopro.com/user35188327/cassandra-summit-2015/video/143823838)

**Slides:** [http://www.slideshare.net/planetcassandra/capital-one-using-cassandra-in-building-a-reporting-platform](http://www.slideshare.net/planetcassandra/capital-one-using-cassandra-in-building-a-reporting-platform)


