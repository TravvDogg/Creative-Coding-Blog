---
title: "Week 10B: Scripting Languages"
published_at: 2025-05-20
snippet: I follow a tutorial and explore the Ruby scripting language
disable_html_sanitization: true
allow_math: true
---
# Scripting Languages: Ruby
https://www.youtube.com/watch?v=Dji9ALCgfpM
<div style="position: relative; width: 100%; padding-top: 56.25%;">
  <iframe
    id="Ruby-programming"
    src="https://www.youtube.com/embed/Dji9ALCgfpM"
    title="Ruby Programming"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

```ruby
require 'ruby2d'

set title: "Ruby Visual Demo", width: 400, height: 300
  
# Draw a background
Rectangle.new(
x: 0, y: 0,
width: 400, height: 300,
color: 'navy'
)

# Draw a moving shape
circle = Circle.new(
x: -30, y: 150,
radius: 30,
sectors: 32,
color: '#DC143C'
)

# Animate it
update do
circle.x += 1
circle.x = -circle.radius if circle.x > (Window.width + circle.radius)
end

show
```
I found that ruby felt closest to my python and javascript experience, it almost felt like a hybrid between the two, with its own uniqueness of course, like its quirky one liner conditionals `x = y if z`, which mirrors the ternary operator with slight difference in syntax

## Why I am interested in Ruby
I decided to learn a bit about Ruby for this weeks class, since its the only one from the suggested list that i have no experience in. The installation process went pretty smooth, and i had no trouble learning the basics to create this simple animation

## How can i use this language in my own creative practice
Ruby is a more human readable language than something like javascript, so for a smaller project or one that i needed to show to a large non-coder audience, i could use Ruby
e.g. 
```ruby
5.times { puts "Hi" }
``` 
vs 
```js
for (int i = 0; i < 5; i++) {
  System.out.println("Hi");
}```

It is also said to be faster for building webapps, using 'Ruby on Rails'. I'm not familiar with it however, so that would take some time to learn

Ruby might be one of the easiest languages i have learned and used, since it's built so close to a natural language in syntax, so for a small project i could use it over something more complicated like javascript.

## Strengths and weaknesses of Ruby over other Scripted Languages
Ruby feels more naturally to the language it's users are used to using in day-to-day life, so it can be more readable and expressive, However, it is known for being computationally expensive compared to other scripted languages.

## Scripting languages vs Compiled languages
Scripting languages skip compilation steps which can save hours of time in prototyping, and they are generally faster to code into without the same boilerplate that a compiled language might have.
Compiled languages are much less computationally expensive, and offer a stronger solution for permanant applications or larger projects due to their higher control over memory.