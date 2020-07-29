let bubbles = [];
let mouse = {
  x: -1,
  y: -1,
  size: 20
}
let testBubble = {
  x: -1,
  y: -1,
  size: 1
}
let maxBubbles = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  mouse.x = mouseX;
  mouse.y = mouseY;
  //grow any bubble that isn't touching anything
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (!bubbles[i].touchingAny()) {
      bubbles[i].grow();
    }
    //bubbles[i].jitter(3);
    bubbles[i].show();
  }
  //add bubbles if there aren't too many
  if (bubbles.length < maxBubbles) {
    testBubble.x = random(width);
    testBubble.y = random(height);
    testBubble.size = 1;
    let touching = 0;
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].touching(testBubble)) {
        touching++;
      }
    }
    if (touching == 0) {
      bubbles.push(new Bubble(testBubble.x, testBubble.y, 1));
    }
}

function mouseDragged() {
  mouse.x = mouseX;
  mouse.y = mouseY;
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].touching(mouse)) {
      bubbles.splice(i, 1);
    }
  }
}
class Bubble {
  constructor(x_, y_, size_) {
    this.x = x_;
    this.y = y_;
    this.size = size_;
    this.color = color(random(255), random(255), random(255));
  }
  grow() { //increase the size of a bubble
    this.size++;
  }
  touching(other) { //is this bubble touching other
    return dist(this.x, this.y, other.x, other.y) - this.size / 2 - other.size / 2 <= 0
  }
  touchingAny() { //is this bubble touching anything
    if (this.x + this.size / 2 >= width || this.x - this.size / 2 <= 0 || this.y + this.size / 2 >= height || this.y - this.size / 2 <= 0) {
      return true;
    } else {
      for (let i = 0; i < bubbles.length; i++) {
        if (this.touching(bubbles[i]) && bubbles[i] != (this || ignoring)) {
          return true;
        }
      }
      return false;
    }
  }
  jitter(amount = 3) {
    testBubble.x = this.x + random(-amount, amount);
    testBubble.y = this.y + random(-amount, amount);
    testBubble.size = this.size;
    let touching = false;
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].touching(testBubble) && bubbles[i] != this) {
        touching = true;
      }
    }
    if (!touching && !(testBubble.x + testBubble.size / 2 >= width || testBubble.x - testBubble.size / 2 <= 0 || testBubble.y + testBubble.size / 2 >= height || testBubble.y - testBubble.size / 2 <= 0)) {
      this.x = testBubble.x;
      this.y = testBubble.y;
      this.size = testBubble.size;
    }
  }
  delete() {
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i] == this) {
        bubbles.splice(i, 1);
      }
    }
  }
  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
