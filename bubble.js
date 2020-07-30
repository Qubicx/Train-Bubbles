class Bubble {
  constructor(x_, y_, letter_, color_, size_) {
    this.pos = createVector(x_, y_)
    this.size = size_;
    this.color = color_;
    this.letter = letter_;
  }
  grow() { //increase the size of a bubble
    this.size++;
  }
  touching(other) { //is this bubble touching other
    return this.pos.dist(other.pos) - this.size / 2 - other.size / 2 <= 0
  }
  touchingAny() { //is this bubble touching anything
    if (this.pos.x + this.size / 2 >= width || this.pos.x - this.size / 2 <= 0 || this.pos.y + this.size / 2 >= height || this.pos.y - this.size / 2 <= 0) {
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
    testBubble.pos.set(this.pos);
    let movement = createVector(random(-amount, amount), random(-amount, amount))
    testBubble.pos.add(movement);
    testBubble.size = this.size;
    let touching = false;
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].touching(testBubble) && bubbles[i] != this) {
        touching = true;
      }
    }
    if (!touching && !(testBubble.pos.x + testBubble.size / 2 >= width || testBubble.pos.x - testBubble.size / 2 <= 0 || testBubble.pos.y + testBubble.size / 2 >= height || testBubble.pos.y - testBubble.size / 2 <= 0)) {
      this.pos.set(testBubble.pos);
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
    ellipse(this.pos.x, this.pos.y, this.size);
    textAlign(CENTER, CENTER);
    textFont("helvetica", this.size / 1.5);
    textStyle(BOLD);
    if (this.letter == 'N' || this.letter == 'Q' || this.letter == 'R' || this.letter == 'W') {
      fill(0);
    } else {
      fill(255);
    }
    text(this.letter, this.pos.x, this.pos.y + this.size * 0.04);
  }
}
