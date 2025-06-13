int frames = 60; // Total frames in loop
float t = 0;     // Time variable

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
