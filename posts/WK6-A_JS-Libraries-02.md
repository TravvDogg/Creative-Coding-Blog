---
title: "Week 6a: JS Libraries Comparison"
published_at: 2025-04-10
snippet: I explore more Javascript Libraries
disable_html_sanitization: true
allow_math: true
---
In this blog post, I look at and differentiate three Javascript libraries with unique uses, and compare their use cases against eachother
### q5.js
A creative coding library inspired by tools like p5.js, q5.js is geared toward making it simple to work with interactive graphics and, potentially, audio signals or envelopes. It is aimed at rapid prototyping for artistic and experimental projects.

### c2.js
While less widely known than p5.js derivatives, c2.js focuses more on managing dynamic data—often including signal processing or envelope functions—to control visual or auditory parameters over time. It can be seen as offering a more focused approach toward timed transitions and modulation.

### svg.js
This library is dedicated solely to manipulating Scalable Vector Graphics (SVG) in the browser. It provides a convenient API for creating, animating, and interacting with vector graphics, making it ideal when the work is specifically with SVG elements and not general-purpose creative coding.

  

# Differences
Purpose: q5.js and c2.js cater to creative, interactive coding (with c2.js leaning toward signal/envelope handling), whereas svg.js strictly manages vector graphics.

Functionality: q5.js tends to offer an overall environment for creative coding, c2.js offers refined control over time-based changes and signals, and svg.js provides detailed control over SVG elements.

Focus: The first two are broader in scope (potentially handling both graphics and sound modulation) while svg.js is specialised on scalable vector graphics.

# Use within JS Module
A module in Javascript is a unique type of script which offers ways to organise and structure code into a collection of individual snippets that interact with each other.  

There are two ways to have a module, ES Modules or CommonJS modules. 

The modern ES Modules use the `import` keyword, where the classic CommonJS uses the `require` keyword. They both achieve the same goal, but ES Modules are generally better and more standard.  

[SVG.js](https://svgjs.dev/docs/3.2/getting-started/) can be used with an `import` statement, which means it is an **ES Module**

Similarly, [C2.js](https://c2js.org/get-started.html) can be used with `require` and assigned to a variable, which is used in **CommonJS module** syntax

However, [q5.js](https://github.com/q5js/q5.js/wiki/Get-Started) does not indicate anywhere that it can be used as a module, only running as a script paralell with the rest of the code, with `<script>` tags, so i believe it **Cannot** be used as a module **as is**.  
However, [esm.sh](https://esm.sh) can be used here to import the npm package as an **ES Module**, like so:

# ESM  and Signal / Envelope Demonstration
<canvas id="c2Canvas"></canvas>

<script type="module" id="signalEnvelope_script">
  import c2 from "https://esm.sh/c2.js";
  import codeblockRenderer from "/_scripts/codeblock_renderer.js";

  // Exponential ease-in-out function
  function easeInOutExpo(x) {
    if (x === 0) return 0;
    if (x === 1) return 1;
    return x < 0.5
      ? Math.pow(2, 10 * (2 * x - 1)) / 2
      : (2 - Math.pow(2, -10 * (2 * x - 1))) / 2;
  }

  function setup() {
    const canvas = document.getElementById("c2Canvas")
    const renderer = new c2.Renderer(canvas)
    renderer.size(480, 480)
    renderer.background("#eeeeee")

    // Circle path parameters
    const centerX = 240
    const centerY = 240
    const pathRadius = 200

    // Movement period (ms)
    const period = 4000
    // Bounce between bottom (π/2) and top (-π/2)
    const startAngle = Math.PI / 2
    const endAngle   = -Math.PI / 2

    const startTime = performance.now()

    renderer.draw(() => {
      const elapsed = performance.now() - startTime
      // Ping-pong normalized time in [0,1]
      let t = (elapsed % period) / period
      let p = t <= 0.5 ? t * 2 : (1 - t) * 2
      // Exponential easing
      const eased = easeInOutExpo(p)
      // Angle along the half-circle
      const angle = startAngle + (endAngle - startAngle) * eased

      // Compute position
      const x = centerX + pathRadius * Math.cos(angle)
      const y = centerY + pathRadius * Math.sin(angle)

      renderer.clear()
      // Draw path
      renderer.stroke(false)
      renderer.circle(centerX, centerY, pathRadius, false)

      // Hue mapping based on position
      const hue = 180 + eased * -60
      renderer.fill(`hsl(${hue}, 80%, 50%)`)
      renderer.circle(x, y, 20)
    })
  }

  setup()
  codeblockRenderer(document, "signalEnvelope_script", "c2Canvas")
</script>

# Text Summaries
### Information & Thinking
Serres examines how information flows into thought. He suggests that thinking is not merely a linear process but a creative, intricate transformation of dispersed data into meaningful connections, challenging traditional ideas about rationality and structure.

### What Is It Like to Be A Fungus?
Sheldrake invites us to explore life from the perspective of fungi. The text highlights the complex, networked existence of fungi, showing that they are not isolated organisms but key players in the ecological web, which challenges our anthropocentric views of life.

### Xenofeminism
This manifesto advocates for a feminism that embraces technology and scientific rationality. It calls for using digital and biotechnological innovations to dismantle traditional gender roles and societal constraints, envisioning a politics that transforms alienation into empowerment.