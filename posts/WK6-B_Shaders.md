---
title: "Week 6b: Shaders"
published_at: 2025-04-15
snippet: I play with WebGL Shaders
disable_html_sanitization: true
allow_math: true
---

This week, we are learning to write and modify shaders using webGL shaders in Javascript. We were given an example to work with, which i have modified to show my understanding of shaders.

# What is a Shader?
Shaders make use of the computer's GPU to calculate and render sequences of repetitive calculations **much faster** than a CPU. Shaders also offer the advantage of being able to read or write from any part of the rendering pipeline, shown here from WebGL's website
![webGL-Pipeline](Wk-6B/WebGl-Pipeline.png)
Shaders are essential in rendering 3d models, by calculating how lighting interacts with surfaces and how pixels are drawn to the screen. 

# Simple Shader Example
<div id="shader_example_div"></div>

<script type="module" id="shader_example_script">

import * as THREE from "/_scripts/three.js/three.module.js"
import codeblockRenderer from "/_scripts/codeblock_renderer.js"
import { OrbitControls } from "/_scripts/three.js/OrbitControls.js"
const div = document.getElementById ("shader_example_div")
const width = div.parentNode.scrollWidth
const height = width * 9 / 16

// Basic three.js setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
camera.position.z = 1

const renderer = new THREE.WebGLRenderer ({ antialias: true })
renderer.setSize (width, height)
div.appendChild (renderer.domElement)

const controls = new OrbitControls (camera, renderer.domElement)

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_time:    { value: 0.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    varying vec2 vUv;

    void main() {
      // compute distance from centre
      vec2 centre = vec2(0.5, 0.5);
      float d = distance(vUv, centre);

      // create a ripple wave
      float wave = 0.5 + 0.5 * sin(20.0 * d - u_time * 5.0);

      // fade out towards edge
      float mask = smoothstep(0.5, 0.48, d);

      // blend two colours based on the wave
      vec3 col1 = vec3(0.1, 0.2, 0.7);
      vec3 col2 = vec3(0.8, 0.3, 0.1);
      vec3 colour = mix(col1, col2, wave) * mask;

      gl_FragColor = vec4(colour, 1.0);
    }
  `
})

   // Create a simple plane to display our shader
   const geometry = new THREE.PlaneGeometry (1.6, 0.9)
   const mesh = new THREE.Mesh (geometry, shaderMaterial)
   scene.add (mesh)

   // Animation loop
   renderer.setAnimationLoop (time => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      renderer.render (scene, camera)
   })

   // Render code block
   codeblockRenderer(document, "shader_example_script", "shader_example_div")
</script>
For this example, i looked at two examples given to us and replicated the visuals of one with the form of the other. It has a really cool effect when you drag it around, almost looking like a convex lense when you move it around, only for the illusion to dissappear once the frame is rotated past a certain point. Pretty cool!


# Rough Draft A2

### Three Passages That Resonate With Me
1. Four Universal Rules of Thinking
	> “What is thinking, if not at least carrying out these four operations: receiving, emitting, storing and processing information like all existing things?”
2. Information processing
	> “All things, in some way, perceive – see, write, read – just like us.”
3. Verne's cave
	>“Verne’s cave even shows the vision the universe has of itself.”
### Two Techniques
1. Glitch
2. Signals / envelopes

## Combining these ideas into a rough draft:

<div id="sketch-holder"></div>

<script src="/_scripts/p5.js"></script>
<script src="/_scripts/p5.sound.min.js"></script>
<script src="/Wk-6B/WIP_sketch.js" id="WIP_Sketch"></script>

<script type="module">
import codeblockRenderer from "/_scripts/codeblock_renderer.js"

codeblockRenderer(document, "/Wk-6B/WIP_sketch.js", "sketch-holder")
</script>

# Feedback from peers
I asked Sam and Wilby for feedback on on my response to the chosen text, if it was an example of post-digital and if it functioned in a chaotic aesthetic register.

They mentioned that it responded well to the chosen text, because it performed the four universal rules of thinking

They noted that it was post digital, because it uses sound to turn something organic to a very digital interpretation of something exotic

They think that in its current stage, at a glance it appears chaotic, but settles into predictability over time.

## Next Phase of the Project

I will hone in one what the code is already good at doing, and work on giving it some more effective complexity. I like the idea of fractals, and how they represent effective complexity well, perhaps i could do something in the background to give it some more chaos and complexity as well.
