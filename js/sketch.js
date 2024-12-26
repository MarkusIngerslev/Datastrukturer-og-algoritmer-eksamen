let quadtree;
let boundary;
let capacity = 4;
let num = 1050;
let radius = 2;

let particles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(220);
  // Print the frameRate to see difference between QuadTree and Brute Force
  print(frameRate());

  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  quadtree = new QuadTree(boundary, capacity);

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
  // create a range object with the mouse position
  let range = new Rectangle(mouseX, mouseY, 40, 40);
  noFill();
  stroke(0, 255, 0);
  rect(range.x, range.y, range.w * 2, range.h * 2);

  let foundPoints = [];

  // query the quadtree with the range object
  quadtree.query(range, foundPoints);

  // draw the points within the quart box with p5.js
  for (let i = 0; i < foundPoints.length; i++) {
    noStroke();
    fill(255, 255, 0);
    ellipse(foundPoints[i].x, foundPoints[i].y, 4);
  }
}

function drawCircle() {
  // create a range object with the mouse position
  let range = new Circle(mouseX, mouseY, 40);
  noFill();
  stroke(0, 255, 0);
  ellipse(range.x, range.y, range.r * 2, range.r * 2);

  let foundPoints = [];

  // query the quadtree with the range object
  quadtree.query(range, foundPoints);

  // draw the points within the quart box with p5.js
  for (let i = 0; i < foundPoints.length; i++) {
    noStroke();
    fill(255, 255, 0);
    ellipse(foundPoints[i].x, foundPoints[i].y, 4, 4);
  }
}
