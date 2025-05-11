---
title: "Week 7B | A2: Chaos!"
published_at: 2025-05-04
snippet: "I demonstrate net art of the 'Zany' aesthetic register, responding to an essay by Michael Serres"
disable_html_sanitization: true
allow_math: true
---

# **IMPORTANT: Read Disclaimers Before Scrolling**

Disclaimers:

- This code renders a Fractal using WebGL. It's performance-heavy, so it may be slow on mobile devices and will drain your battery 😋.
- This code requires access to your microphone to work. All processing is done client-side.
- **Might cause motion sickness in some people.**
- **This content may contain flashing images or sequences that could trigger seizures in people with photosensitive epilepsy or other seizure disorders. If you experience any symptoms such as dizziness, altered vision, eye or muscle twitching, or involuntary movements, discontinue viewing immediately and consult a medical professional.**

### Try these

1. House or club music (e.g., Daft Punk – ‘Get Lucky’)
2. Calmer music (e.g., The Marías – ‘Fog as a Bullet’)

These tracks showcase the separate frequency effects in different ways. I encourage you to experiment with your own music—I find that bass-heavy tracks are fun, but more delicate, high-fidelity music often works best.

> The louder you play the music, the more pronounced the visuals. This visualiser was tuned for conversation volume. Funky stuff happens if you go much higher (rubbing or blowing into the mic)—give it a go if you want!

<br> <br> <br>

### Once again, please **DO NOT** interact with this piece if you have symptoms of epilepsy.
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

# Response to chosen text:
### Information and Thinking <br> by Michael Serres
I experience my visualiser as a dialogue with Serres’s ideas. Every sound instantly becomes a visual element. “*What is thinking, if not at least carrying out these four operations: receiving, emitting, storing and processing information like all existing things?*” I think this definition of thinking was a great place to shoot off from, and in a way, my code looks more alive because of it.

While music plays, the fractal in the back moves around and stands out when the volume peaks with a jerky movement, so new parts appear exactly when something happens. The constant movement is like the fractal listening. Our minds and bodies are never still, and this persistent movement mimics that.

Maybe a reach, but the repeating and branching pattern of the fractal feels like the networks Serres describes, tiny cells or vast societies, “*Where does this information circulate? Basically, in networks.*”

Combined, the 2D foreground of my sketch and 3D background bring the music to life visually. This is encoding, the visualiser takes in information, and responds to it. It gives the music a new medium to be consumed. “*They encode, we encode; they count, we count; we speak, they speak.*”

# Why I Consider It as Post-Digital
Post-Digital means embracing networks, social, biological, technological, as one continuous system.

I can call my visualiser Post-Digital because it refuses to treat the digital as separate from the material world. My visualiser isn’t just code on a screen, it’s code that behaves like a living thing. The 2D visualiser and the 3D fractal coexist, bleed into each other, and demand you feel the data as texture and space, not just numbers.

My code's glitches and artifacts aren’t bugs, they’re part of the language of Post-Digital. When the fractal jerks and reconfigures itself at volume peaks, it’s not hiding the algorithm, it’s celebrating it. There is beauty in any imperfection, and my code demonstrates this well.

This visualiser isn’t a final, polished product. It’s a living sketch. always listening, always shifting, because Post-Digital art lives between stability and surprise. It gives music a new body, a new medium.

# The code

As mentioned earlier, this piece is a culmination of many previous attempts. As such, it's fairly easy to go through line-by-line and extract the meaning behind each modular part of the code. Note that the code i document will be *slightly* different from the code embedded in this document: The intended experience is in fullscreen, so the documented code is the fullscreen code. The only differences will be how the sizes of the frame and objects are calculated.

Although inherently most of the code was made without it, almost every working visual element relies on different parts of p5's audio engine to modulate or control them. Without access to an FFT (fast fourier transform) like p5 provides, there simply would be no option for audio visualization, and it would be a completely randomly generated frame, which wouldn't be very interactive or interesting to play with. 

