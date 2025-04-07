---
title: "Week 4a: Compressibility and effective complexity"
published_at: 2025-03-25
snippet: I demonstrate my understanding of Compressibility and effective complexity by creating and describing 3 examples
disable_html_sanitization: true
allow_math: true
---
<script src="./scripts/p5.js"></script>
This week, we explore the concepts of Compressibility and Complexity. These concepts are heavily used and learned in Computer science under the **Algorithmic Information Theory**, which essentially boils down to how effectively you can describe information in the shortest way possible.
# Compressibility
Compressibility describes how much a piece of data can be reduced in size by removing redundancy (repetitiveness, etc. This is kinda how .zip files are made). High compressible objects contain repetitive / predictable patterns, while low compressible objects are often random without any discernible patterns.
## Low Compressibility
<div id="sketch_Low-C"></div>
<script>
	new p5(function(p) {
		p.setup = function() {
			p.createCanvas(400, 400)
			  p.background(255)
			  p.noStroke()
			  for (let i = 0; i < 1000; i++) {
			    p.fill(p.random(255), p.random(255), p.random(255), p.random(50, 255))
				p.ellipse(p.random(p.width), p.random(p.height), p.random(5, 20), p.random(5, 20))
			  }
		}
	}, "sketch_Low-C")
</script>
Completely random arrangement of circles that changes every time you reload the webpage

## High Compressibility
<div id="sketch_High-C"></div>
<script>
	new p5(function(p) {
		p.setup = function() {
			  p.createCanvas(400, 400)
			  p.background(255)
			  p.noStroke()
			  p.fill(100, 150, 200)
			  let spacing = 40
			  for (let x = spacing / 2; x < p.width; x += spacing) {
				for (let y = spacing / 2; y < p.height; y += spacing) {
				p.ellipse(x, y, 30, 30)
				}
			}
		}
	}, "sketch_High-C")
</script>
Static, unchanging array of circles that stays predictably the same any time it's refreshed

# High Effective Complexity
Effective complexity describes the compressible parts of an object. Effective complexity is measured by how much of an object is predictable vs how much is random noise. An object with high complexity would be intricate, like a renaissance art piece. A stack of boxes would be low in effective complexity, because it needs very little information to describe. Something completely random like TV static would be low in effective complexity, and low in compressibility.
<div id="sketch_High-E-C"></div>
<script>
	new p5(function(p) {
		p.setup = function() {
			p.createCanvas(400, 400)
			p.background(255)
			p.stroke(0)
			p.translate(p.width / 2, p.height)
			p.branch(100)
		}	
		p.branch = function(len) {
			p.line(0, 0, 0, -len)
			p.translate(0, -len)
			if (len > 4) {
				p.push()
				let angle = p.PI / 6 + p.random(-0.1, 0.1)
				p.rotate(angle)
				p.branch(len * (0.6 + p.random(-0.05, 0.05)))
				p.pop()
			p.push()
			angle = -p.PI / 6 + p.random(-0.1, 0.1)
			p.rotate(angle)
			p.branch(len * (0.6 + p.random(-0.05, 0.05)))
			p.pop()
			}
		}
	}, "sketch_High-E-C")
</script>
Fractal tree with random variation