---
layout: post
title: "Kicking off Agile development: Iteration Zero"
date: 2016-10-16 09:00:00
theme:
author: Oleksandr "Sasha" Lutsaievskyi
tags: engineering blog
category: blog
visible: true
images:
---
Beginning a new Agile project is controversial – does the team spend time building basic architecture before jumping into delivering features? When should the team set up 
tools and environments? How is it even possible to start delivering stories that are valuable for business right in the first Sprint without having anything ready for development?
<br/><br/>

<!--more-->
In his article, “<a href="http://www.drdobbs.com/architecture-and-design/where-did-all-the-positions-go/187203749" target="_blank">Where did all the positions go?</a>”, 
Scott W. Ambler describes the lifecycle of Agile delivery, starting from Cycle 0 (other Agilists refer to this initial iteration as Iteration Zero or Sprint Zero), 
where the team is built and trained, the necessary tools and technical environments are set up, the team and stakeholders get aligned on the product vision, 
product backlog and roadmap. Sounds like a phase of a traditional sequential project? The difference, however, is that the same goals are achieved with a lot less 
effort – Iteration Zero is typically a couple of weeks.
<br/><br/>

Iteration Zero doesn’t necessarily deliver any functionality to the customer, although it’s a good idea to validate built environments and tools by delivering 
one small and simple feature – fully tested and ready for shipping. Instead, the team focuses on high-level analysis and design, configuring the environments, 
and building simple processes that will be required for further adoption of Agile practices. The idea is to complete the bare minimum that will allow the team 
to start building the product (story by story) in the next Iteration.
<br/><br/>
<img src="/assets/img/blog/kicking-01.png">
<sup>Image Source: <a href="http://www.drdobbs.com/architecture-and-design/initiating-an-agile-project/188700850">http://www.drdobbs.com/architecture-and-design/initiating-an-agile-project/188700850</a></sup>

<h4>Planning the Iteration Zero</h4><br/>

Consider Iteration Zero as a regular iteration. Hold a short planning session with team members to understand all the preparations you’ll need to complete for implementing features in the next iteration without any delays or blockers. Ask yourself what you’ll need in order to deliver features? What don’t you know about delivery and need to clarify?
<br/><br/>

It’s important to keep the iteration timeboxed, so the initial work will not become a long phase with no valuable outcome for business due to gold-plating and analysis paralysis. Set estimates as best you can for the planned work. During the iteration, refine the backlog by adding additional activities if any are discovered.
<br/><br/>

If you have more time before starting the project (e.g., you’re still forming the team or getting business commitment), consider using Kanban to get prepared for delivery, but planning and prioritization are still important to stay on track.
<br/><br/>

In his post, “<a href="http://peterschuh.com/?p=129" target="_blank">Iteration Zero</a>”, Peter Schuh recommends including the following outputs for Iteration Zero, from an organizational point of view (I added a bit more outputs, too):
<br/><br/>

* Wiki is set up
* Issue-tracking system is set up
* Product Vision is created and shared
* Initial product backlog is populated; features are estimated and prioritized
* Agreement on initial approach to the iterative process is reached between team and stakeholders
* Initial Definition of Ready and Definition of Done checklists are agreed and shared
* Initial product roadmap that pre-assigns each story to a release or iteration is created. This plan will most likely be changed in the future, but having a roadmap in mind helps with identifying risks, dependencies and agreeing delivery roadmap with stakeholders.

The acceptance criteria for these actions can be publishing initial artifacts to Wiki, and populating product backlog in the issue-tracking system.
<br/><br/>

From a technical perspective, the Iteration Zero may include:
<br/><br/>

* Source control system is installed and configured
* Initial build script written and checked into source control
* Initial promotion and deployment scripts are written and checked into source control
* Automated test framework selected and implemented with an empty test suite
* Coding standards are agreed and shared
* A high-level application architecture is created

