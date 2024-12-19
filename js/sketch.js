let quadtree;
let boundary;
let capacity = 1;
let num = 50;

function setup() {
  createCanvas(400, 400);
  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  quadtree = new QuadTree(boundary, capacity);

  // insert random points into the quadtree
  for (let i = 0; i < num; i++) {
    let p = new Point(random(width), random(height));
    quadtree.insert(p);
  }

  // print(quadtree);
}

function draw() {
  background(220);

  // let range = new Rectangle(mouseX, mouseY, 40, 40);
  // noFill();
  // stroke(0, 255, 0);
  // rect(range.x, range.y, range.w * 2, range.h * 2);

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
