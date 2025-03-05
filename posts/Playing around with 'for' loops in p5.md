---
title: Playing around with 'for' loops in p5
published_at: 2025-03-05
snippet: The process of figuring out and drawing a grid of squares on the canvas
disable_html_sanitization: true
allow_math: true
---
I have been tasked with drawing a grid of squares using for loops in p5.js.  
problem #1: i dont know how to format a loop in javascript!  

so i go to good old google and type up 'for loops js', and find [this link](https://www.w3schools.com/js/js_loop_for.asp) to w3schools.com.  

interestingly, i'm noticing that the syntax declares a variable inside of the for loop? i'm familiar with using `i` in place of the index on the loop, in a language like lua
```lua
for i = 1, 4 do
	print(i)
end
--will print 1 through 4 sequentially, as if printing the values of a table {1, 2, 3, 4}, one by one.
```  
however in javascript, the suggested syntax is to use a declaration keyword before i; `let`, which i understand to represent or act as the counterpart to`local` used in other languages.  
  
not sure how i feel about this, but js doesn't directly declare their variable's types, similar to some simpler languages i've used, however from my limited experience with c# and swift(❤️)