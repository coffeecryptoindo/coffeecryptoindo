var width, height, rayon, frontPts, backPts, centerX, centerY, spinX, spinY;
var mouseOn, pmouseX, pmouseY, mouseX, mouseY;
var quantity;
var canvas = document.getElementById("globeCanvas");
var ctx = canvas.getContext("2d");
window.addEventListener('mousedown', mousePressed);
window.addEventListener('mouseup', mouseReleased);
window.addEventListener('mousemove', mouseDragged);
window.onresize = resizeCanvas;
// width = canvas.width = (window.innerWidth);
// height = canvas.height = (window.innerHeight);
width = canvas.width = (320);
height = canvas.height = (320);
resizeCanvas();

///////settings
quantity = 2000;
rayon = 140;
depth = 0.9; //]0,1[

pause = false;
spinX = Math.random() - 1;
spinY = Math.random() - 1;
initPts(quantity);
draw();

function draw() {

  ctx.clearRect(0, 0, width, height);

  for (i = 0; i < backPts.length; i++) {
    var d = dist(backPts[i].x, backPts[i].y);
    var t = map(d, 0, rayon, 0.8, 0.1);
    //draw
    ctx.fillStyle =
      "hsla(" + backPts[i].angle + ",90%,40%," +
      // "hsla(212,90%,40%," +
      t + ")";
    drawPoint(centerX + backPts[i].x, centerY + backPts[i].y, t);
    //move
    backPts[i].x -= noZero(map(d, 0, rayon * backPts[i].z * 1.2, spinX, 0.01), spinX);
    // backPts[i].y -= noZero(map(d, 0, rayon * backPts[i].z * 1.2, spinY, 0.01), spinY);
    //sort
    if (d > rayon * backPts[i].z) {
      backPts[i].x += spinX;
      // backPts[i].y += spinY;
      frontPts.push(backPts[i]);
      backPts.splice(i, 1);
    }
  }

  for (i = 0; i < frontPts.length; i++) {
    var d = dist(frontPts[i].x, frontPts[i].y);
    var t = map(d, 0, rayon, 1.0, 0.4);
    //draw
    ctx.fillStyle =
      "hsla(" + frontPts[i].angle + ",90%,60%," +
      // "hsla(182,90%,60%," +
      t + ")";
    drawPoint(centerX + frontPts[i].x, centerY + frontPts[i].y, t);
    //move
    frontPts[i].x += noZero(map(d, 0, rayon * frontPts[i].z * 1.2, spinX, 0.01), spinX);
    // frontPts[i].y += noZero(map(d, 0, rayon * frontPts[i].z * 1.2, spinY, 0.01), spinY);
    //sort
    if (d > rayon * frontPts[i].z) {
      frontPts[i].x -= spinX;
      // frontPts[i].y -= spinY;
      backPts.push(frontPts[i]);
      frontPts.splice(i, 1);
    }
  }
  

  requestAnimationFrame(draw);
  updateRotation(2);
}

/**
init the points
n : quantity of points
*/
function initPts(n) {
  frontPts = [];
  backPts = [];
  generateRandomPoints()
    //front
  for (i = 0; i < n / 2; i++) {
    frontPts.push(generateRandomPoints());
  }
  //back
  for (i = 0; i < n / 2; i++) {
    backPts.push(generateRandomPoints());
  }
}

/**
z : depth of the point
*/
function generateRandomPoints() {
  var d = Math.random() * rayon;
  var pz = Math.random() * (1.0 - depth) + depth;
  var px = Math.cos(d) * d * pz;
  var py = Math.sin(d) * d * pz;

  return {
    x: px,
    y: py,
    z: pz,
    angle: Math.atan2(px, py) * (180 / Math.PI)
  };
}

/**
d : ]0 - 1] (0:far, 1:close)
*/
function drawPoint(x, y, d) {
  var s = Math.floor(d * 5) + 1;
  ctx.fillRect(x, y, s, s);
}

function updateRotation(mult) {
  
  // spinX = (mouseX - pmouseX)*mult;
  // spinY = (mouseY - pmouseY)*mult;
  spinX = -2;
  spinY = 0;
  var maxSpeed = 2; //max speed of spin
  var mag = spinX * spinX + spinY * spinY;
  if (mag > maxSpeed * maxSpeed) {

    //normalizing vector
    mag = Math.sqrt(mag);
    spinX /= mag;
    spinY /= mag;
    //mult by max speed
    spinX *= maxSpeed;
    spinY *= maxSpeed;
  }
}
//////////////////maths///////////////////////
function constrain(value, min, max) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

function dist(x, y) {
  return Math.sqrt(x * x + y * y);
}

function noZero(value, sign) {
  if (value == 0) {
    if (sign < 0) return -0.01;
    else return 0.01;
  }
  return value;
}
//////////////inputs/////////////////////
function mousePressed(e) {
  pmouseX = mouseX = e.offsetX;
  pmouseY = mouseY = e.offsetY;
  mouseOn = true;

}

function mouseReleased(e) {
  mouseOn = false;
  updateRotation(2);

}

function mouseDragged(e) {
  if (mouseOn) {
    pmouseX = mouseX;
    pmouseY = mouseY;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    updateRotation(2);
  }
}
/**
resize tool
*/
function resizeCanvas() {
  // width = canvas.width = (window.innerWidth);
  width = canvas.width = (320);
  setTimeout(function() {
    // height = canvas.height = (window.innerHeight);
    height = canvas.height = (320);
  }, 0);
  centerX = width / 2;
  centerY = height / 2;
};















