---
title: "Week 1b: Discussion about Rafael's Work"
published_at: 2025-03-06
snippet: I discuss one of Rafael Rozendaal's online works with a classmate
disable_html_sanitization: true
allow_math: true
---
# Rafaël Rozendaal
Rafaël Rozendaal creates programs using primitive techniques to achieve stunning visual results, and this week I will be discussing one of his recent works on his [website](https://www.newrafael.com/internet/) with another classmate, and talking about three key discussion points:  

- what do I think is going on, under the hood?  
- what concepts would I need to understand in order to replicate this work in p5?  
- what resources might help me to learn those concepts?  
<small>(copied from canvas)</small>  

I chose to focus on his most recent at the time i started the course, [Shrinking](https://www.newrafael.com/shrinking/)  
I love this piece. I didn't just choose this to examine just because it was the first one i clicked on, i truly believe that its amazing to achieve something so hypnotic with such simplicity.  

I discussed with Rania on discord about the above talking points
## What is going on, under the hood?
I think that this piece uses classes for each shrinking square, and each square shrinks to one side of the screen. There is definitely some randomisation going on, with the colors and the direction it shrinks in.

I asked Rania what she thought what was going on

That's an interesting question! While I’m not an expert in JavaScript, I think Rafael probably used p5.js to create his artistic shrinking. I’m guessing he went with a low frame rate of around 25 fps so that the animation feels smooth but still moves quickly. It seems like there might be several squares shifting from corner to corner, and I wonder if he used random() to add some hypnotic movement to it!   
![Screenshot of Discord chat 1st question](Wk-1B/Rania-1.png)

I agree with what she said about it, I think it waits a set amount of time to fade the old square's alpha out, while it creates a new square to fade into a different side of the screen. Each side of the square is a similar shade, but slightly different colour. I cant tell if it's random or not, but they all share the same hue, so i can tell they used HSB colors.
## What concepts would i need to understand to replicate this work in p5?

It would be entirely possible to recreate this effect by just drawing a rectangle repeatedly with different coloured strokes on each side, and just moving it toward any randomly chosen side of the screen without redrawing a canvas ontop of it. Although on closer investigation, it looks like Rafael uses 5 quadrilaterals.  

I asked Rania for her input, and i believe we share a lot of the same ideas
What concepts would I need to understand to replicate this work in p5? I believe some concepts you may need to look into are rect() and square(), along with random() and the For Loop function to save time on repeating the functions. This is what I assume you will need to understand to replicate Rafael's work.  
![Screenshot of Discord chat 2nd question](Wk-1B/Rania-2.png)
I will add, however, that i think it would also be useful to understand how HSB works and potentially to advance on random(), perhaps some Perlin noise for a more natural feeling random.  

## What resources might help me learn these concepts?
The first place I would ever look for help with these concepts would be [MDN](https://developer.mozilla.org/en-US/) or the [p5 help page](https://p5js.org/reference/).  
One of the best resources I have available is my teacher, Mx Capogreco. If i'm ever stuck on something, I would reach out to them about it in class, and I know they can help me.  

A secondary resource that I would only really use if necessary is chatGPT. It's there to answer my simple questions if i have them, but i wouldn't rely on it to write or debug my own code.  
![Screenshot of Discord chat 3rd question](Wk-1B/Rania-3.png)
Rania also noted W3Schools and the youtube channel 'The Coding Train' from class, which i completely forgot about. Cheers Rania!  