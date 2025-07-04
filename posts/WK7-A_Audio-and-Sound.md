---
title: "Week 7a: Audio and Sound"
published_at: 2025-04-17
snippet: I explore how i will include sound design in my assignment
disable_html_sanitization: true
allow_math: true
---
# Discussion
## How will i make the sound design function in an aesthetic register? What does it mean to be chaotic in the sonic domain
Though my assignment relies heavily on sound to function, it will not produce sound itself. Instead, it functions fully reactive to sound.

### Effective complexity
**Structure**
The visuals will react differently based on frequencies; Small, quick moving particles will represent higher notes in the treble range, while the screen itself or a large, solid element will respond to lower, bass and sub-bass frequencies.

**Noise**
There will, of course, be some unexplainable randomness, which is inherent in all living things, and will serve to add character and reduce predictability, to increase effective complexity.

And because different 'noises', music, and voices have different frequency dispersions, the visuals will clearly respond differently to them. A bias not predefined, but inherent to how it responds.

**Voice**
The piece will react to voice as a purely melodic and rhythmic expression, only responding to the frequencies and timing present. 

Voices traditionally carry more meaning than just their tone, in fact tone is often overlooked when a voice's meaning is discussed, and in replacement the meaning of words and vocal expressions, however rhythm and tone remain equally important in a conversation or passage of information

### Examples
[Jungle Noise Generator](https://mynoise.net/NoiseMachines/jungleNoiseGenerator.php)

[Pink Trombone](https://dood.al/pinktrombone)

[How to Kill a Zombie](https://lcld.xyz/240831_how_to_kill)


While Jungle Noise Generator thinks about Voice and Noise the same way, How to Kill a Zombie treats voices as melodic instruments to be played with.

Pink Trombone also treats voice as an instrument, but one whose inherent anatomical structure are the keys, while How to Kill a Zombie takes all parts of the voice as a note.

Like Pink Trombone, Jungle Noise Generator sees every building block of a whole sound as part of a whole, while How to Kill a Zombie treats the structure of the sound much more mono-focally.

# Simple Interactive Sound Experiment (Tone.js)
<button id="startBtn">(This is a Button) Start Audio</button>
  <div id="Sound-Experiment">
    <label for="baseFreq">Frequency:</label>
    <input type="range" id="baseFreq" min="44" max="880" value="440">
    <span id="freqValue">440 Hz</span>
  </div>

  <script src="/Wk-7A/Tone.js"></script>
  <script src="Wk-7A/Sound-Experiment.js"></script>

<script type="module">
import codeblockRenderer from "/_scripts/codeblock_renderer.js"
codeblockRenderer(document, "Wk-7A/Sound-Experiment.js", "Sound-Experiment")
</script>

The script uses Tone.js and an adjustable slider for a 'base frequency'

The slider controls the frequency, while an LFO (low-frequency oscillator) cycles on a 24-second loop to modulate the amount of distortion on the signal.

Pretty cool!