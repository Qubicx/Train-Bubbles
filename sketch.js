let bubbles = [];
let letters = ['2', '3', '4', '5', 'A', 'C', 'J', 'Z', 'R', 'W'];
let colors = ['#ee352e', '#ee352e', '#00933c', '#00933c', '#2850ad', '#2850ad', '#996633', '#996633', '#fccc0a', '#fccc0a']
let mouse = {
  size: 20
}
let testBubble = {
  size: 1
}
let maxBubbles = 8;

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  noStroke();
  mouse.pos = createVector(-1, -1);
  testBubble.pos = createVector(-1, -1);
  for (var i = 0; i < letters.length; i++) {
    bubbles.push(new Bubble(random(width), random(height), letters[i], color(colors[i]), 1));
  }
}

function draw() {
  background(220);
  //grow any bubble that isn't touching anything
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (!bubbles[i].touchingAny()) {
      bubbles[i].grow();
    } else {
      bubbles[i].jitter(4);
    }
    if (!bubbles[i].touchingAny()) {
      bubbles[i].grow();
    }
    bubbles[i].show();
  }
}

function touchStarted() {
  popBubbles();
}

function touchMoved() {
  popBubbles();
  return false;
}

function popBubbles() {
  mouse.pos.set(mouseX, mouseY);
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].touching(mouse)) {
      testBubble.pos.set(random(width), random(height));
      testBubble.size = 1;
      let touching = 0;
      for (let j = bubbles.length - 1; j >= 0; j--) {
        if (bubbles[j].touching(testBubble)) {
          touching++;
        }
      }
      if (touching == 0) {
        bubbles[i].pos.set(testBubble.pos);
        bubbles[i].size = 1;
      }
    }
  }
}
