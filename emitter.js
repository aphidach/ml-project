// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    const items = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

    // Get a random index (0, 1, 2, or 3)
    const rand = Math.floor(Math.random() * items.length);
    this.particles.push(new Particle(this.origin.x, this.origin.y, items[rand]));
  }

  run() {
    for (let i = this.particles.length  - 1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        // Remove the particle
        this.particles.splice(i, 1);
      }
    }
  }
}
