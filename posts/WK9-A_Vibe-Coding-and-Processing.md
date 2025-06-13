---
title: "Week 9a: Vibe Coding and Processing"
published_at: 2025-05-08
snippet: I experiment with locally hosted LLMs and try coding a gif with Processing
disable_html_sanitization: true
allow_math: true
---
# Interacting with Local LLM's

From ollama, i installed 3 LLM's under 10b params. I asked each of them the same question:

```
User:
"Here are my communities, what are some ideas of ways i can use code to engage these communities?
1. **My Xbox friend group**
	Domain: Social gaming, multiplayer
	Repertoire: Inside jokes, gaming schedules
	Values: Competition, trust, loyalty
2. **Forza Horizon tuning community**
	Domain: Performance tuning in Forza
	Repertoire: Tuning setups, tune sharing forums, meta knowledge
	Values: experimentation, community, feedback, precision
3. **Car community**	
	Domain: Car Culture
	Repertoire: Car meets, technical knowledge, subcultures (JDM, Offroad, Etc)
	Values: Authenticity, passion, innovation
4. **Music community**
	Domain: Creation, sharing and appreciation of music
	Repertoire: Genre knowledge, listening setups
	Values: Expression, emotion, originality
5. **Our class (Creative coding)**
	Domain: Creative Coding, Social interaction, Javascript
	Repertoire: Creative strategies, feedback, coding
	Values: Growth, exploration, fun, learning"
```
# Responses:
## Quen2.5 (0.5b)
``` 
Quen:
"To engage your communities with code and technology, here are some ideas:
1. **Create a Code-Chatroom**: Design a chat room where members can post their code challenges or problems they're working on. You could offer a leaderboard to keep the competition fresh.
2. **Develop a Coding Competition**: Organize an annual coding competition where participants share their projects and provide feedback.
3. **Teach Code in Your Classes**: Offer workshops, lessons, or online courses that teach students how to use code for specific tasks they're working on.
4. **Create a Coding Forum**: Build a dedicated space within the community where members can discuss and solve coding problems together. It could be an AI-powered tool that helps users find solutions to their issues more efficiently.
5. **Collaborative Projects with Students**: Encourage students in your classes to work collaboratively on projects, which not only teaches them code but also fosters teamwork and communication skills.

These ideas can help you build strong connections with your communities by leveraging the power of technology."
```
Quen is the smallest model i could find, under 1b params. It ran faster than an online hosted LLM, and the response was quite acceptable and surprising given the size
# deepseek-r1 (1.5b)
```
deepseek-r1:
"Thinking...
Okay, so I'm trying to figure out how to use code on my communities. I have five different domains here, each with their own strengths and values. Let me go through each one step by step.

Starting with the Xbox friend group. It's about social gaming and multiplayer stuff. So maybe I can set up some kind of tournament or competition among friends? Like a coding challenge where they solve problems together. That could be fun because it combines team spirit with problem-solving skills. Also, sharing tips on how to improve each other could help build trust and loyalty.

Next is the Forza tuning community. They’re into performance tuning for cars. I can leverage this by creating a tool or plugin that allows others to adjust their tuning parameters in real-time. Maybe even track best settings and share them with everyone else, fostering a sense of achievement and competition among tune-ups.

Moving on to the car community. Since it's all about cars, maybe I can create something collaborative where users share ideas for car mods or upgrades. It could be a resource hub where they discuss what features would enhance their cars the most. This way, everyone gets a chance to contribute and see how their efforts improve others.

For the music community, since they value originality and emotion, maybe I can use code as a medium for creative expression. Perhaps creating apps that allow users to upload and share their own songs or sound effects. It could be interactive games where users have to match sounds or create visual representations of their favorite music tracks. That might make the interaction more engaging.

Lastly, our class on creative coding. This one is about collaboration in coding. I can set up a project where teams work together on an open-ended problem. Maybe even use some automated testing to ensure everyone understands and contributes to the solution. It could be competitive with points awarded based on how well they understand or implement their part of the project.

Putting this all together, each idea leverages different strengths of the communities while aligning with their core values. By using code in these ways, I can enhance social interaction, encourage learning, and foster a sense of community among my members....done thinking.

To effectively utilize code on your communities, consider implementing the following ideas:

1. **Xbox Friend Group**:  
   - **Tournament Setup**: Organize a coding challenge where friends solve problems together, fostering teamwork and problem-solving skills. Share tips and strategies to build trust and loyalty.

2. **Forza Tuning Community**:  
   - **Real-Time Adjustment Tool**: Create a plugin that allows tuning parameters in real-time for Forza cars. Track best settings and share them to encourage competition and learning.

3. **Car Community**:  
   - **Collaborative Mod Sharing**: Develop a tool where users can create, upload, and modify car mods or upgrades. Use this as a resource hub with features like feature discussions and shared improvements.

4. **Music Community**:  
   - **Creative Expression Medium**: Use code to facilitate creative expression. Create apps for sharing songs or sound effects, turn them into interactive games, and encourage originality through visual representations.

5. **Creative Coding Class**:  
   - **Collaborative Problem-Solving Project**: Implement an open-ended coding challenge where teams work together on projects. Use automated testing to ensure contributions are clear and effective, rewarding understanding and implementation.

Each idea leverages the strengths of your communities while aligning with their core values, promoting engagement and collaboration through code-based activities."
```
Deepseek r1 is an open source reasoning LLM developed in china that blew away the competition with its cheap cost and high performance. The model i'm using is it's lowest parameter model, but the response is still very impressive and satisfactory. The model did spend a lot of time reasoning before generating an answer