## Filling Criteria:
A2's rubric asks for certain coding criteria to be met, and while i wont give an exhaustive list of common things like my variables, i'll give a few examples: 
- variables
    1. In `sketch.js`, right at the top of the file:
    ```js
    let glitchX, glitchY, glitchW, glitchH
    let glitchFrames = 0
    const glitch_duration = 200
    const glitch_chance = 0.001
    ```
    They are used right down the bottom
    ```js
    else if (random() < glitch_chance) {
      glitchW = random(width / 16, width / 3)
      glitchH = random(height / 16, height / 3)
      glitchX = random(0, width - glitchW)
      glitchY = random(0, height - glitchH)
      glitchFrames = int(random(100, 1000))
    }
    ```
- iteration
  1. in `sketch.js`, i iterate over an array containing each treble particle
  ```js
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.update()
    p.draw()
    if (p.isDead()) {
      particles.splice(i, 1)
    }
  }
  ```
  2. in `sketch.js`, i draw scanlines
   ```js
  for (let i = 0; i < 10; i++) {
    colorMode(HSB)
    fill(random(scanline_colours), random(0.3, 1))
    colorMode(RGB)
    let y = random(height)
    rect(0, y, width, random(1, 3))
  }
   ```
- functions
  1. in `sketch.js`, i call a function defined in `Mandelbulb.js`
  ```js
  updateCamera({ pos, yaw, pitch, roll }) {
    if (pos) {this.params.cameraPos = pos}
    if (yaw !== undefined) {this.params.yaw = yaw}
    if (pitch !== undefined) {this.params.pitch = pitch}
    if (roll !== undefined) {this.params.roll = roll}
  },
  ```
  ```js
  window.mandel.updateCamera({
  pos: [px, py, pz],
  yaw,
  pitch,
  roll
  })
  ```
- boolean logic
  1. In `sketch.js`, i use a ternary operator
  ```js
  let shakeAmount = bass > 150 ? map(bass, 150, 255, 0, 30) : 0
  ```
  2. In `sketch.js`, i use a boolean check to delete particles
   ```js
  if (p.isDead()) {
    particles.splice(i, 1)
  }
  ```
- arrays
  1. I store my particles in an array inside of `sketch.js`
  ```js
  let particles = []
  ```
  ```js
  for (let i = 0; i < (treble / 255) * 20; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  ```
- classes
  1. `particle.js` stores a class `Particle` used in `sketch.js`
  ```js
  class Particle {
    constructor(x, y) {
  ...
  }
  ```
- recursion
  1. `sketch.js` uses recursion in the function `sumSpectrum()`
  ```js
  function sumSpectrum(arr, i = 0) {
    if (i >= arr.length) return 0
    return arr[i] + sumSpectrum(arr, i+1)  // recursion!!!! :)
  }
  let sum = sumSpectrum(spectrum)
  ```

# Documentation and Process
I don't blame you if you skim over the next part. There are more lines writing about the code than there are actual lines of code. Call me thorough. :)

## sketch.js
Starting from the script that controls it all, `sketch.js` is where *most* random visual elements culminate. Most importantly, it's the script using the FFT and as such, controls each other part of the simulation. 

This code uses the `P5.min.js` library, and the `p5.sound.min.js` library to function. TLDR: it uses P5. 

This script joins `particle.js` in being the only scripts using P5's libraries.

Let's break it into parts, so it's easier to digest, and a bit less daunting to look at:

### sketch.js: Setup and Initial Declaration
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

### sketch.js: Draw loop
My code uses p5's libraries. This next section makes use of the `draw()` function, which acts as a constant update, running(or trying to run) at the framerate we declared in `setup()`, as `frameRate(60)`.

The `draw()` loop contains quite the sizeable amount of code. Instead of breaking it apart as a whole, i'll break it down into functional parts. That way we get a better understanding of my thought process, and the modularity of each part of the code.

### sketch.js FFT Setup

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

### sketch.js Mandelbulb Control
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

### sketch.js Bass Square

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

### sketch.js: Buffer Resizing
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
```js
// Copy current canvas into buffer for next frame
buffer.image(get(0, 0, width, height), 0, 0)
```

I use `push()` and `pop()` at the start and end of my code to isolate transforms, so only the buffered frame is affected
  
the value of `rotation` is based in the volume of the music's mid-tones(`mid`) and multiplied by `glitchAmount`(FFT) to dictate how much the screen will rotate. This was an impulsive decision i made later in the process, but it really adds to the impact of some of the heavier musical elements. It never rotates too much, given by `Math.PI / 8`. in other words, 1/8th of a full rotation, potentially more if gCoeff is set too high compared to the input volume.

