let quadtree;
let boundary;
let capacity = 1;
let num = 1050;
let radius = 3;

let particles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(width), random(height));
  }

  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  quadtree = new QuadTree(boundary, capacity);
}

function draw() {
  background(220);

  // use the p5.js frameRate() function to display the frame rate
  // check to see if quadtree is working
  // print(frameRate());

  // clear the quadtree
  quadtree.clearQuadtree();
  
  // insert random points into the quadtree
  for (let i = 0; i < num; i++) {
    let p = new Point(particles[i].x, particles[i].y, particles[i]);
    quadtree.insert(p);

    particles[i].update();
    particles[i].display();
    particles[i].collided = false;
  }

  // check for collisions between particles
  for (let i = 0; i < particles.length; i++) {
    let range = new Circle(particles[i].x, particles[i].y, particles[i].r);
    let foundPoints = [];
    quadtree.query(range, foundPoints);

    for (let j = 0; j < foundPoints.length; j++) {
      let p = foundPoints[j].userData;
      if (particles[i] != p && particles[i].collides(p)) {
        particles[i].collided = true;
      }
    }
  }

  quadtree.display();

  // drawRectangle();
  // drawCircle();
}

function drawRectangle() {
  let range = new Rectangle(mouseX, mouseY, 40, 40);
  noFill();
  stroke(0, 255, 0);
  rect(range.x, range.y, range.w * 2, range.h * 2);

  let foundPoints = [];

  quadtree.query(range, foundPoints);
  quadtree.display();

  for (let i = 0; i < foundPoints.length; i++) {
    noStroke();
    fill(255, 255, 0);
    ellipse(foundPoints[i].x, foundPoints[i].y, 4);
  }
}

function drawCircle() {
  let range = new Circle(mouseX, mouseY, 40);
  noFill();
  stroke(0, 255, 0);
  ellipse(range.x, range.y, range.r * 2, range.r * 2);

  let foundPoints = [];

  quadtree.query(range, foundPoints);
  quadtree.display();

  // draw the points within the quart box with p5.js
  for (let i = 0; i < foundPoints.length; i++) {
    noStroke();
    fill(255, 255, 0);
    ellipse(foundPoints[i].x, foundPoints[i].y, 10, 10);
  }
}
