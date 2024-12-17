class Particle {
  constructor(x, y, img) {
    // Randomize initial position with some spread around x, y
    this.position = createVector(
      x + random(-50, 50),  // Spread x position
      y + random(-50, 50)   // Spread y position
    );
    
    // More varied initial velocity
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 3));  // Varying speed
    
    // Random initial acceleration
    this.acceleration = createVector(
      random(-0.1, 0.1),  // Random x acceleration
      random(-0.1, 0.1)   // Random y acceleration
    );
    
    // Randomized lifespan
    this.lifespan = random(1000, 2000);
    
    // Random size variation
    this.size = random(40, 60);
    
    // Rotation for more dynamic movement
    this.rotation = random(0, TWO_PI);
    this.rotationSpeed = random(-0.01, 0.01);
    
    // Store the image
    this.img = img;
  }
  
  run() {
    // More dynamic gravity
    let gravity = createVector(
      random(-0.001, 0.001),  // Slight horizontal gravity variation
      -0.0001  // Upward gravity
    );
    
    this.applyForce(gravity);
    this.update();
    this.show();
  }
  
  applyForce(force) {
    // Add some randomness to force application
    let randomForce = force.copy();
    randomForce.mult(random(0.8, 1.2));
    this.acceleration.add(randomForce);
  }
  
  update() {
    // More dynamic velocity and acceleration
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    
    // Reduce lifespan with some randomness
    this.lifespan -= random(8, 10);
    
    // Rotate
    this.rotation += this.rotationSpeed;
    
    // Slight damping
    this.acceleration.mult(0.95);
  }
  
  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    
    // Fading opacity based on lifespan
    let opacity = map(this.lifespan, 0, 1000, 0, 255);
    tint(255, opacity);
    
    // Varying size
    image(this.img, -this.size/2, -this.size/2, this.size, this.size);
    
    pop();
  }
  
  isDead() {
    return this.lifespan < 0.0;
  }
}