`dynamicScale` gives the cool ghosting effect. It takes the buffered canvas and resizes it so that it either gets bigger or smaller, and scales the resizing based on the value of `mid`. In the current code, it gets bigger, but it looks really unique when it's set for getting smaller, which is why i kept it in the codebase. I don't prefer one over the other, so it was hard to choose one to stick with.

There's also a tiny amount of shake applied, based on the amount of bass present, dictated by `glitchAmount`. Originally it was a lot more pronounced, but on more bass-heavy songs, it became overwhelming. I think it's perfectly subtle in its current state.

Lastly, the buffered canvas is given a tint, an opacity and drawn again, resized.

After everything else is drawn on top, the canvas is loaded into the buffer with `buffer.image(get())`. Anything below this will be drawn after the buffer, meaning it will be delayed by a frame and won't sync with everything else.

Anything between these lines is captured inside of the frame buffer and drawn again, resized in the next frame.

### sketch.js: Glitch Scanlines
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

### sketch.js: Treble Circles
```js
// Treble circles
  // spawn persistent particles
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
Treble circles were a late addition to the sketch, i added them to fulfil 2 purposes at once: They gave some treble reaction to the sketch, and they allowed me to tick off the assignment rubric's `class` requirement. 

This part of the code probably has the lowest scope out of the entire codebase, but for what it is, the effect is quite strong and it definitely serves its purpose.

The first half of this block spawns particles based on the amount of treble energy with a for loop, which has a variable loop condition, which i've never really done before. It uses the canvas's `width` and `height` variables to randomly place particles across the screen.

The second half of the block iterates through each particle and calls the `update()` and `draw()` functions of the `particle` class. Finally, if the particle's `isDead` condition is met, the particle is removed.

### sketch.js: Glitchy Holes / Buffer drawing
```js
// Glitchy 'Holes'
if (glitchFrames > 0) {
  // carve out the hole
  buffer.erase()
  buffer.rect(glitchX, glitchY, glitchW, glitchH)
  buffer.noErase()

  // extract the patch as its own buffer
  let patch = buffer.get(glitchX, glitchY, glitchW, glitchH)
  // invert the buffer 
  // (or any effect. I just chose invert but there are 
  // a few to choose from that look interesting too)
  patch.filter(INVERT)
  // draw it back into the spot
  buffer.image(patch, glitchX, glitchY)

  glitchFrames--
  if (glitchFrames == 1) {
    resizeCanvas(windowWidth, windowHeight)
  }
}
// or start a new one
else if (random() < glitch_chance) {
  glitchW = random(width / 16, width / 3)
  glitchH = random(height / 16, height / 3)
  glitchX = random(0, width - glitchW)
  glitchY = random(0, height - glitchH)
  glitchFrames = int(random(100, 1000))
}
```
Drawn on top of the buffer are the most glitchy of the elements, and this idea started from out of the blue. In an early version of the code, there was some manual pixel shifting (was slow and i couldn't get it to look perfect, so it didn't make it far. In hindsight, should've tried to get it to work in webGL), but it had such a unique effect when the window was resized. It looked like wet paint on a canvas, spreading out. Sadly i didn't take good care of the code and a lot of the early work was thrown away without any regard for documentation (silly mistake), and i cant find it to share here. Bummer.

The goal was to capture and localize that spreading effect, so i captured a small window of the frame with `buffer.rect()` and applied a filter to it with p5's `.filter()`, and after some time i called `resizeCanvas()` which cleared the screen, but also gave a short flash which i felt fit in well with the glitchy aesthetic of this code. 

It gave just enough randomness and chaos that the piece wouldn't feel the same without it. It's that small amount of dissonance that brings it together, and keeps it from feeling too perfect and polished.

## Particle.js
In one long file, these scripts feel long and complicated, but really they aren't that much at all. Or at least that's the case for the other two scripts, this one's really short and only has a handful of lines of code.


### Particle.js: Constructor
```js
/* \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
------------------------------------------------------------------------
        Written by Travis Lizio | Creative Coding A2
------------------------------------------------------------------------
        particle Class: 
          Manages each treble particle.
------------------------------------------------------------------------
\\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ */

