// page number variable
let pageNum = 1;
// page 1 variables
let stars = [];
let buttonPause;
let buttonSwitch;
let inRotation = true;
let controlMode = true;
let windowWidth = 525;
let windowHeight = 525;
//page 2 variables
let centerX = 250;
let centerY = 250;
let earthAngle = 0;
let moonAngle = 0;
let a = 200;
let b = 160;
let x1, y1, x2, y2;
//page 4 variables
let centerX2 = 250;
let centerY2 = 150;
let earthAngle2 = 0;
let a4 = 100;
let b4 = 100;
let x3, y3;


function setup() {
  createCanvas(500, 500);
  ellipseMode(CENTER);
  buttonNext = createButton("Next");
  buttonNext.position(350, 440);
  buttonNext.mousePressed(pageDown);
  buttonNext.size(100);
  buttonPrevious = createButton("Previous");
  buttonPrevious.position(50, 440);
  buttonPrevious.mousePressed(pageUp);
  buttonPrevious.size(100);

  buttonPrevious.hide();
  buttonPause = createButton("Pause");
  buttonPause.position(200, 440);
  buttonPause.mousePressed(pauseRotation);
  buttonPause.size(100);
  buttonSwitch = createButton("Move the Earth by your Mouse");
  buttonSwitch.position(100, 470);
  buttonSwitch.mousePressed(switchControl);
  buttonSwitch.size(300);

}

function draw() {
  background(240);
  noStroke();

  if (pageNum==1) {
    //page 1
    // stars moving rate
    for (var i = 0; i < 50; i++) {
      stars.push(new Star());
    }
    frameRate(2);
    //two colors for gradient
    var color1 = color(0, 0, 255);
    var color2 = color(158, 51, 0);
    //make gradient
    setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
    //draw some stars
    for (var i = 0; i < 50; i++) {
      var x = random(windowWidth);
      var y = random(windowHeight);
      noStroke();
      fill(255, 255, 0);
      ellipse(x, y, 2, 2);
    }
    drawTrack();
    if (controlMode===true) {
      autoControl();
    } else {
      mouseControl();
    }
    drawMoon();

  } else if (pageNum==2) {
    //page 2
    frameRate(100);
    drawTrack2();
    drawEarth2();
    buttonPause.hide();
    buttonSwitch.hide();
    buttonPrevious.show();
    buttonNext.show();
  } else if (pageNum==3) {
    //page 3
    drawWave();
    buttonPrevious.show();
    buttonNext.show();
  } else if (pageNum==4) {
    //page 4
    drawCoordinate();
    drawTrack3();
    drawEarth3();
    buttonNext.hide();
  }
}

//page 3
function drawWave() {
  //blue ellipse
    push();
    translate(50, 200);
    fill(128, 204, 246);
    for (let i = 0; i < 20; i++) {
      ellipse(i*20, sin(i+frameCount*0.08)*20, 10, 10);
    }
    pop();

    //red elllipse
    push();
    translate(50, 300);
    fill(246, 128, 198);
    for (let i = 0; i < 20; i++) {
      ellipse(i*20, cos(i+frameCount*0.08)*20, 10, 10);
    }
    pop();

  //text
  push();
  fill(163, 216, 103);
  textSize(25);
  text('Sine? Cosine?', 180, 120);
  pop();
}

//page 4
function drawTrack3() {
  // draw the ellipse track
  push();
  stroke(color(0));
  noFill();
  ellipse(centerX2, centerY2, 2 * a4, 2 * b4);
  line(120, centerY2, 380, centerY2);//horizontal line
  line(centerX2, 20, centerX2, 280);
  pop();

  // draw the center and the circular track
  noStroke();
  fill(255);
  ellipse(centerX2, centerY2, 8, 8);

}

function drawCoordinate() {
  stroke(0);
  line(100, 350, 430, 350);
  line(150, 280, 150, 420);
  text('θ', 435, 355);
  text('sin(θ)', 140, 270);
}

