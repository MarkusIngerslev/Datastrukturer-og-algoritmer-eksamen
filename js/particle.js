class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.collided = false;
  }

  checkEdges() {
    // check if the particle is "touching" the edges of the canvas
    // if so, reverse the velocity
    if (this.x > width || this.x < 0) {
      this.vx *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.vy *= -1;
    }
  }

  update() {
    this.checkEdges();
    this.x += this.vx;
    this.y += this.vy;
  }

  collides(particle) {
    // calculate the distance between the two particles with p5.js dist() function
    let distance = dist(this.x, this.y, particle.x, particle.y);
    // if the distance is less than the sum of the radii,
    // the particles are touching
    if (distance <= this.r + particle.r) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    if (this.collided) {
      fill(255, 0, 255);
    } else {
      fill(0);
    }
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