class Particle {
    constructor(x, y) {
      // Starting parameters:
      // Position
      this.x = x
      this.y = y
      // Random velocity X and Y
      this.vx = random(-2, 2)
      this.vy = random(-2, 2)
      // Random size
      this.size = random(15, 27)
      // Random lifespan
      this.life = int(random(30, 100))
      // Random colour (HSV)
      this.color = [
        random(360),
        random(60),
        random(50, 100),
        random(0.5, 1)
      ]
    }
```
The code declares the class `Particle` and assigns it arguments with `constructor()`, to be set when the class is called. 

Inside of `constructor`, the particle's individual variables are set with `this.` Its position is given by the two arguments `x` and `y` when calling the class. The rest of the variables Velocity (`vx` and `vy`), `size` and `life` are set randomly with their own range. `color` is set as an array of 4 values, representing each value of the `HSBA` colour space

### Particle.js: update()

```js
update() {
  // Move the particle
  this.x += this.vx
  this.y += this.vy

  // Update lifespan
  this.life--
}
```
Its a lot to take in I know. 

Jokes aside, without this code, the particle would just sit there immobile, forever.

For the sake of being thorough: The first half of the function controls the position (`this.x`, `this.y`) based on the velocity (`this.vx`, `this.vy`) defined in the constructor

Then the lifespan is decremented, with `this.life--`. for clarity, the syntax `var--` called decrementing just subtracts 1 from the value.

### Particle.js: draw()
```js
draw() {
    noStroke()
    colorMode(HSB)
    // Draw the coloured circle
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
    colorMode(RGB)
    ellipse(this.x, this.y, this.size)
  }
  
  // Kill the particle if its life has no time remaining
  isDead() {
    return this.life <= 0
  }
}
```
the reason `draw()` and `update()` are separate doesn't actually do much in the context of how they are used, since they are both called together in the main loop in `sketch.js`. But, it does look nice and separating function from visuals is nicer to work with.

Admittedly, there is almost certainly a better way to write almost every line of code in this example, but what matters is 
1. It works, and 
2. It's readable

`noStroke()` and `colorMode(HSB)` just initialise how i want to draw the shape. Probably redundant but like before, it's consistent and readable.

`fill()` applies the colour values given by the array `this.color`

The ellipses are then drawn with their positions and size. Originally these stretched around like bubbles, which is why they are ellipses, not circles. Never really needed to change them over to circles. Why fix what ain't broke?

Lastly, the isDead() function just checks if the particle's life is over, by returning `true` when `this.life` is less than or equal to 0 (`<= 0`).

## Mandelbulb.js
The real meat and potatoes. You might be surprised to learn that i created this originally as a standalone experiment to play around with and learn about WebGL. There are so many resources out there explaining how to use it, like [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), and i really learned a lot from [brown37](https://learnwebgl.brown37.net)'s guide (section 5 and onward is where they start talking about actually rendering graphics).

These guides alone were monumental, they contained so many useful code excerpts that were so easy to understand and so neatly documented, that i could pretty much instantly implement it into my code. 

It does also help that in my Math elective, i just finished learning about matrices and vectors, which definitely helps in understanding a lot of the math i used.

I remember having difficulty towards the start with having shaders in different files, i cant remember why, but clearly it stuck so now we have inline shaders. Not pretty inside of javascript and if i had to do it again, i would definitely invest time into learning what went wrong. Syntax highlighting would go a long way here. Luckily, i can document it all here with GLSL highlighting in markdown code blocks!

### Mandelbulb.js: Initiation and Helper Functions
```js
/* \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
------------------------------------------------------------------------
        Written by Travis Lizio | Creative Coding A2
------------------------------------------------------------------------
        Mandelbulb.js: 
          Draws background fractal.
------------------------------------------------------------------------
\\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ */

// Vector / Matrix Helpers
// Calculate cross product of two 3D vectors
function cross(a,b){ return [
  a[1]*b[2] - a[2]*b[1],
  a[2]*b[0] - a[0]*b[2],
  a[0]*b[1] - a[1]*b[0]
] }

