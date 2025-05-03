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
Thanks to my beautiful and detailed comments, im sure you can piece together what's going on. But incase you are normal and don't want to read through code, i'll explain everything in plain text (mostly) right here!

At the top of the block, we initialise some variables like `buffer`, `particles` and `squareSize`, for our visual elements. We also initialise `mic`, `fft`, `audioLevel` and `glitchAmount` for use in augmenting our visual elements, based on volume and frequencies

In our `setup()`, we call some functions, mainly initialization. Most importantly, we create the buffer to be used as a 'screenshot' of the canvas, and we initialise the FFT and mic input.
> FFT stands for Fast Fourier Transform. There's a lot of math behind it, but essentially it allows us to isolate parts of the audio input, like Bass, Mids and Treble, as well as Loudness and other characteristics.

### Sketch.js Part 2: Everything inside `draw()`
My code uses p5's libraries. This next section makes use of the `draw()` function, which acts as a constant update, running(or trying to run) at the framerate we declared in `setup()`, as `frameRate(60)`.

The `draw()` loop contains quite the sizeable amount of code. Instead of breaking it apart as a whole, i'll break it down into functional parts. That way we get a better understanding of my thought process, and the modularity of each part of the code.

### Sketch.js FFT Setup

```js
// audio analysis
let spectrum = fft.analyze()

// ***Recursive*** function to average the spectrum
function sumSpectrum(arr, i = 0) {
  if (i >= arr.length) return 0
  return arr[i] + sumSpectrum(arr, i+1)  // recursion!!!! :)
}
let sum = sumSpectrum(spectrum)

// Calculate average audio level
audioLevel = sum / spectrum.length
// Scale intensity based on glitch amount.
gCoeff = 1 // Change this coefficient based on desired intensity / volume
glitchAmount = constrain(audioLevel/128, 0, gCoeff) * gCoeff

// FFT Setup
let bass = fft.getEnergy(20, 150)
let treble = fft.getEnergy("treble")
let mid = fft.getEnergy("mid")
// only apply shake when bass energy exceeds threshold
let shakeAmount = bass > 150 ? map(bass, 150, 255, 0, 30) : 0
```
This block of code handles most of the setup for our frequency response, which controls the rest of the code. If the rest of the code is the brains, this part is the ear.

To use anything in p5's FFT, we need to use `fft.analyze()` first. The first line of code assigns this to the `spectrum` variable, every update.

The next few lines of code focus on averaging out the spectrum, so that the code is a little bit smoother. I make use of recursion in the function `sumSpectrum`, which admittedly i could have used something simpler, but i want to meet rubric criteria, and this part fits. Behold, **Recursion**!

`glitchAmount` basically dictates the intensity of the code's reaction to sounds. If you want more reaction, increase the coefficient `gCoeff`, and vice versa for lower reaction.

We then declare `bass`, `treble` and `mid` using p5's `fft.getEnergy` function, and assigning them a frequency accordingly. p5 allows us to use predefined strings for frequency ranges (how thoughtful), but for bass i felt that the predefined frequency range was too broad, so i defined a custom one to fit my needs.

`shakeAmount` dictates the screen shake introduced by bass, and makes use of a ternary operator to make sure the screen is only shaking in extreme circumstances. This makes sure that the times the screen does shake feel deserved, and in turn more impactful.

