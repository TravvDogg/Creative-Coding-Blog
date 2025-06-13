---
title: "Week #n:"
published_at: 2025-05-22
snippet: 
disable_html_sanitization: true
allow_math: true
---
https://rmit.instructure.com/courses/151099/pages/h-o-m-e-w-o-r-k-11-a?module_item_id=7345085

1. work out how to do screen recording on your computer.
2. record a few minutes of yourself:
    - researching your AT3 community of practice
    - working on your code
    - using online resources to help you with your project
3. use some video editing software to modulate the playback speed your screen recordings
    - speed up the boring bits
    - slow down when there is something important or interesting being shown
4. write down your plan for AT3.  Include:
    - the domain, repertoire, and values of the community you have chosen
    - an explanation of the code you are planning to use
    - a practical description of what your plan is / how you see it working
5. rewrite the text you wrote in task 4 as a haiku (or similarly short form)
    - you may need to iterate with different angles / emphases until you find the version you like
    - you can use AI assistance for this task
6. use the text from task 5 as a voice-over for your speed-modulated screen recording.  
    - set it to some (copyright free) music
    - post it on youtube (or wherever)
    - embed it in a blog post
    - along with some discussion



# Task 4:
## Community
FH5 Tuning Community
Domain: Performance tuning
Repertoire: Shared setups, Tuning guides
Values: Precision, feedback, experimentation
## Code
I will use WebSockets in a browser based application to receive UDP packets broadcasted by FH5. The UDP data containing telemetry data will be bridge via my script that captures the UDP data and re-sends it via WebSocket to the browser. The frontend will visualise this data in real time using Javascript and the D3.js library.

## Plan
My program acts as a standalone telemetry dashboard that runs on an extenral computer or monitor. Forza players will configure the game's settings to broadcast telemetry data via UDP, which will be translated into WebSocket messages to be sent to the browser, which will render the telemetry data in real time.

# Haiku
  

Car telemetry
From Xbox to browser screen
Used for tuning cars.