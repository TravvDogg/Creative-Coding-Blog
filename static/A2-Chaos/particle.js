
// Particle.js
class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = random(-2, 2)
        this.vy = random(-2, 2)
        this.size = random(7, 20)
        this.life = int(random(30, 100))
        this.color = [
        random(360),
        random(60),
        random(50, 100),
        random(0.5, 1)
        ]
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.life--
    }

    draw() {
        noStroke()
        colorMode(HSB)
        fill(this.color[0], this.color[1], this.color[2], this.color[3]);
        colorMode(RGB)
        ellipse(this.x, this.y, this.size)
    }

    isDead() {
        return this.life <= 0
    }
}