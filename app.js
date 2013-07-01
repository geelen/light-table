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
    startingPeriod = 600,
    period = startingPeriod,
    points = [],
    maxPoints = 100,
    length = 5,
    clear = function() {
      ctx.fillStyle = "black";
      ctx.clearRect(0,0,width, height);
      ctx.fillRect(0,0, width, height);
    };


function curve(x) {
  return Math.sin(x / period) * amplitude;
}

function newDraw() {
  period -= 1;
  clear();
  if (points.length >= maxPoints) points.splice(0,1);

  points.push({
    x: (x += length),
    y: curve(x) + baseY,
    brightness: 1.0
  });

  ctx.fillStyle = "white";
  for (var i = 0, l = points.length - 1; i < l; i++) {
    var pointA = points[i],
        pointB = points[i+1],
        colour = Math.round(255 * pointA.brightness),
        startX = pointA.x % width,
        endX = (pointB.x - pointA.x) + startX;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(" + colour + "," + colour + "," + colour + ")";
    ctx.moveTo(startX, pointA.y);
    ctx.lineTo(endX, pointB.y);
    ctx.stroke();
    pointA.brightness -= 1/maxPoints;
  }
  if (animate) requestAnimationFrame(newDraw);
}

(animate = false) || newDraw();
(animate = true) && newDraw();











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

