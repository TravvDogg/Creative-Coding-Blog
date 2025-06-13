---
title: "Week 12B: AT3 Forza Telemetry"
published_at: 2025-06-03
snippet: The final culmination of a semester of learning to creatively code. Thank you for this semester, it's been a standout class for me and I will never forget it.
disable_html_sanitization: true
allow_math: true
---
https://rmit.instructure.com/courses/151099/assignments/1086357
# Script
Hello! My name is Trav and i'm developing a tool for the Forza Horizon Tuning community for my AT3
## My Plan
### The community
Forza Horizon is a game series developed by Playground Games, and offers a car-centric open-world sandbox experience where users can do whatever they want. A large portion of this game's community are the tuners. 
### The problem
Forza horizon 5 offers decent built in telemetry tools for tuners to use, but as someone who tinkers a bit myself, i found them quite challenging to use due to their paged layout
### The solution (my project)
And as a response to both this issue and my assignment task, i decided to work on a solution, offering off-screen telemetry data for the users.
## What actually happened
### Process
I was able to extract data out of Forza's 'telemetry out' options, but the data sent was in UDP packets, which i quickly learned needed special treatment before they could be sent to a web browser for display
### Success
I was able to learn and create a rudimentary script that allowed a bridge between the UDP connection and a WebSocket to the browser, for the information to be rendered. From there, it was only a matter of time until i was able to import all my SVG's from Figma into the javascript
### Community Interaction
Along the way, i shared my project with the Forza community, and they loved the idea! I got the most traction from the Reddit community, with enough interaction to fuel my progress even further, and providing feedback for later stages of the project

## What was interesting
What i present today is the culmination of weeks of effort to get something to work. Yes there are improvements, but the scope of the final project is far larger than the scope of this assignment. So i present my telemetry view! This is fully usable on any desktop platform with node.js and a browser. The need for node.js exists because i am yet unable to find a safe way to bridge between UDP and the web browser, without using an external client. So for now, that is how it is.
### Future work required
This project has a long future ahead of it. What i deliver today marks the framework of a much larger project that i will work on far into the future, as a personal project.

Thank you for taking the time to check out my project! Have a great day.


Submit **the URL of your video**, and include the in the comments:

- **the URL of your code**
- **the URL of your blog**
https://rmit.instructure.com/courses/151099/assignments/1086357



# Script #2

## Plan
Forza Horizon is a car-focused open-world sandbox game by Playground Games. It has a passionate community, with a specific sub-community i want to talk about today: The Tuners, who find passion in squeezing the best performance and handling out of every car.

As someone who experiments with tuning myself, I realised that while the game offers powerful built-in telemetry tools, they're far from perfect, and its paged layout makes it harder to use.

So i planned to create an external telemetry viewer, which showed all the data at once, so tuners can choose what to look at with their eyes, instead of hidden behind pages.

## What Happened

I began exploring how to extract the data from the game. Forza outputs some data via UDP packets, which was something i hadn't worked with before. It wasnt long before i discovered that these packets couldn't be directed straight to the browser, instead i needed a bridge.

So i learned to build a Node.js based bridge that converts UDP to WebSocket messages for the browser to interpret. After that, i introduced the visual elements i created earlier in Figma.

Learning Node.js reminded me of Mycelial creativity. Everything i was learning, or everything that blocked my path led to learning something new, which branched off endlessly into different ways that just kept feeding my project.

## What Was Interesting
As i developed this, i began sharing my progress on Reddit and the Official Forza Forum. The Reddit Post caught more traction than i thought it would, the the community showed their interest and engagement with my project. They asked questions, provided feedback, and validated the tools potential use. Seeing this helped motivate me to push the tool to where it is now.

Thats what really struck me, this project wasnt just built in a vacuum. It was collaborative. Even when asynchronous, the shared purpose and passion of the Forza community helped shape it into what it is, and what it will be.

## The future

What i'm able to show today is just the beginning. It's working and it's usable, but i will take it a long way. The community has given enough feedback to tell me that this is something genuinely useful, and i plan to really build on that, and create something truly meaningful. I plan to keep growing this project far beyond the scope of this assignment, as a personal project.

Thanks for checking out my project, I hope you felt inspired to get out there and do something creative!


Submit **the URL of your video**, and include the in the comments:

- **the URL of your code**
- **the URL of your blog**