// Normalize 3D Vector to unit length
function normalize(v){
  let l = Math.hypot(v[0],v[1],v[2])
  return [ v[0]/l, v[1]/l, v[2]/l ]
}
```
There was a lot of reading involved in creating this code, computer graphics, as it turns out, are not so simple!

These helper functions are fairly easy to describe though, and although [brown37](https://learnwebgl.brown37.net/model_data/model_volume.html?highlight=cross%20product) explains it well, this is my documentation.

`cross()` returns a vector perpendicular to both a and b, used to determine in 3D spacial orientation, like `right`, `up` and `forward` directions later on.

`normalize()` scales a vector to length 1, keeping its direction, which is quite useful for consistent direction-based calculations like lighting and ray directions.

> it is right here in the code that we would write the GLSL shaders, but i'm choosing to present the javascript first, because the GLSL shaders are mostly just math and math isn't very engaging

### Mandelbulb.js: Canvas and Shader Setup
```js
// Boilerplate: setup WebGL, compile shaders, create full-screen quad
const canvas = document.getElementById('glcanvas')
const gl = canvas.getContext('webgl2', {
  powerPreference: 'high-performance'
})

// Shader compilation
function createShader(gl, type, src){
  let s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}
function createProgram(gl, vs, fs){
  let v = createShader(gl, gl.VERTEX_SHADER, vs),
      f = createShader(gl, gl.FRAGMENT_SHADER, fs),
      p = gl.createProgram()
  gl.attachShader(p, v)
  gl.attachShader(p, f)
  gl.linkProgram(p)
  if(!gl.getProgramParameter(p, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(p))
    gl.deleteProgram(p)
    return null
  }
  return p
}

// Program and uniforms
const program = createProgram(gl, vsSource, fsSource);
const posLoc = gl.getAttribLocation(program, 'a_position');
const resLoc = gl.getUniformLocation(program, 'u_resolution');
const camPosLoc = gl.getUniformLocation(program, 'u_cameraPos');
const camMatLoc = gl.getUniformLocation(program, 'u_cameraMat');
```
We start by grabbing the HTML Canvas named `glcanvas` from the DOM and assigning it to a variable called `canvas` 

We then assign the WebGL Context to `gl`, and tell the browser that we want high performance. This was something i found and used while debugging slow performance, and while it isn't really necessary i think it does actually speed up the code, so that's nice

We then write a function `createShader()` to compile the WebGL shader. This is fairly straightforward, it's really mostly 3 lines:

1. `s = createShader()` Assigns the shader to `s`
2. `shaderSource()` Feeds the `shader` and the `source` to the context
3. `compileShader()` compiles the shader

The rest of the function is just error handling, leftover from when i was figuring out why the mandelbulb wasn't working.


`createProgram()` creates and links a WebGL program from a vertex shader source `vs` and a fragment shader source `fs`.

First, we compile the vertex and fragment shaders by calling `createShader()` for them, then create a new WebGL program with `createProgram()` and attach both shaders to it using `attachShader()`.

Finally we go through each `uniform` from our frag shader, and assign it to a variable to edit with javascript.

### Mandelbulb.js: Controls
```js
// Mandelbulb controls
window.mandel = {
  gl,
  program,
  uniforms: {
    resolution: resLoc,
    cameraPos:  camPosLoc,
    cameraMat:  camMatLoc
  },
  params: {
      // Camera position
    cameraPos: [0, 0, 0],
    // Camera rotation
    yaw: Math.PI,  
    pitch: 0,
    roll: 0
  },

  // Update camera params
  updateCamera({ pos, yaw, pitch, roll }) {
    if (pos) {this.params.cameraPos = pos}
    if (yaw !== undefined) {this.params.yaw = yaw}
    if (pitch !== undefined) {this.params.pitch = pitch}
    if (roll !== undefined) {this.params.roll = roll}
  },

  // Set uniforms
  setCamera(pos, mat) {
    this.gl.useProgram(this.program);
    this.gl.uniform3fv(this.uniforms.cameraPos, pos);
    this.gl.uniformMatrix3fv(this.uniforms.cameraMat, false, mat);
  }
};

