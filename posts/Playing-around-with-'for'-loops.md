---
title: Playing-around-with-'for'-loops
published_at: 2025-03-05
snippet: The process of figuring out and drawing a grid of squares on the canvas
disable_html_sanitization: true
allow_math: true
---
<small>As some pretext, maybe a warning, a professor from last semester pointed out just how much meta-commentary I use in my essays and submissions... I hope that means for you that its fun to read through and doesn't feel like a chore to skim over.. I encourage the former, however if you just want to see my code, scroll down to the bottom :)</small>

I have been tasked with drawing (attempting to draw) a grid of squares using `for loops` in [p5.js](https://editor.p5js.org), and have been asked to document my progress here!  

problem #1: i don't know how to format a loop in javascript..  

so i go to good old google and type up 'for loops js', and find [this link to w3schools.com](https://www.w3schools.com/js/js_loop_for.asp).  

interestingly, i'm noticing that the syntax declares a variable inside of the for loop? i'm familiar with using `i` in place of the index on the loop, for example in lua
```lua
for i = 1, 4 do
	print(i)
end
--will print 1 through 4 sequentially, as if printing the values of a table {1, 2, 3, 4}, one by one.
```  
  
however in javascript, the suggested syntax is to use a declaration keyword before i; `let`, which i understand to represent or act as the counterpart to`local` used in other languages, with `var` equivalent to global. I know that js also makes use of a `const` keyword, which i recall something similar in swift and c#, perhaps it represents an immutable variable? in that case, is it global or local?  

"well i *must* know", i say to myself as i type into google. [freecodecamp](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/) pops up as the first result, and contains a lot of very useful information about variable declarations. to summarize:
- var  
	The OG. Used to be the only way to declare a variable before ES6. [what even is ES6?](https://divami.com/blogs/top-ecmascript-es6-features-every-javascript-developer-should-know/#:~:text=ES6%20is%20a%20new%20standardized,an%20exciting%20language%20to%20program.) Var declares a variable in the global scope, which can be redeclared. 
	```js
	var foo = "Hi, world"
	var foo = "Hello, world!"
	```
- let  
	Operates similar to var, but operates on what they(freecodecamp) call the 'block scope', meaning within curly braces`{}`. contrary to `var`, let cannot be freely redeclared within the same scope, only reassigned.
	```js
	let bar = "Airplanes are big"
	bar = "Airplanes are bigger than cars"
	```

- const  
	const can be thought of as an immovable version of `let`. thats pretty much it. good for values that need to remain **const**ant. constant. const. got it? good. moving on.  


Interestingly, js doesn't directly declare their variable's types, similar to some simpler languages i've used, however from my limited experience with c# and swift(i looove ❤️ swift), i find mandatory type declaration to be more readable and generally preferable over a looser language like js.  
Whatever, enough of that nonsense nobody cares! We want grids! 

so. loop syntax looks like this
```js
for(let i = 0; i <= 4; i++) {
	console.log(i)
}
```
breaking down into moving parts, you have the loop's declaration `for`, and the parameters (or arguments if you prefer), which take the form of consciously declared rules for our variable to follow. very malleable, I like it.

starting from `let i = 0`, the code tells the computer to assign the value of `0` to the variable named `i`. this acts as our index, its the value we do stuff with.  

next we have a conditional statement which performs a true/false check. if the condition is met, the loop will start over, otherwise the number will increment. if left unchecked (non-existent or impossible conditions), this loop will do something best professionally described with the expression 'uh oh, no brakes!', and run forever. or until the program crashes / is exited.  

the final parameter is the increment, which dictates the growth / expansion of our index.  

## Yoohoo! over here 👋👋🙋‍♂️

right on. now's the easy part, i already know how to use for loops, now its time to take what i know and apply it to p5.js.  

So. Remember what i said about 'uh oh, no brakes'? its just up a little, y'know, where I talked about loops...  
![file](p5-Crash-06-Mar-2025.png)
see where the cursor is? see how `auto-refresh` is on? see how i typed an impossible condition in the loop?  
yeah.....  
Don't be like me. Don't try creating a `for` loop under the influence of `auto-refresh.` Thats how to attract the brakey brakey monster who destroys all your unsaved work.  
Here's a quick and innocent reminder to save your work!  
..Also posture check...  
Also hydration check, And anything else you've been telling yourself you need to take more care of but have been neglecting. Go stretch! It takes 5 minutes and your body will thank you for it.  


