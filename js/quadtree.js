class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // check if a point is in the rectangle
  contains(point) {
    if (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }

  // check if the rectangle intersects another rectangle
  intersects(boundary) {
    let boundaryRight = boundary.x + boundary.w;
    let boundaryLeft = boundary.x - boundary.w;
    let boundaryTop = boundary.y - boundary.h;
    let boundaryBottom = boundary.y + boundary.h;

    let rangeRight = this.x + this.w;
    let rangeLeft = this.x - this.w;
    let rangeTop = this.y - this.h;
    let rangeBottom = this.y + this.h;

    // if the boundary intersects the range return true
    if (
      boundaryRight >= rangeLeft &&
      boundaryLeft <= rangeRight &&
      boundaryTop <= rangeBottom &&
      boundaryBottom >= rangeTop
    ) {
      return true;
    }
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  // insert a point into the quadtree
  insert(point) {
    // if the point is not in the boundary, return
    if (!this.boundary.contains(point)) {
      return;
    }

    // insert the point into the quadtree
    if (this.points.length < this.capacity) {
      // if the quadtree has not reached capacity
      this.points.push(point);
      return true;
    } else {
      // if the quadtree has reached capacity
      // and has not been divided
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast.insert(point)) {
        return true;
      } else if (this.northwest.insert(point)) {
        return true;
      } else if (this.southeast.insert(point)) {
        return true;
      } else if (this.southwest.insert(point)) {
        return true;
      }
    }

    return false;
  }

  // subdivide the quadtree into 4 subquads
  subdivide() {
    // create 4 variables for the boundary coordinates
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    // create 4 subquads with new boundaries
    // top right subquad (northeast)
    let northeastBoundary = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(northeastBoundary, this.capacity);

    // top left subquad (northwest)
    let northwestBoundary = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northwest = new QuadTree(northwestBoundary, this.capacity);

    // bottom right subquad (southeast)
    let southeastBoundary = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new QuadTree(southeastBoundary, this.capacity);

    // bottom left subquad (southwest)
    let southwestBoundary = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southwest = new QuadTree(southwestBoundary, this.capacity);

    // set the divided flag to true
    this.divided = true;
  }

  // find all points in range
  query(range, found) {
    // if the range does not intersect the boundary, return
    if (!range.intersects(this.boundary)) {
      return false;
    } else {
      for (let i = 0; i < this.points.length; i++) {
        if (range.contains(this.points[i])) {
          found.push(this.points[i]);
        }
      }

      if (this.divided) {
        this.northeast.query(range, found);
        this.northwest.query(range, found);
        this.southeast.query(range, found);
        this.southwest.query(range, found);
      }
    }
    // print(found);
    return found;
  }

  // show the quadtree
  display() {
    // draw the boundary with p5.js
    noFill();
    stroke(0);
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );

    // draw the points with p5.js
    for (let i = 0; i < this.points.length; i++) {
      noStroke();
      fill(255, 0, 0);
      ellipse(this.points[i].x, this.points[i].y, 10, 10);
    }

    if (this.divided) {
      this.northeast.display();
      this.northwest.display();
      this.southeast.display();
      this.southwest.display();
    }
  }
}