// Initial settings (Sometimes broke without this here.)
window.mandel.params = {
  cameraPos: [0, 0.1, 0.01],
  yaw: Math.PI,
  pitch: 0,
  roll: 0
}
```
Since we need to control the script from the global scope, we effectively give these functions and objects to the global scope, with `window.`. It's basically the same as just writing them as global.

Inside the object `window.mandel`, we assign some subsets and a couple functions:

we assign `gl`, `program`, `uniforms` and `params` as subsets inside the parent object, so they can be referenced and changed with `window.mandel.foo.x` (foo being the subset, x being a value)

`uniforms` holds values directly relating to the GLSL scripts, and `params` holds values used within the javascript portion, mainly camera control

we declare `updateCamera()` and `setCamera()` as functions to be called every update inside the controlling script, along with the changed values. Basically this is the groundwork for letting an outside script control this script

At the end, we have a little remnant from the debugging stage, that sets the parameters with a slight `cameraPos` offset in 2 axis, since being stuck with any 1 or 2 values at exactly 0 caused some intense lag and the WebGL calculations to freak out. When i removed this, the code would occasionally break again on reload, so it stays. Doesn't hurt to have it here.

### Mandelbulb.js: Rendering
```js
// Render onto a fullscreen quad
const quad = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, quad)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1, 1,-1, -1, 1, 
    -1, 1, 1,-1,  1, 1
]), gl.STATIC_DRAW)

// Resize handling
function resize(){
  canvas.width = window.innerWidth
  canvas.height= window.innerHeight
  gl.viewport(0,0,canvas.width,canvas.height)
}
window.addEventListener('resize', resize)
resize()
```
We create a fullscreen quad (like a triangle, but with 4 sides. This will make sense if you are familiar with polygons, this is a polygon) as a GPU Buffer to render our graphics onto

`gl.bindBuffer()` basically tells WebGL “from now on, any `ARRAY_BUFFER` operations should use this `quad` buffer.”  `ARRAY_BUFFER` is the slot for raw vertex data.

`gl.bufferData()` Uploads the actual vertex data into the currently bound ARRAY_BUFFER. The array holds six points, i.e. two triangles (3 vertices each), for the quad.
> -1 to +1 are values in clip-space, which is the stage between 3D math and 2D drawing. We’re basically drawing two triangles that cover the corners of a 1x1 square in this space, which the GPU then stretches to fill the whole screen.

The rest of this code block is just rudimentary resizing logic, pretty much exactly the same as i have in my `sketch.js`

### Mandelbulb.js: Animation Loop
```js
// Animation loop
function frame() {
  const {cameraPos, yaw, pitch, roll} = window.mandel.params

  // Camerra orientation
  const front = normalize([ // Forward direction
    Math.cos(pitch)*Math.sin(yaw),
    Math.sin(pitch),
    Math.cos(pitch)*Math.cos(yaw)
  ]);
  const right = normalize(cross(front, [0,1,0])); // Right direction
  const up = cross(right, front); // Up direction

  // Apply roll
  const c = Math.cos(roll), s = Math.sin(roll);
  const rRolled = [
    right[0]*c + up[0]*s,
    right[1]*c + up[1]*s,
    right[2]*c + up[2]*s
  ];
  const uRolled = [
    -right[0]*s + up[0]*c,
    -right[1]*s + up[1]*c,
    -right[2]*s + up[2]*c
  ];

  // Camera matrix
  const camMat = new Float32Array([
    rRolled[0], uRolled[0], front[0],
    rRolled[1], uRolled[1], front[1],
    rRolled[2], uRolled[2], front[2]
  ]);
  
  // Draw
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(resLoc, canvas.width, canvas.height);
  window.mandel.setCamera(cameraPos, camMat)
  
  gl.drawArrays(gl.TRIANGLES, 0, 6); // Draw the quad
  requestAnimationFrame(frame);
}
```
The main drawing loop of `Mandelbulb.js`.

We put everything that needs to be executed repeatedly inside this script here. we call the function `frame()` and call it right at the end with `requestAnimationFrame()`, so it loops and draws over itself, each frame.

Before we render anything, we set our camera parameters to whatever the external script sets them to.

Then, we calculate the camera's vectors `up` `right` `front` using some trig operations and vector math. We make good use of our `normalize()` and `cross()` functions from the top of the script.

The next few lines augment the `right` and `up` vectors to apply a roll to the camera.

`camMat` is our 3x3 camera rotation matrix, which controls the direction of the GLSL ray marching.

Finally, we run a bunch of stuff on the WebGL context.:
- `clear()` resets the graphics buffer
- `useProgram` tells WebGL to use my compiled shader for everything following this line
- `bindBuffer()` tells WebGL to use the fullscreen quad's attributes when asked
- `enableVertexAttribArray()` enables the vertex attribute at `posLoc`
- `vertexAttribPointer()` defines how to read the buffer
  - 2 floats per vertex
  - no normalisation
  - tightly packed
  - starting at offset 0
- `uniform2f()` uploads the canvas dimensions to the shader
- `drawArrays()` draws 2 triangles (6 vertices) from the buffer, for the fullscreen quad

and of course, mixed in is `window.mandel.setCamera()`, which just updates the camera position inside of webGL

```js
requestAnimationFrame(frame);
```
At the end of the script, we run `requestAnimationFrame()` one time, to kick the animation off. This part calls the main loop
## Mandelbulb.js: GLSL Sources
### vsSource
```js
// GLSL Sources
// Map 2d Quad positions to screen space
const vsSource =
``` 
```glsl
#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}
```

I use `#version 300 es` to give myself access to webGL 2.0. Fun fact! p5.js doesn't like using this, which is the reason why i have to either cope with slow speeds (and i mean slow), or write the 2d and 3d scripts separate from each other.

