---
title: "Week 5a: Describing Post-digital"
published_at: 2025-04-04
snippet: I choose a post-digital work and descrive it using Florian Cramer's essay, and think about the technology they used. Additionally, i experiment with RiTa.js
disable_html_sanitization: true
allow_math: true
---
# Post-Digital Artist: AIHVHIA

## Technology they use
In the album / creative project Operaville, AIHVHIA uses custom made synthesizers and audio processing techniques to create musical soundscapes that are emotionally and technically fascinating. His album contains abstract and psychadellic music videos and single track exports of the final mix, along with an extra complimentary video explainer for the unique audio effect used for each piece, to allow the viewer to experience the work however they want, and explore the abstract techniques he used.
https://www.youtube.com/user/AIHVHIA
<iframe width="424" height="238" src="https://www.youtube.com/embed/icFJd-jFMCc" title="Why It Took 7 Years to Finish My New Album" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What JS APIs and Libraries could they use?
If AIHVHIA were to use Javascript to generate some of these audio effects, they would certainly use the Web Audio API for sound synthesis and processing, along with libraries like Tone.js, for example, for more complex audio scheduling and effects.

## RiTa.js Poem
<div id="RiTa_example"></div>

<script src="https://cdn.jsdelivr.net/npm/rita"></script>

<script id="RiTa_example_script">
document.getElementById('RiTa_example').innerHTML = 
  '<p>The ' + RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + ' ' + 
  RiTa.randomWord({pos: 'vb'}) + 's with ' + 
  RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + '</p>' +

  '<p>The ' + RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + ' ' + 
  RiTa.randomWord({pos: 'vb'}) + 's with ' + 
  RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + '</p>' +

  '<p>The ' + RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + ' ' + 
  RiTa.randomWord({pos: 'vb'}) + 's with ' + 
  RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + '</p>' +

  '<p>The ' + RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + ' ' + 
  RiTa.randomWord({pos: 'vb'}) + 's with ' + 
  RiTa.randomWord({pos: 'jj'}) + ' ' + 
  RiTa.randomWord({pos: 'nn'}) + '</p>';
</script>
