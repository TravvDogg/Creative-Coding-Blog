---
title: "Week 2c: Practice Documenting and Refactoring Code"
published_at: 2025-03-14
snippet: I show my understanding of some code by commenting it, and refactor it to work with classes
disable_html_sanitization: true
allow_math: true
---
<iframe id="falling_falling" src="https://editor.p5js.org/TravvDogg/full/iAICry0lj"></iframe>

<script type="module">

    const iframe  = document.getElementById (`falling_falling`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

**My task**: to comment and understand everything going on inside this black box. Step one: open black box and look inside. Confused? Good! lets talk about it.

# My journey commenting 'Falling Falling'
```js
const faller = {}

const fallers = []
```
What is the difference between these braces?

This:  
`const faller = {}`   
is an [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
You can store multiple values in it, separated by comments.

where this:
`const fallers = []`
is an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

The difference is, an object is like a container for values, paired with keys to identify them.
where an array is like an ordered list.  

Arrays are used when you need to manage an ordered list of items, usually to be sequentially processed, where objects are used when you need to represent data with unique properties.


```js
Array().fill()

Array().map()
```
What does fill and map do?

In the context of the code, they are joined together, like `Array(7).fill().map(rand_curve)`
In class, we learned that `Array(n).fill()` creates an array of length `n` and fills it with `undefined` values, so in a vacuum, `Array(7).fill()` produces:

`[undefined, undefined, undefined, undefined, undefined, undefined, undefined]`

and `Array(7).fill().map(rand_curve)` just fills the array of undefined values to `rand_curve()`. Essentially turning it into
`[ rand_curve(), rand_curve(), rand_curve(), rand_curve(), rand_curve(), rand_curve(), rand_curve() ]  

So, effectively, that's the same as just running that function 7 times and filling an array with the results

Since i have some experience with hobby code, i am familiar with most of the rest of the lines of code in this script, and the lines i don't quite understand are mostly formatting and i find that they are intuitive based on context alone, I mainly struggle with objects and their differences from arrays, because i haven't dealt with objects, or arrays extensively much before.

```js
// Initialise Faller object
const faller  = {}

// Initialise Fallers Array
const fallers = []
let bg
function setup () {
  // Automatically resize canvas to fit the width and height of it's environment / enclosure
  createCanvas (innerWidth, innerHeight)
  // Do not draw a stroke around any objects
  noStroke ()
  // Use HSB Color mode, H: 0-360, S: 0-100, B: 0-100, (alpha: 0-1)
  colorMode (HSB)
  // call rand_col() twice to pick two random colours
  faller.colours = [ rand_col (), rand_col () ]
  // Define start points for the faller
  faller.start_points = [
    // Half way up the left wall
    { x: 0, y: height / 2 },
    // Top left corner
    { x: 0, y: 0 },
    // 1/4 width of the ceiling
    { x: width / 4, y: 0 },
    // 2/4 or 1/2 width the ceiling
    { x: width / 2, y: 0 },
    // 3/4 width of the ceiling
    { x: width * 3 / 4, y: 0 },
    // Top right corner
    { x: width, y: 0 },
    // Half way down the right wall
    { x: width, y: height / 2 },
  ]
  // Assign empty array for faller.end_points
  faller.end_points = []
  
  for (let i = 1; i < 8; i++) {
    // Set end points across the floor of the canvas
    faller.end_points.push ({
      x: i * width / 8,
      y: height
    })    
  }

  // Create an array with 7 slots each filled with the result of a random curve function
  faller.curves = new Array (7).fill ().map (rand_curve)
  // 0-1 phase of for the faller's animation, measuring it's completion
  faller.phase  = 0
  // Add another faller to the fallers object
  fallers.push (Object.assign ({}, faller))
  // Set the background colour to a random colour
  bg = rand_col ()
}

function draw() {
  // Draw the background (full width and height of the canvas) as a color (bg)
  background (bg)
  if (frameCount % 40 == 0) {
    // Make a new faller every 40 frames
    const new_faller = Object.assign ({}, faller)
    // Set the start colour for the faller to the same colour as the background
    // And the ending colour to a random colour
    new_faller.colours = [ bg, rand_col () ]
    // Create an array with 7 slots each filled with the result of a random curve function
    new_faller.curves = new Array (7).fill ().map (rand_curve)    
    // Put the new faller at the bottom of the fallers array
    fallers.unshift (new_faller)
    // Get a random colour for the background again
    bg = rand_col ()
  }
  // Array for redundant or old fallers
  const redundant = []
  // Iterate thriugh every faller
  fallers.forEach ((f, i) => {
    // Make sure color mode is set to RGB (red, green, blue, (alpha): 0-255
    colorMode (RGB)
    // Interpolate from the first colour given to the faller to the second
    // Dictated by the state of it's phase
    fill (lerpColor (f.colours[0], f.colours[1], f.phase))
    // Draw an ambiguous shape (p5) using vertexes
    beginShape ()
    // Start the vertex at the bottom left of the canvas
    vertex (0, height)
    f.start_points.forEach ((s, i) => {
      // Add a vertex point for each point in the faller
      const p = find_point (s, f.end_points[i], f.phase ** f.curves[i])
      vertex (p.x, p.y)
    })
    // End the vertex at the bottom right of the canvas
    vertex (width, height)
    // Finally draw the full shape
    endShape ()
    // Incriment the faller's phase
    f.phase += 0.008
    // Remove fallers that have completely reached the bottom of the canvas
    if (f.phase > 1) redundant.push (i)
  })
  redundant.forEach (n => fallers.splice (n, 1))
}

// Use two coordinates (x,y) and a phase to determine 
// a coordinate along a linear path between them
function find_point (start, end, phase) {
  const delt = {
    // Find the difference between coordinates
    // Alternatively, you can say this is a vector.
    x: end.x - start.x,
    y: end.y - start.y
  }
  // Progress through the difference(vector) by phase
  const x = start.x + delt.x * phase
  const y = start.y + delt.y * phase
  
  // Return the interpolated point
  return { x, y }
}

// Find a random color
function rand_col () {
  colorMode (HSB)
  // Choose a random degree on the Hue wheel
  const h = floor (random () * 360)
  // Always return full saturation (amount of colour) and brightness(amount of white)
  return color (h, 100, 100)
}

// return a random curve exponent between 1 and 3
function rand_curve () {
  return random () * 2 + 1
}
```
<iframe id="falling_falling-2" src="https://editor.p5js.org/TravvDogg/full/iAICry0lj"></iframe>

<script type="module">

    const iframe  = document.getElementById (`falling_falling-2`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>