`in vec4 a_position` declares a 4 axis input vector, for vertex positions.

The main loop `void main()` Sets the built-in output `gl_Position`, placing each vertex directly where specified, basically drawing a fullscreen quad without applying any camera or projection transformations.

## Frag Shader
This part requires its own section. We get back to javascript momentarily, but let us first examine how this almost magical shader works. It's surprisingly simple for the visuals it produces. The way the fractal renders is technically inaccurate, since it skips the interior parts of the fractal, but i liked the way it looked when i was flying around. If i rendered the inside, it would probably look something like big hero 6's portal scene (fun fact: they use a mandelbulb for their space bubble scene)

![Big hero 6 fractal](/A2-Chaos/Attachments/BH6-Fractal.gif)

### Frag Shader: Initialization and Constants
```js
// Frag shader, Render mandelbulb with ray marching
const fsSource =
```
```glsl
#version 300 es
precision highp float;
uniform vec2 u_resolution; // Canvas resolution
uniform vec3 u_cameraPos; // Camera position 3D
uniform mat3 u_cameraMat; // Camera rotation matrix
out vec4 outColor; // Final pixel colour

// Ray marching constants
#define MAX_STEPS 10 // Max steps to march
#define MAX_DIST   200.0 // Max distance before giving up
#define SURF_DIST  0.001 // Distance to render points as a surface
```
We declare the Fragment Shader as fsSource, then write to it:

`#version 300 es` uses WebGL 2.0

The rest of the first half of this excerpt set up the inputs for resolution, camera position, and orientation.

Then, constants are defined to control ray marching depth, maximum range, and surface threshold.

### Frag Shader: Distance Estimator
```glsl
// Distance estimator
float mandelbulbDE(vec3 pos){
  vec3 z = pos; // Position
  float dr = 1.0; // Derivative for distance scaling
  float r = 0.0; // Radius

  const int Iter = 8; // Mandelbulb order
  for(int i=0; i<Iter; i++){
    r = length(z);
    if(r>2.0) break; // Escape outside bounds
    float theta = acos(z.z/r); // Spherical coordinate theta
    float phi   = atan(z.y, z.x); // Spherical coordinate phi
    float powr  = pow(r, float(Iter)); // Scaling 'power'
    dr = powr*float(Iter)*dr + 1.0; // Distance derivative
    float zr = pow(r, float(Iter)); // Scaled radius
    
    // scale angles
    theta *= float(Iter);
    phi   *= float(Iter);

      // Convert back to Cartesian (x,y axis)
    z = zr * vec3(
      sin(theta)*cos(phi),
      sin(phi)*sin(theta),
      cos(theta)
    ) + pos;
  }
  if(r <= 2.0) return 0.1; // Small value if inside
  return r/dr; // Distance estimate
}

// Scene distance function
float sceneDE(vec3 p){
  return mandelbulbDE(p); // Only mandelbulb in scene
}
```
The `mandelbulbDE` function is our mandelbulb's distance estimator. It gives us the shape of the fractal. Without it, we would have something probably closer to a sphere.

It takes a 3D point in space and iteratively transforms it using a power-based spherical coordinate system.

The function converts the point from Cartesian coordinates (`x` and `y`) into spherical coordinates (`theta` and `phi`), scales the distance with a fractal power, and then converts it back to Cartesian coordinates.

