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
    period = startingPeriod,
    points = [],
    maxPoints = 5,
    length = 100,
    clear = function() {
      ctx.fillStyle = "black";
      ctx.clearRect(0,0,width, height);
      ctx.fillRect(0,0, width, height);
    };


function curve(x) {
  return Math.sin(x / period) * amplitude;
}

function newDraw() {
  period -= 0.1;
  clear();
  if (points.length >= maxPoints) points.splice(0,1);

  var newPoint = {
    x: (x += length),
    brightness: 1.0,
    ys: []
  };
  for (var j = 0; j <= length; j++) {
    newPoint.ys.push(curve(this.x + j));
  }
  points.push(newPoint);

  ctx.fillStyle = "white";
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i],
        colour = Math.round(255 * point.brightness),
        startX = point.x % width;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(" + colour + "," + colour + "," + colour + ")";
    ctx.moveTo(startX, point.y);
    for (var j = 0; j <= length; j++) {
      ctx.lineTo(startX + j, baseY + point.ys[j]);
    }
    ctx.stroke();
    point.brightness -= 1/maxPoints;
  }
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

