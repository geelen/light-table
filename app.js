var canvas = document.getElementById("datCanvas"),
    ctx = canvas.getContext("2d"),
    width = 600,
    height = 300,
    baseY = height / 2;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "black";
ctx.strokeStyle = "papayawhip";
ctx.lineWidth = 2;

var amplitude = 100,
    startingPeriod = 600,
    period = startingPeriod,
    x = 0;

function curve(x) {
  return Math.sin(x / period) * amplitude;
}

function draw() {
  period -= 1;
  ctx.clearRect(0,0,width, height);

  ctx.beginPath();
  ctx.fillRect(0,0, width, height);
  for (var i = 0; i <= width; i++, x++) {
    ctx.lineTo(i, baseY + curve(x));
  }
  ctx.stroke();
//   setTimeout(draw, 100);
//   setInterval(draw, 1000);
//   requestAnimationFrame(draw);
}

draw();