function drawEarth3() {
  let mouseDist = dist(mouseX, mouseY, centerX2, centerY2);
  let distRatio = (mouseY-centerY2)/mouseDist;
  let earthAngle2 = asin(distRatio);
  let rEarth = a4 * b4 / sqrt(sq(b4 * cos(earthAngle2)) + sq(a4 * sin(earthAngle2)));
  x3 = rEarth * cos(earthAngle2);
  y3 = rEarth * sin(earthAngle2);

  translate(centerX2, centerY2);
  if (mouseX<centerX2) {
    x3= x3*-1
  }

// earth ellipse
  fill(0);
  ellipse(x3, y3, 10, 10);

  // light blue triangle
  stroke(color(128, 246, 208));
  noFill();
  triangle(0, 0, x3, y3, x3, 0);
  strokeWeight(1);


// c2
  push();
  stroke(color(109, 199, 170));
  translate((x3)/2, (y3)/2);
  rotate(atan2(y3, x3));
  let c2 = int(rEarth);
  text('r = ' + c2, -10, 15);
  pop();


// a2
  push();
  stroke(color(109, 199, 170));
  translate(x3, y3/2);
  rotate(PI/2);
  let a2 = int(y3);
  if (a2<0) {
    a2 = a2*-1
  }
  text('a = ' + a2, 0, -5);
  pop();


// xy coordinates on circle
  push();
  translate(x3, y3);
  stroke(0);
  let polarCo = '(' + int(x3) + ', ' + int(-y3) + ')';
  text(polarCo, 10, 10);
  pop();

// moving circle on sine function
  push();
  translate(-centerX2, -centerY2);
  translate(150, 350);
  noStroke();
  fill(0);

  let sinVal = -y3/rEarth;
  let angleVal = asin(sinVal);

  if (mouseY > centerY2 && mouseX > centerX2) {
    angleVal = PI*2 + angleVal;
  } else if (mouseX < centerX2) {
    angleVal = PI - angleVal;
  }
  // text(angleVal + 'x', 10, 10);
  // text(sinVal + 'y', 10, 30);
  ellipse(angleVal*40, -sinVal*50, 10);

  // sine function
  let xVals = new Array(200);
  let yVals = new Array(200);
  for (let i = 0; i < yVals.length; i++) {
    xVals[i] = 2*PI*i/200;
    yVals[i] = sin(xVals[i]) * 50;
    ellipse(xVals[i]*40, -yVals[i], 2);
  }


  pop();
}


function pageDown() {
  pageNum += 1;
}

function pageUp() {
  pageNum -= 1;
}

//page 2
function drawTrack2() {
  // draw the ellipse track
  push();
  stroke(color(0));
  noFill();
  ellipse(centerX, centerY, 2 * a, 2 * b);
  stroke(color(100));
  strokeWeight(3);
  line(centerX-a, centerY, centerX+a, centerY);
  pop();

  // draw the center
  noStroke();
  fill(255);
  ellipse(centerX, centerY, 8, 8);
}

function drawEarth2() {
  let mouseDist = dist(mouseX, mouseY, centerX, centerY);
  let distRatio = (mouseY-centerY)/mouseDist
  let earthAngle = asin(distRatio);
  let rEarth = a * b / sqrt(sq(b * cos(earthAngle)) + sq(a * sin(earthAngle)));
  x1 = rEarth * cos(earthAngle);
  y1 = rEarth * sin(earthAngle);

  translate(centerX, centerY);
  if (mouseX<centerX) {
    x1= x1*-1
  }

// earth ellipse
  fill(85, 123, 250, 200);
  ellipse(x1, y1, 35, 35);

// dark blue triangle
  stroke(color(26, 61, 165));
  strokeWeight(1);
  noFill();
  triangle(0, 0, mouseX-centerX, mouseY-centerY, mouseX-centerX, 0);

// c1
  push();
  translate((mouseX-centerX)/2, (mouseY-centerY)/2);
  rotate(atan2(mouseY-centerY, mouseX-centerX));
  let c1 = int(mouseDist);
  text('c1: ' + c1, 0, -5);
  pop();

// a1
  push();
  translate(mouseX-centerX, (mouseY-centerY)/2);
  rotate(PI/2);
  let a1 = int(centerY-mouseY);
  if (a1<0) {
    a1 = a1*-1
  }
  text('a1: ' + a1, 0, -5);
  pop();

  // light blue triangle
  stroke(color(128, 246, 208  , 80));
  strokeWeight(7);
  noFill();
  triangle(0, 0, x1, y1, x1, 0);
  strokeWeight(1);

// c2
  push();
  stroke(color(109, 199, 170));
  translate((x1)/2, (y1)/2);
  rotate(atan2(y1, x1));
  let c2 = int(rEarth);
  text('c2: ' + c2, -10, 15);
  pop();

// a2
  push();
  stroke(color(109, 199, 170));
  translate(x1, y1/2);
  rotate(PI/2);
  let a2 = int(y1);
  if (a2<0) {
    a2 = a2*-1
  }
  text('a2: ' + a2, 0, -5);
  pop();
}

// page 1
function autoControl() {
  // revolution of earth around sun on a ellipse track
  push();
  translate(centerX, centerY);
  let rEarth = a * b / sqrt(sq(b * cos(earthAngle)) + sq(a * sin(earthAngle)));
  x1 = rEarth * cos(earthAngle);
  y1 = rEarth * sin(earthAngle);

  drawEarth();
}

function mouseControl() {
  let mouseDist = dist(mouseX, mouseY, centerX, centerY);
  let distRatio = (mouseY-250)/mouseDist
  let earthAngle = asin(distRatio);
  let rEarth = a * b / sqrt(sq(b * cos(earthAngle)) + sq(a * sin(earthAngle)));
  x1 = rEarth * cos(earthAngle);
  y1 = rEarth * sin(earthAngle);
  push();
  translate(centerX, centerY);
  if (mouseX<centerX) {
    x1= x1*-1
  }
  drawEarth();
}

