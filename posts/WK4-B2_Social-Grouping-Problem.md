---
title: "Week 4b-2: Social Grouping Problem"
published_at: 2025-04-02
snippet: How do you split a group most chaotically
disable_html_sanitization: true
allow_math: true
---
I'll admit that the grouping problem we had in class as a secondary homework piqued my interest and i haven't been able to get it out of my head without solving it, and it turns out it's quite the problem.  

So the grouping problem we were trying to solve actually has roots in Geometry and Coding Theory. It started as a simple problem in a math hobbyist magazine, referred to as **The Kirkman Schoolgirl Problem**, but it's also known as the **Social Golfer Problem**.  

### The kirkman Schoolgirl Problem
The problem was originally phrased as the following:  

15 girls walk in groups of 3. How can you arrange the groups so that over 7 days, no 2 girls share a group more than once.  
[Actually, Kirkman wrote it a bit more 1850's like.](https://en.wikipedia.org/wiki/Kirkman%27s_schoolgirl_problem#:~:text=Fifteen%20young%20ladies%20in%20a%20school%20walk%20out%20three%20abreast%20for%20seven%20days%20in%20succession:%20it%20is%20required%20to%20arrange%20them%20daily%20so%20that%20no%20two%20shall%20walk%20twice%20abreast.)  

### Social Golfer Problem
A more adaptive way to think about this problem is to phrase it more adaptively,  

You have a fixed number of people and a fixed group size. Over several 'rounds', you must create groups where every person gets to work with different people each time.  

As you add more rounds, the amount of previous pairings increases. The algorithm must keep track of all these pairings to ensure that when it forms new groups, no two people who have been already paired end up together again.  

### Solving These Problems
In its essence, the problem is really only about keeping track of each previous interaction and making sure they don't repeat unless necessary. From what i gather, there is no agreed upon solution, and it's still a popular point of discussion among computer scientists and mathematicians. While there are some agreed upon solutions for various defined sets and parameters, there isn't a 'best' solution for all, meaning that this is often just brute forced.  

To solve this problem generically, it can be as simple as storing each interaction under each person, or visually as a graph of nodes, where each turn you make connections between each person, making sure not to draw over existing lines.  

For larger groups and sets of people, this can become relatively expensive, however i couldn't find anything where this is used outside of simple group allocation.

:)