Each iteration adds more detail to the fractal. If the point escapes a radius of 2, the loop stops early. The function returns either a small constant `0.1` if the point is still inside the fractal or an estimated distance to the nearest surface, calculated using the accumulated derivative `dr`.

### Frag Shader: Normal Estimation
```glsl
// Estimate normal by gradient
vec3 getNormal(vec3 p){
  float h = 0.0001; // Small step for gradient
  vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * sceneDE(p + k.xyy*h) +
    k.yyx * sceneDE(p + k.yyx*h) +
    k.yxy * sceneDE(p + k.yxy*h) +
    k.xxx * sceneDE(p + k.xxx*h)
  );
}
```
The `getNormal` function estimates the normal vector at a point `p` by sampling nearby distances in multiple directions. 

It uses a small offset value to slightly vary the point in the `x`, `y`, and `z` directions and evaluates how the scene’s distance function changes. By combining these offsets with a central difference pattern, it produces a gradient vector that approximates the surface normal.

This vector is then normalized to ensure its length is exactly 1 (unit length). The resulting normal is used in lighting calculations, allowing the fragment shader to simulate how light interacts with the surface, i use it for shading later on.

### Frag Shader: HSV Conversion to RGB
```glsl
// HSV Colour conversion
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
```
glsl doesn't have any native functions for `colorMode` like p5 has, so we need to perform the calculations ourselves.

It looks complicated, you can thank vector syntax for that. Really it just performs vector operations to remap that a HSV colour into RGB space. 

I referred to [stack exchange](https://cs.stackexchange.com/questions/64549/convert-hsv-to-rgb-colors) for the calculations, mostly because it was the first result that came up. The answer was actually super detailed and interesting to read through, if you want to learn about it, i encourage you to read further, but you would be forgiven if you chose not to take on more reading.

Basically we break the hue into segments and blend between primary colours based on how far into the segment the hue lies, calculated as `p`. The result is scaled by the `value` part of `HSV` to determine brightness. the colour is adjusted by the saturation for intensity.

I'm using HSV here because i want to change the colour based on the distance from the camera. The effect is worth the effort in my opinion.

### Frag Shader: Ray marching and Collision
```glsl
// Ray-march and shade (rendering the bulb)
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution) / u_resolution.y; // Normalized coords
  vec3 rd = normalize(u_cameraMat * vec3(uv, 1.0)); // Ray direction
  vec3 ro = u_cameraPos; // Ray Origin
  float dist = 0.0;
  for(int i=0; i<MAX_STEPS; i++){ // March along ray
    vec3 p = ro + rd*dist;
    float d = sceneDE(p);
    if(d < SURF_DIST || dist > MAX_DIST) break; // Hit or too far
    dist += d;
  }
  vec3 col = vec3(0.0); // default black colour

  // Surface hit
  if(dist < MAX_DIST){
    vec3 p = ro + rd*dist;
    vec3 n = getNormal(p); // Surface Normal
    float diff = clamp(dot(n, vec3(0,1,0)), 0.0, 1.0); // Diffuse light
    float hue = mod(dist * 0.2, 1.0); // Colour by distance (looks like a cool rainbow)
    float saturation = 1.0;
    float value = clamp(diff * 5.0, 0.2, 0.9); // Brightness

    col = hsv2rgb(vec3(hue, saturation, value));
  }
  outColor = vec4(col,1.0); // Colour to draw
}
```
The `main()` function begins by converting the fragment’s position on screen into a normalized coordinate system. 

we construct a 3D ray direction using the camera matrix (u_cameraMat) and the screen-space vector (`uv`), and starts marching that ray from `u_cameraPos` into the scene. At each step, it checks how far it can move forward by calling `sceneDE()`. If it gets closer than the surface threshold or exceeds the maximum range, it stops marching.

If the ray hits a surface, the shader calculates the normal `n` at the hit point, determines lighting using the dot product between the normal and an upward light direction (`diff`), and maps the distance to `hue` to create a gradient that in my opinion, really sells the visuals. 
 
Finally, the colour is converted from HSV to RGB and written to the screen as the final pixel output. If the ray never hit anything, the pixel remains black.

---

Yeah, this took a while to write.. I had a lot of fun documenting this code though, it appears once my fingers start typing they dont really stop.

If you read this far through, i want to thank you for your thorough interest in my work, and i wish you a good day.