function drawEarth() {
  fill(85, 123, 250, 200);
  ellipse(x1, y1, 35, 35);
  fill(85, 123, 250);
  ellipse(x1, y1, 5, 5);
  // stroke(0);
  // line(90, 0, x1, y1);
  let rEarth = dist(90, 0, x1, y1);
  let ellipseSpeed = 0.3-0.001 * rEarth;
  earthAngle-=ellipseSpeed;
  pop();
}

function drawMoon() {
  // revolution of the moon around earth
  push();
  translate(x1, y1);
  stroke(color(255, 255, 255)); // white track
  noFill();
  ellipse(centerX, centerY, 100, 100);
  let rMoon = 50;
  x2 = centerX + rMoon * cos(moonAngle);
  y2 = centerY + rMoon * sin(moonAngle);
  noStroke();
  fill(227, 232, 247, 200);
  ellipse(x2, y2, 20, 20);
  fill(227, 232, 247);
  ellipse(x2, y2, 5, 5);
  moonAngle-=0.25;
  pop();
}

function drawTrack() {
  // draw the center and the circular track
  noStroke();
  fill(255);
  ellipse(centerX, centerY, 5, 5);
  fill(255, 215, 0); //sun color
  ellipse(centerX+90, centerY, 60, 60);

  // draw the ellipse track
  push();
  stroke(color(255, 0, 0)); // red track
  noFill();
  ellipse(centerX, centerY, 2 * a, 2 * b); //sun
  pop();
}

//fill the background with a gradient
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  // Top to bottom gradient
  if (axis == "Y") {
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter); //blends the two colors together
      stroke(c);
      line(x, i, x + w, i);
    }
  }
  // Left to right gradient
  else if (axis == "X") {
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}

//position stars randomly
function Star() {
  this.x = random(windowWidth);
  this.y = random(windowHeight - 200);
  this.w = 2;
  this.h = 2;
}

Star.prototype.draw = function() {
  noStroke();
  fill(255, 255, 0);
  ellipse(this.x, this.y, this.w, this.h);
  this.x += (random(10) - 5);
  this.y += (random(10) - 5);
  if (this.w == 2) {
    this.w = 2;
    this.h = 2;
  } else {
    this.w = 2;
    this.h = 2;
  }
}

function pauseRotation() {
  inRotation = !inRotation;
  if (inRotation === true) {
    loop();
    buttonPause.html("Pause");
  } else {
    noLoop();
    buttonPause.html("Resume");
  }
}

function switchControl() {
  controlMode = !controlMode;
  if (controlMode === true) {
    buttonSwitch.html("Move the Earth by your Mouse");
  } else {
    buttonSwitch.html("Resume auto-revolution");
  }
}
















// function dragSegment(i, xin, yin) {
//   const dx = xin - x[i];
//   const dy = yin - y[i];
//   const angle = atan2(dy, dx);
//   x[i] = xin - cos(angle) * segLength;
//   y[i] = yin - sin(angle) * segLength;
//   segment(x[i], y[i], angle);
// }

// function segment(x, y, a) {
//   push();
//   translate(x, y);
//   rotate(a);
//   line(0, 0, segLength, 0);
//   pop();
// }

// map colors


// function Arrow(a, b, c) {
//   this.a = a;
//   this.b = b;
//   this.c = c;
// }

// Arrow.prototype.draw = function() {
//   noStroke();
//   fill(255);

// }




//   var offset = 0;
// var strum = 1;

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {

//   background(220);
//   stroke(4);
//   noFill();
//   beginShape();
//   vertex(0, height);
//   for(var x = 0; x < width; x++){
//     //var angle = map(x, 0, width, 0, TWO_PI);
//     var angle = offset + x * 0.01;
//     // map x between 0 and width to 0 and Two Pi
//     var y = map(sin(angle), -strum, strum, 150, 250);
//     vertex(x, y);
//   }
//   vertex(width, height);
//   endShape();
//   offset += 0.1;

// }

//   push();
//   translate(250, 250);
//   //3D rotation? rotateX rotateZ
//   noFill();
//   stroke(0);
//   ellipse(0, 0, 200, 200)
//   noStroke();
//   fill(128, 204, 246);
//   x1 = 100*cos(changeAngle);
//   y1 = 100*sin(changeAngle);
//   // translate(x1, y1);
//   ellipse(x1, y1, 10, 10)

//   rotate(changeAngle + PI/2);

//   textSize(20);
//   textAlign(CENTER, CENTER);
//   text('Sine', x1, y1);

//   pop();
//   changeAngle+=0.01;

  // text(changeAngle, 10, 10);
  // text(x1, 10, 20);
  // text(y1, 10, 30);


  // push();
  // strokeWeight(9);
  // stroke(255, 100);
  // dragSegment(0, mouseX, mouseY);
  // for (let i = 0; i < x.length - 1; i++) {
  //   dragSegment(i + 1, x[i], y[i]);
  // }
  // pop();