### Sketch.js Mandelbulb Control
```js
// Mandelbulb Calculations
const audioNorm = constrain(audioLevel/255, 0, 1)

const minDrive = 0.3
const maxDrive = 1.0
// Scale camera movement by audio intensity
const drive = lerp(minDrive, maxDrive, audioNorm)

  // Sphere Radius (inside of mandelbulb, approximated)
const baseR = 0.7

const timeScale = 0.0005
const t = frameCount * timeScale

// sample three offset noise streams
let px = (noise(t + 0)   * 2 - 1) * baseR
let py = (noise(t + 100) * 2 - 1) * baseR
// Only move in Z axis (depth) based on sound, so there isn't a sickening amount of movement
let pz = (noise(t + 200) * 2 - 1) * baseR * drive

// clamp into the sphere of radius maxR
const r = Math.hypot(px, py, pz)
if (r > baseR) {
  const s = baseR / r
  px *= s
  py *= s
  pz *= s
}

// Set camera orientation
let yaw = 0
let pitch = (noise(t+400)*2 - 1) * PI / 4
let roll = (noise(t+300)*2 - 1) * PI

window.mandel.updateCamera({
  pos: [px, py, pz],
  yaw,
  pitch,
  roll
})
```
This piece of code controls the mandelbulb's camera based on the frequencies we defined before, plus a few new variables and some nice math.

we define some constants at the start, which give us the parameters and extremes of our camera movement:

- `drive` interpolates between `minDrive` and `maxDrive` by the value of `audioNorm`. We use drive in the code as a representation of how intense we want the camera movement. 

- `baseR` is assigned an approximation of the inner radius of the mandelbulb. It's here to make sure that the camera never moves outside of the mandelbulb.

- `t` is the speed that each position calculation moves through it's row of Perlin noise. 

Now we define the actual movement of the camera based on these properties:

`px`, `py`, `pz` modulate the position of the camera. `pz` alone moves dependently on the `drive`, while the rest just modulate smoothly, to avoid unnecessary camera movement.

the next part of the code takes the position from the center of the circle and the current camera position, and compares that with the radius of the sphere. If the camera position is outside the radius, it is returned to the inside of the radius smoothly. Essentially, this acts as a wall that pushes the camera back.

We calculate `pitch` and `roll` based on perlin noise, but `yaw` stays constant. I made this decision to reduce the amount of camera movement - with all three, it felt excessive.

Finally, we call the function inside of Mandelbulb.js, given by window.mandel.updateCamera(), which we feed a vector of coordinates for the camera's position, and the `yaw` `pitch` and `roll` as individual floats.

These values will be translated into the mandelbulb's WebGL variables, but that's done inside the mandelbulb's code, which we look at later.

### Sketch.js Bass Square

```js
// Draw square in the centre that pulses with bass
squareSize = height > width ? width / 5 : height / 5
noFill()
rectMode(CENTER)
colorMode(HSB)
// Square colour
stroke(16, 1, 100)
strokeWeight(50)
colorMode(RGB)
// Scale based on bass intensity
square(width / 2, height / 2, 50 + squareSize * (bass / 255) * 2)
rectMode(CORNER)
noStroke()
```
In all it's simplicity, this might be my favorite standout elements of the sketch. I think its just how mesmerizing it is to look at. 

this square was a bi-product of an early version of this sketch, which i still have remnants of later in the code. It was made to represent the center of the screen, and originally as a circle, it added some uniform colour to the buffer's trails.

The size of the square is calculated as `squareSize` to ensure that regardless of if the screen is too narrow, or too short, the square will always render in the middle, and at the right size. This came in really handy when i was moving the code over to the blog post, no need for any adjustment since it just worked out the box.

Since this code came from an external script, i imported all of its settings (`strokeWeight`, `rectMode(CENTER)`, `colorMode(HSB)`, `noFill()`) directly above the line where the shape is drawn, then i revert them after the shape is made. It might be a redundant way to do things, but at least its consistent and i know nothing will change these parts about the square. Redundant, but direct.

In the current build, the shape is a square, and it's size modulates by the music's bass. Do note that this was tuned with my subwoofer, so reading from a laptop's speakers might produce different results.

