---
title: "Week 12B: AT3 Forza Telemetry"
published_at: 2025-06-03
snippet: The final culmination of a semester of learning to creatively code. Thank you for this semester, it's been a standout class for me and I will never forget it.
disable_html_sanitization: true
allow_math: true
---
**Code:** https://github.com/TravvDogg/FH5-Telemetry
**Video Link:** 
# Script
Hi.. My name is travis and for the past month i've been working on this tool you can see on screen, and i'd like to share a bit about it with you
## Plan
Forza Horizon is a car-focused open-world sandbox game by Playground Games. It has a passionate community, with a specific sub-community i want to talk about today: The Tuners, who find passion in squeezing the best performance and handling out of every car.

As someone who experiments with tuning myself, I realised that while the game offers powerful built-in telemetry tools, they often fall short, and the paged layout makes it harder to use.

So i planned to create an external telemetry viewer, which showed all the data at once, so tuners can choose what to look at with their eyes, instead of hidden behind pages.

## What Happened

I began exploring how to extract the data from the game. Forza outputs some data via UDP packets, which was something i hadn't worked with before. It wasnt long before i discovered that these packets couldn't be directed straight to the browser, instead i needed a bridge.

So i learned to build a Node.js based bridge that converts UDP to WebSocket messages for the browser to interpret. After that, i introduced the visual elements i created earlier in Figma.

Learning Node.js reminded me of Mycelial creativity. Everything i was learning, or everything that blocked my path led to learning something new, which branched off endlessly into different ways that just kept feeding my project.

## What Was Interesting
As i developed my tool, i shared my progress on Reddit and the Official Forza Forum. The Reddit Post caught more traction than i thought it would, the the community showed their interest and engagement with my project. They asked questions, provided feedback, and validated the tools potential use. Seeing this helped motivate me to push the tool to where it is now.

Thats what really struck me, this project wasnt just built in a vacuum. It was collaborative. Even when asynchronous, the shared purpose and passion of the Forza community helped shape it into what it is, and what it will be.

## The future

What i'm able to show today is just the beginning. It's working and it's usable, but i will take it a long way. The community has given enough feedback to tell me that this is something genuinely useful, and i plan to really build on that, and create something truly meaningful to the community. I plan to keep growing this project far beyond the scope of this assignment, as a personal project.

For example, I would love to include an option for focused modals, or moving around grid squares, like this reddit user suggested.

For now, the ease of deployability is quite low. I haven't figured out an elegant solution for processing UDP packets inside the browser, so you need to run this program locally through node.js. I've made sure the process is short and easy, and it works on any desktop platform.

I've had a lot of fun creating this tool, and i can already notice a difference when tuning. Aside from the kinks that need ironing out, or the larger scope for the future, i'm overall really satisfied with what i was able to achieve

Thanks for checking out my project, I hope you felt inspired to get out there and do something creative!