// // The Nature of Code
// // Daniel Shiffman
// // http://natureofcode.com


// A simple Particle class
let imageLoad
function preload(){
  imageLoad = loadImage('box.png');
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(1, 2));
    this.lifespan = 1000.0;
    this.icon = '👿';
  }

  run() {
    let gravity = createVector(0, -0.01);
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 8;
    this.acceleration.mult(0);
  }

  // Method to display
  show() {
    // textSize(12);
    // textAlign(CENTER);
    noStroke();
    fill(255, this.lifespan);
    // text(this.icon, this.position.x, this.position.y);
    image(img, this.position.x, this.position.y, 50, 50);
    // copy(imageLoad, 0, 0, 10, 10, this.position.x, this.position.y, 10, 10);
  }

  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0.0;
  }
}