**llava (7b)**
```
llava:
" Here are some ideas of ways you can use code to engage these communities:

1. **My Xbox friend group**
	* Develop a tool that allows users to easily schedule gaming sessions with their friends.
	* Create a leaderboard system that tracks players' performance and compares them against others in the community.
	* Build a chatbot that uses natural language processing to understand inside jokes and respond accordingly, creating 
a more immersive experience for members of the group.
2. **Forza Horizon tuning community**
	* Develop an app or website that allows users to easily share their tuning setups and find setups created by others 
in the community.
	* Create a platform where users can discuss meta knowledge, such as car upgrades and track layouts.
	* Build a tool that uses machine learning to recommend tuning setups based on a user's driving style and preferences.
3. **Car community**
	* Develop an app or website that allows users to easily plan car meets and find local subcultures, such as JDM or off-road enthusiasts.
	* Create a platform where users can share technical knowledge, such as tips on maintaining or modifying their cars.
	* Build a tool that uses machine learning to recommend the best car for a user based on their preferences and budget.
4. **Music community**
	* Develop an app or website that allows users to easily discover new music and artists based on their genre knowledge and listening habits.
	* Create a platform where users can share their listening setups, such as headphones or speakers, and discuss their experiences with different types of audio equipment.
	* Build a tool that uses machine learning to recommend songs or artists based on a user's musical taste and preferences.
5. **Our class (Creative coding)**
	* Develop an app or website that allows users to easily share their creative coding projects and provide feedback and suggestions for improvement.
	* Create a platform where users can discuss coding strategies, such as debugging techniques or efficient ways to write code.
	* Build a tool that uses machine learning to generate code based on a user's input and preferences, allowing them to easily build complex projects with minimal coding knowledge."
```
llava is the largest LLM i used, primarily a multimodal model which can interpret images as well as text. Its response was satisfactory, but it took a while to download and generate a response


# Processing
![loop](Wk-9A/loop.gif)

```java
int frames = 60;
float t = 0;

void setup() {
  size(600, 600);
  frameRate(60);
  colorMode(HSB, 360, 100, 100);
  noFill();
}

void draw() {
  background(0, 0, 0);
  translate(width/2, height/2);

  strokeWeight(2);
  float waveCount = 8;
  float radius = 200;
  float time = TWO_PI * frameCount / frames;

  for (int i = 0; i < 100; i++) {
    float angle = i * TWO_PI / 100;
    float offset = sin(waveCount * angle + time) * 50;

    float x = cos(angle) * (radius + offset);
    float y = sin(angle) * (radius + offset);

    stroke((angle * 180 / PI) % 360, 80, 100);
    point(x, y);
  }

  if (frameCount <= frames) {
    saveFrame("output/loop-####.png");
  } else {
    exit();
  }
}
```
This week i got to learn Java, and the tool that preceeded p5.js: Processing. I created a simple little looping animation, it was quite satisfying to see it work so easily.