### Sketch.js: Buffer Resizing
```javascript
push()
// Rotate the canvas based on mids
let rotation = map(mid, 0, 255, -PI / 8, PI / 8) * glitchAmount

// --- Comment one of these out to change the way the buffer zooms:
  // let dynamicScale = map(mid, 0, 255, 0.9, 1.1) // Zooming Buffer
      let dynamicScale = map(mid, 0, 255, 1.0, 1.2) // Expanding Buffer

translate(width / 2, height / 2)
rotate(rotation)
// Scale faster based on glitch amount.
scale(dynamicScale + glitchAmount * 0.05)
translate(-width / 2, -height / 2)

// Small screen shake for bass response
translate(
  random(-4, 4) * shakeAmount * glitchAmount + (0.5 - noise(frameCount / 10)),
  random(-4, 4) * shakeAmount * glitchAmount + (0.5 - noise(frameCount / 10))
)

// tint the previous frame.
// Finnicky parameters, changes a *lot* about how the visualiser looks.
tint(251, map(audioLevel, 0, 120, 150, 250))
image(buffer, 0, 0)
noTint()
pop()
```

I use `push()` and `pop()` at the start and end of my code to isolate transforms, so only the buffered frame is affected
  
the value of `rotation` is based in the volume of the music's mid-tones(`mid`) and multiplied by `glitchAmount`(FFT) to dictate how much the screen will rotate. This was an impulsive decision i made later in the process, but it really adds to the impact of some of the heavier musical elements. It never rotates too much, given by `Math.PI / 8`. in other words, 1/8th of a full rotation, potentially more if gCoeff is set too high compared to the input volume.

`dynamicScale` gives the cool ghosting effect. It takes the buffered canvas and resizes it so that it either gets bigger or smaller, and scales the resizing based on the value of `mid`. In the current code, it gets bigger, but it looks really unique when it's set for getting smaller, which is why i kept it in the codebase. I don't prefer one over the other, so it was hard to choose one to stick with.

There's also a tiny amount of shake applied, based on the amount of bass present, dictated by `glitchAmount`. Originally it was a lot more pronounced, but on more bass-heavy songs, it became overwhelming. I think it's perfectly subtle in its current state.

Lastly, the buffered canvas is given a tint, an opacity and drawn again, resized.

### Sketch.js: Glitch Scanlines
```js
// glitch scanlines
let scanline_sat = 20
let scanline_bright = 100
// Red, blue, green and white scanlines for a cool kinda effect. 
// Was too rainbow-ey before, didn't look 'digital' or glitchy enough
let scanline_colours = [
  [0, scanline_sat, scanline_bright], 
  [120, scanline_sat, scanline_bright], 
  [270, scanline_sat, scanline_bright],
  [0, 0, scanline_bright]
]

if (random() < glitchAmount * 0.4) {
  noStroke()
  for (let i = 0; i < 10; i++) {
    colorMode(HSB)
    fill(random(scanline_colours), random(0.3, 1))
    colorMode(RGB)
    let y = random(height)
    rect(0, y, width, random(1, 3))
  }
}
```

If i remember correctly, this was the first individual piece i created, and for a while i had thrown it to the side because it felt too literal for the project, but with the inclusion of the glitch frames i added it back and it created an incredibly interesting effect. In the final build, the effect is just subtle enough to add some visual interest, and looks stunning as it fades out into the buffer

The colour of the scanlines are given by different extremes of the HSB colour wheel, all with a set saturation and brightness. There is also the inclusion of a pure white, which felt necessary after the scanlines looked too colourful.

the scanlines are given a random chance each frame to trigger, the chance rises with the audio level, given by `glitchAmount`.

10 scanlines are drawn at a time, at a random height. They all inherit a random colour and transparency, and then are drawn across the screen horizontally. 

### Sketch.js: Treble Circles
```js
// Treble circles
  // spawn persistent particles on click
  for (let i = 0; i < (treble / 255) * 20; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

// update and draw particles
for (let i = particles.length - 1; i >= 0; i--) {
  const p = particles[i]
  p.update()
  p.draw()
  if (p.isDead()) {
    particles.splice(i, 1)
  }
}
```