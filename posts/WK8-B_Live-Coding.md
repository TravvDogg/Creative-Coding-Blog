---
title: "Week 8b: Live Coding"
published_at: 2025-05-06
snippet: I team up with Rania to live code audio and visuals with floc.cc, and discuss more about live coding
disable_html_sanitization: true
allow_math: true
---
I worked with Rania in a collaborative live coding session, we ended up getting a bit caught up in the process and going slightly over the time limit of 26 minutes, even though we originally thought it would be a challenge to get to 6 minutes of coding.. Such is the way of the coder
https://drive.google.com/file/d/17LlzHbcEhikRXxUbkYuf1mCBLQ_5OnzB/view?usp=sharing
<div style="position: relative; width: 100%; padding-top: 56.25%;">
  <iframe
    id="Video-Example"
    src="https://drive.google.com/file/d/17LlzHbcEhikRXxUbkYuf1mCBLQ_5OnzB/preview" 
    title="Video-Example"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

Rania's Code (strudel)
```js
$:sound("bd*4, [- cp]*2, [- hh]*4").bank("RolandTR909")
$:note ("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
sound ("gm_synth_bass_1")
lpf(800)
$:n(`<
[~ 0] 2 [0 2] [~ 2]
[~ 0] 1 [0 1] [~ 1]
[~ 0] 3 [0 3] [~ 3]
[~ 0] 2 [0 2] [~ 2]
>*4`).scale("C4:minor")
.sound("gm_synth_strings_1")
$:n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor").release(5)
.sound("gm_xylophone").room(.5)
$:note("c2 c3 c2").s("sawtooth").lpf("400 2000")
```

My code (hydra)
```js
osc(5.3, -1, 50)
  .color(-0.7, 0.4, -0.2)
  .kaleid(3.2)
  // .posterize(1)
  .modulateRotate(o0)
  .rotate(4, 1)
.out(o0)


src(o0)
  .pixelate(100)
  .modulate(osc(3, 0.3, 0.2))
  .rotate(2, 0.1)
  .modulateScale(50)
  .out(o1)
```


# Live coding

<div style="position: relative; width: 100%; padding-top: 56.25%;">
  <iframe
    id="Live-Coding-Video-1"
    src="https://www.youtube.com/embed/WUGEzZfr29o"
    title="Live-Coding"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

**Domain**
Live coding is a performative programming practice where artists (coders) write and modify code in a real time performance to generate music and visuals, and are often featured at events like Algorave (above)

**Repertoire**
Real time loop modification, pattern abstraction, collaborative coding

**Values**
Transparency, improvisation, accessibility, playfulness

# Relation to broader domains
### youth motivation for learning 
Live coding makes coding fun, by blending coding with playful interaction, which can appeal to youth who want interactive expressive and playful learning experience.

### Education and Pedagogy
Seeing code as a process rather than a product supports constructive learning. There is also opportunity for collaborative learning with multi-coding sessions

### Discourse and Public Debate
Live coding is by nature open source and completely transparent, which allows for easier discussion about authorship, failure and creative processes.

### Legislation
Code ownership is uniquely portrayed in live coding as the performance is inherently original and necessarily completely visible as it's being typed.

