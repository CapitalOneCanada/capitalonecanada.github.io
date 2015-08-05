---
layout: post
title: "Baked vs. Fried – Who’s Hungry on the Cloud?"
date: 2015-08-05 10:00:00
author: Terren Peterson
tags: [cloud]
category: blog
---

Okay, so this post really isn't about food, rather it's about a key concept in how to manage infrastructure on the Cloud.  As we evolve processes for how to automate the provisioning of infrastructure, there are different approaches we can adopt in how to manage the scripting.  Baked & Fried are catchy terms that are used in the industry to describe different automation techniques, and this blog gives some more background on the relative merits of each, and how we're approaching this.

## Background
Everyone uses terms a little differently, so I’ll reiterate a few of the basics here.  First, I’m making distinctions between instances and images.  For a technology like AWS, the image would be the AMI, and the instance would be EC2.  In the context of this post, distribution relates to the Linux kernel distributions – i.e., RedHat, Ubuntu, AWS.

The concept of containers is touched on here and is a critical topic by itself, so the context for this is focused on how they can shift configuration away from the instance, and ignores the tooling and methods for how the container is getting packaged, which may be seen as moving the problem around.  Extending the cooking metaphor, a type of frying using containers.

## Provisioning Options

### Baked
Building on the cooking term, the reference is to mix together the different infrastructure and software components ahead of time, and then "bake" them into the image.  This is helpful when standard packages are required every time, and can be included into the base image, like monitoring and security software agents.  This applies to security components as well, and if there are packages that we don’t want installed as default to the image as they can be configured in such a way to open up threats.  It also can be extended for applications, where you create an image that is custom for an application – for example, an image based on Linux, including Tomcat as well as custom Java portal framework libraries.  In our early journeys with datacenter automation, scripting out RPM’s installs were needed to build servers because this is how many images were managed in our environment.  To ensure consistency, we baselined a set of automation and scripting that would yield a core platform image that an application could then be deployed to.  With this approach, there are benefits around the provisioning time; however there is operational overhead with managing a large library of images as we found that we ended up with dozens of different images, each with subtle differences.

### Fried
Once again leaning on the cooking term, the reference here is to combine the ingredients during preparation.  This is the primary approach we're doing on our Cloud platforms, and assumes starting from a base image, then adding software and components on top of it.  In this technique, the number of image instances are few, and the effort is more around the recipes that add software on top of the image.  This heavily leverages tools like Chef, and there are other tools that can be included as well like uDeploy that deploy the application on top of the image.  The benefits are around the simplicity of managing the images, however there can be limitations with this approach if the amount of time required by the recipes is lengthy.  Many of our modern applications have an elasticity component to them, so spawning new instances on the fly is a key requirement, and it’s critical to understand the “frying time” required in this model before new capacity can be effectively utilized.

## Industry Direction?
Both provisioning techniques are used within the industry, and it depends on the "cook" to choose which one to leverage.  There are other tools that are getting added to help out in the processes to make additional automation steps easier.  First there is Docker, which builds on the fried concept, whereby a Docker container is provisioned onto an existing image.  This approach helps reduce the number of images, and that any uniqueness for an application is within the container.  There is then a whole ecosystem of tools that then automate the steps within the container creation.  Another technology we’re testing out is Packer, which can take one image, add software components, then create a new ones.  That’s a baking model, but offers controls to make sure we manage the growth in images.

## Which is Better?
Both approaches have merit, and since both are automating the provisioning process, they are achieving positive benefits around provisioning speed and consistency.  Like most engineering patterns, choosing which requires understanding the broader context of the environment being managed.  For us, ensuring that security controls are always adhered to is a non-negotiable, so reducing the number of images (and who can create them) is of significant value, so +1 for frying.  There are times where optimizing the provisioning time has value, and unlike in cooking, baking is much quicker than frying.  For the elastic infrastructure approach to be effective, the application can’t just queue up transactions for 20-30 minutes while scripting is running in post-provisioning, so a +1 for the baking approach.  Container proponents will also point this out as an opportunity to cut provisioning times from minutes to seconds, so perhaps that helps us find the sweet spots of both approaches.