Peter Shuh suggests validating the delivery of these technical activities by wrapping them around a “Log In” feature. If the application doesn’t have log-in functionality, any simple and small functionality will do, even as simple as a “Hello World” screen. This simple feature can be the first piece of functionality to go through all the steps of the deployment process: pass a test in the unit test framework, run through the continuous integration process, check in to source control, promote to the testing environment, and deploy automatically.

<h4>Running an Iteration Zero</h4>

If you don’t have a team yet, it’s important to start building it. You’ll need at least the key team members to help with technical validation of requirements, building environments and the initial design in order to start.
<br/><br/>

Immediately start the daily standup meetings in Iteration Zero to keep the team on the same page and to effectively reach their goals.
<br/><br/>

Set up a working environment – both technical and physical. In addition to development/QA environments, testing tools and continuous integration, make sure to have dedicated whiteboards and wall space to post information radiators and share statuses.
<br/><br/>

Get a shared understanding of the Product Vision between stakeholders and the team. It’s vital to ensure that everyone involved in the product development is on the same page regarding what they’re building. The Product Vision describes core features of the product, target audience, business and user needs. It’s used to create alignment of the product for everyone involved. 
<br/><br/>

<img src="/assets/img/blog/kicking-02.png">
<sup>Image Source: <a href="http://www.romanpichler.com/blog/the-product-vision-board/">http://www.romanpichler.com/blog/the-product-vision-board/</a></sup>
<br/><br/>
Build the Product Backlog based on the Product Vision. Instead of sending emails back and forth and holding numerous interviews with the Product Owner, an effective way to collaboratively build the backlog is to run a facilitated user story writing workshop. I usually take 3-4 hours for this meeting, although for larger projects, a series of workshops may be needed. The Product Owner, the team, and anyone who can contribute to the requirements or help with validation of feasibility of the features is invited to the meeting. Participants collaboratively populate the backlog while gaining shared understanding about needs and wants.
<br/><br/>

There should be at least one facilitator in the meeting to draw on the whiteboard, keep the meeting on track and ensure that the goals are met. Also, there should be at least one scribe to write down notes and details about any requirements discovered.
<br/><br/>

Start from re-iterating on the Product Vision, then identify core features and user roles, and for each core feature and role, identify the list of features. This top-to-bottom approach helps to keep a high-level picture in mind and if you run out of time, there will be at least high-level deliverables for further grooming.
<br/><br/>
<img src="/assets/img/blog/kicking-03.png">
<br/><br/>

Run an initial estimation session with the team. Using consensus-based estimation practices such as Planning Poker or Affinity Estimation will also help the team agree on a high-level approach for building the features.
<br/><br/>

While a prioritized and estimated backlog helps to get an idea of the order of delivering the features, it’s still difficult to understand when exactly each feature is shipped, and what are the timelines and what risks we should mitigate in the near future. It’s helpful to build a product roadmap to understand the planning horizon for upcoming releases. This can be done by simply pre-assigning the features to future releases or Sprints – and this plan shouldn’t be and cannot be very precise, as we’re only in the beginning of our product development journey. 
<br/><br/>

In the article, “<a href="http://jpattonassociates.com/the-new-backlog/" target="_blank">The New User Story Backlog Is a Map</a>”, Jeff Patton advocates grouping the stories by epics and Sprints in a grid with stories prioritized vertically for each epic, and sliced by Sprints. 
<br/><br/>
<img src="/assets/img/blog/kicking-04.png">
<br/><br/>

Iteration Zero is also a good time to start sketching an architecture design. The goal is to get agreement from the team on the strategy for implementing architecture and to validate the feasibility of the architecture in the realities of the enterprise. At this point, there’s no need to create heavy documentation, as the architecture will evolve and change in future.

<h4>After the Iteration Zero</h4>

After Iteration Zero is over, start the next normal iteration following the tailored Agile methodology you agreed to use. During first iterations pay close attention to feedback loops to adjust the process, and bypass Tuckman’s “Forming” and “Norming” phases sooner. If you’re using Scrum – Backlog Grooming, Sprint Review and Sprint Retrospective events are especially useful for the first few Sprints. 

<br/><br/>
