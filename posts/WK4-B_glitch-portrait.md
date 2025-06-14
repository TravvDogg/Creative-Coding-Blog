---
title: "Week 4b: Glitchy Self"
published_at: 2025-04-01
snippet: I render a selfie in a glitchy way, and explain how that affects it's aesthetic register
disable_html_sanitization: true
allow_math: true
---

<script src="./_scripts/p5.js"></script>

<canvas id="glitch_self_portrait"></canvas>

<script type="module" id="glitch_portrait_script">

   const cnv = document.getElementById (`glitch_self_portrait`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16
   cnv.style.backgroundColor = `deeppink`

   const ctx = cnv.getContext (`2d`)

   let img_data

   const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   const img = new Image ()
   img.onload = () => {
      cnv.height = cnv.width * (img.height / img.width)
      draw (img)
      img_data = cnv.toDataURL ("image/jpeg")
      add_glitch ()
   }
   img.src = `Wk-4B/Selfie.jpeg`

   const rand_int = max => Math.floor (Math.random () * max)

   const glitchify = (data, chunk_max, repeats) => {
      const chunk_size = rand_int (chunk_max / 4) * 4
      const i = rand_int (data.length - 24 - chunk_size) + 24
      const front = data.slice (0, i)
      const back = data.slice (i + chunk_size, data.length)
      const result = front + back
      return repeats == 0 ? result : glitchify (result, chunk_max, repeats - 1)
   }

   const glitch_arr = []

   const add_glitch = () => {
      const i = new Image ()
      i.onload = () => {
         glitch_arr.push (i)
         if (glitch_arr.length < 12) add_glitch ()
         else draw_frame ()
      }
      i.src = glitchify (img_data, 96, 6)
   }

   let is_glitching = false
   let glitch_i = 0

   const draw_frame = () => {
      if (is_glitching) draw (glitch_arr[glitch_i])
      else draw (img)

      const prob = is_glitching ? 0.05 : 0.02
      if (Math.random () < prob) {
         glitch_i = rand_int (glitch_arr.length)
         is_glitching = !is_glitching
      }

      requestAnimationFrame (draw_frame)
   }

</script>

<script type="module">
import codeblockRenderer from "/_scripts/codeblock_renderer.js"

codeblockRenderer(document, "glitch_portrait_script", "glitch_self_portrait")
</script>

# How rendering my likeness in this way affects its aesthetic register
Rendering my likeness with a glitchy, colour-shifted script transforms the image into an aesthetic art piece with post-digital meaning. By distorting the image using glitch techniques, I'm disrupting the image of the portrait. This transformation engages Ngai’s aesthetic registers the zany, the cute, and the interesting most closely aligning with the zany, as the portrait becomes an object of chaos and digital entanglement.

Drawing on Menkman’s “A Phenomenology of Glitch Art” (2011), this approach echoes her idea that glitches “force the viewer to make active sense of the work.” By introducing randomness and a glitchy effect, the portrait becomes less about self-recognition and more about the underlying digital processes.

From the Net Art Readings, Ippolito’s “Ten Myths of Internet Art” (2002) helps contextualise this gesture as resistant to aesthetic norms. My glitch portrait refuses polish and coherence, embracing what Ippolito would frame as myth-busting, that digital art must aim for perfection or high fidelity. Instead, I express imperfection intentionally, to add to the visual interest of the image.

The use of randomised, colour-shifted lines introduces glitches that don’t fully obscure the underlying image but interrupt its legibility. The portrait retains some structured order, but the glitch artefacts introduce irregularity and unpredictability.