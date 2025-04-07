---
title: "Week 3b: WIP Review"
published_at: 2025-03-20
snippet: I discuss how i will use various concepts in my sketch, and I discuss my current progress
disable_html_sanitization: true
allow_math: true
---
# How Do I Plan To Achieve The 'Cute'?
Referring back to week 2's idea of my sketch

**Visual**
My sketch will include a simple particle simulation of a campfire and a marshmallow that follows the cursor, which can roast to any level of perfection the user prefers. The visuals will be simple and as mentioned Lo-fi, which means very little visual clutter aside from the elements i want to highlight, being the marshmallow and campfire.

**Sonic**
Basic sonic elements following the guides i set out for myself in Week 3a's post, where they exist mainly as complimentary to the visual and interactive elements of the sketch, like calm campfire music, the soft sizzling of the campfire, etc.

**Interaction**
The limits of this sketches interaction will be basic and will work together with sound to compliment the visuals. To me, that means everything will be freeform, allowing the user to do whatever they want and having complete control over the program, with no outset goals or objectives for them to complete.

Not much has changed about how i plan to implement 'Cute' into my work, but this week i'm taking an opportunity to explore how this might look in code, and expanding on these definitions

# Visual / Interactive
Culturally, fire is both a destructive force, and one of growth. It can be seen as both the advent of society in the earliest of ages, and also the cataclysm of civilisations and nature. To keep my sketch cute, I need to make sure this fire resembles one of human construction, by giving control agency to the user.

Planning the interaction design for a piece involving fire, i think one of the best ways to give agency and the idea of control to the user and away from the fire, is to prompt them to light it, instead of starting lit. It's so important that the user can choose to start this fire, rather than the fire blazing as soon as the tab is opened. 

When i go to a campsite, it's normally not a good sign when there's a fire by the time i get there. That's not a campfire, thats a **bushfire**, and bushfires are *scary*, and **scary isn't cute**.

Another way i hope to achieve cute interaction is to personify the user within the sketch. There's a marshmallow that the user can roast to any level of perfection they choose, and they can eat it without consequence. 

I have already devised a simple fire-like particle simulation, which uses circles as particles, and randomly generated values for colour, movement and lifetime to give a more natural approach.

<iframe id = "Fire-Simulation" src ="https://editor.p5js.org/TravvDogg/full/rVA0Dbdvi"></iframe>
<script type="module">
    console.log (`hello world! 🚀`)

    const iframe  = document.getElementById (`Fire-Simulation`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42
</script>
Play around with it, the fire will follow your cursor when you click. if you keep it near the base of the window and move it side to side slightly, you get something that resembles a bonfire.
# Sonic
The common sizzling and popping sound of fire is really calming to me, and i'm not alone on this. [Here is a video people use as ambient sound to help relax or study](https://www.youtube.com/watch?v=UgHKb_7884o). I can conclude based on the popularity and attention given to this video, that people like listening to fire ambience. This ambience is one of peace and quiet, it's relaxing. and **relaxing is cute**. It might not be fluffy or fuzzy, but it's undoubtedly **cute**