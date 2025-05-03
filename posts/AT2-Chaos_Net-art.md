---
title: "AT2: Chaos!"
published_at: 2025-05-04
snippet: "I demonstrate net art of the 'Zany' aesthetic register, responding to an essay by Michael Serres"
disable_html_sanitization: true
allow_math: true
---

# **IMPORTANT: Read Disclaimers Before Scrolling**

### Copy of README.md:

<div id="readme-wrapper">
  <div id="readme-container">Loading README...</div>

  ### Once again, please **DO NOT** interact with this piece if you have symptoms of epilepsy.
</div>


<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script type="module">
  fetch('https://raw.githubusercontent.com/TravvDogg/A2_Chaos/main/README.md')
    .then(response => response.text())
    .then(md => {
      document.getElementById('readme-container').innerHTML = marked.parse(md);
    })
    .catch(err => {
      document.getElementById('readme-container').innerText = 'Failed to load README.';
      console.error(err);
    });
</script>

<div>

# <br>
</div>

# My Net-Art: Music Visualiser

<iframe id="A2-Chaos_Frame"
  src="/A2-Chaos/index.html"
  style="width:100%; aspect-ratio: 4 / 3; display:block; border:none;"
  sandbox="allow-scripts allow-same-origin"
></iframe>
<small>A2_Chaos on [Github](https://github.com/TravvDogg/A2_Chaos)</small>

---

Creating this visualiser was a lot of fun, and there is still a lot i can do with it, given the time to progress further, but i'm more than happy to submit it in the current state, as it demonstrates my idea pretty well.

Getting this to render in the markdown file took quite a bit more time than i'd happily admit, but in the end the solution was much simpler than anything i was trying to do - Just wrap it in an iframe and call it a day. Do mind that it does look different from fullscreen and i did apply band-aids to the code where it rendered differently than intended. My uploaded github repo does not include these band-aids.

# My Process
Earlier i mentioned that i had a lot of fun making this piece, but when i say this piece, i really mean everything that led to it. 

What you see in the final piece is the set of individual parts that made it to the final submission, but what you don't see are the many precursors to them. I had a lot of fun creating and trying different things, and playing around with every part of each simulation or generation to see what funky ways i could make it react. This process required completely forgetting everything i knew about the code, and viewing it as an abstract set of instructions, so i could play around with these instructions without any expectation of what would happen.

Realizing this abstraction was a key part in unlocking my creative potential.. Or rather, separating my creative mind from my technical mind.

# Each Piece of the code, Explained
As mentioned earlier, this piece is a culmination of many previous attempts. As such, it's fairly easy to go through line-by-line and extract the meaning behind each modular part of the code. Note that the code i document will be *slightly* different from the code embedded in this document: The intended experience is in fullscreen, so the documented code is the fullscreen code. The only differences will be how the sizes of the frame and objects are calculated.

Although inherently most of the code was made without it, almost every working visual element relies on different parts of p5's audio engine to modulate or control them. Without access to an FFT (fast fourier transform) like p5 provides, there simply would be no option for audio visualization, and it would be a completely randomly generated frame, which wouldn't be very interactive or interesting to play with. 

## Sketch.js

Starting from the script that controls it all, `sketch.js` is where *most* random visual elements culminate. Most importantly, it's the script using the FFT and as such, controls each other part of the simulation. 

This code uses the `P5.min.js` library, and the `p5.sound.min.js` library to function. TLDR: it uses P5. 

This script joins `particle.js` in being the only scripts using P5's libraries.

Let's break it into parts, so it's easier to digest, and a bit less daunting to look at:

### Sketch.js Part 1: Setup and Initial Declaration
```js
/* \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
------------------------------------------------------------------------
        Written by Travis Lizio | Creative Coding A2
------------------------------------------------------------------------
        Main Sketch. 
------------------------------------------------------------------------
\\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ */

// Variable declaration
let buffer
let particles = []
let mic, fft
let audioLevel
let glitchAmount

let squareSize

// Control the glitch frame's frequency and duration
let glitchX, glitchY, glitchW, glitchH
let glitchFrames = 0
const glitch_duration = 200
const glitch_chance = 0.001

// Mandelbulb camera movement parameters
let cameraZ = 0.01
let cameraYaw = 0.01

function setup() {
  frameRate(60) // 60FPS
  let c = createCanvas(windowWidth, windowHeight) // Fill the window
  c.id('p5canvas')
  pixelDensity(1) // Make sure large resolutions (retina displays) don't cause excessive lag
  background(100) // Medium gray background
  
  // offscreen canvas to hold the last frame
  buffer = createGraphics(windowWidth, windowHeight)
  buffer.pixelDensity(1)
  buffer.background(100)
  
  // mic + FFT
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT(0.8, 1024)
  fft.setInput(mic)
  
  // Disable stroke on shapes
  noStroke()
}

// Handle resizing window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  buffer.resizeCanvas(windowWidth, windowHeight)
}

```
Thanks to my beautiful and detailed comments, im sure you can piece together what's going on. But incase you are normal and dont want to read through code, i'll explain everything in plain text (mostly) right here!

At the top of the block, we initialise some variables like `buffer`, `particles` and `squareSize`, for our visual elements. We also initialise `mic`, `fft`, `audioLevel` and `glitchAmount` for use in augmenting our visual elements, based on volume and frequencies

In our `setup()`, we call some functions, mainly initialization. Most importantly, we create the buffer to be used as a 'screenshot' of the canvas, and we initialise the FFT and mic input.
> FFT stands for Fast Fourier Transform. There's a lot of math behind it, but essentially it allows us to isolate parts of the audio input, like Bass, Mids and Treble, as well as Loudness and other characteristics.

### Sketch.js Part 2: Everything inside `draw()`
The `draw()` loop contains quite the sizeable amount of code. Instead of breaking it apart as a whole, i'll break it down into functional parts. That way we get a better understanding of my thought process, and the modularity of each part of the code.

