---
title: "AT2: Chaos!"
published_at: 2025-05-04
snippet: "I demonstrate net art of the 'Zany' aesthetic register, responding to an essay by Michael Serres"
disable_html_sanitization: true
allow_math: true
---

# My Net-Art: Music Visualiser
<iframe
  src="/A2-Chaos/index.html"
  style="width:100%; aspect-ratio: 4 / 3; display:block; border:none;"
  sandbox="allow-scripts allow-same-origin"
></iframe>  

<small>A2_Chaos on [Github](https://github.com/TravvDogg/A2_Chaos)</small>

### Copy of README.md:
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <div id="readme-container">Loading README...</div>

  <script>
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

---

Creating this visualiser was a lot of fun, and there is still a lot i can do with it, given the time to progress further, but i'm more than happy to submit it in the current state, as it demonstrates my idea pretty well.

Getting this to render in the markdown file took quite a bit more time than i'd happily admit, but in the end the solution was much simpler than anything i was trying to do - Just wrap it in an iframe and call it a day. Do mind that it does look different from fullscreen and i did apply bandaids to the code where it rendered differently than intended. My uploaded github repo does not include these bandaids.

# My Process
Earlier i mentioned that i had a lot of fun making this piece, but when i say this piece, i really mean everything that led to it. 

What you see in the final piece is the set of individual parts that made it to the final submission, but what you dont see are the many precursors to them. I had a lot of fun creating and trying different things, and playing around with every part of each simulation or generation to see what funky ways i could make it react. This process required completely forgetting everything i knew about the code, and viewing it as an abstract set of instructions, so i could play around with these instructions without any expectation of what would happen.

Realising this abstraction was a key part in unlocking my creative potential.. Or rather, seperating my creative mind from my technical mind.

## Each Piece of the code, Explained
As mentioned earlier, this piece is a culmination of many previous attempts. As such, it's fairly easy to go through line-by-line and extract the meaning behind each modular part of the code.

Although inherently each part of the code was made without it, almost every working visual element relies on different parts of p5's audio engine to modulate or control them. Without access to an FFT (fast fourier transform) like p5 provides, there simply would be no option for audio visualisation, and it would be a completely randomly generated frame, which wouldnt be very interactive or interesting to play with. 