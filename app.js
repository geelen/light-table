var canvas = document.getElementById("datCanvas"),
    ctx = canvas.getContext("2d"),
    width = 600,
    height = 300,
    baseY = height / 2,
    animate = false;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "black";
ctx.strokeStyle = "papayawhip";
ctx.lineWidth = 2;


var amplitude = 100,
    startingPeriod = 1200,
    drawX = 0,
    phaseX = 0,
    period = startingPeriod,
    points = [],
    maxPoints = 30,
    length = 10,
    clear = function() {
      ctx.fillStyle = "black";
      ctx.clearRect(0,0,width, height);
      ctx.fillRect(0,0, width, height);
    };


function curve(phaseX) {
  return Math.sin(phaseX / period) * amplitude;
}
function phase(y) {
  return period * Math.asin(y / amplitude);
}

function newDraw() {
  clear();
  if (points.length >= maxPoints) points.splice(0,1);

  var newPoint = {
    drawX: drawX,
    phaseX: phaseX,
    brightness: 1.0,
    ys: []
  };
  for (var j = 0; j <= length; j++) {
    newPoint.ys.push(curve(phaseX + j));
  }
  points.push(newPoint);

  ctx.fillStyle = "white";
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i],
        colour = Math.round(255 * point.brightness);

    ctx.beginPath();
    ctx.strokeStyle = "rgb(" + colour + "," + colour + "," + colour + ")";
    ctx.moveTo(point.drawX, point.y);
    for (var j = 0; j <= length; j++) {
      ctx.lineTo(point.drawX + j, baseY + point.ys[j]);
    }
    ctx.stroke();
    point.brightness -= 1/maxPoints;
  }

  period -= 0.1;
  drawX = (drawX += length) % width;
  phaseX = phase(newPoint.ys[newPoint.ys.length - 1]) % period;
  if (animate) requestAnimationFrame(newDraw);
}

(animate = false) || newDraw();
(animate = true) && newDraw();
points;





// function draw() {
//   period -= 1;
//   ctx.clearRect(0,0,width, height);

//   ctx.beginPath();
//   ctx.fillRect(0,0, width, height);
//   for (var i = 0; i <= width; i++, x++) {
//     ctx.lineTo(i, baseY + curve(x));
//   }
//   ctx.stroke();
// //   setTimeout(draw, 100);
// //   setInterval(draw, 1000);
//   if (animate) requestAnimationFrame(draw);
// }

// (animate = true) && draw();
// (animate = false) || draw();

