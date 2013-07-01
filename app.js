var canvas = document.getElementById("datCanvas"),
    ctx = canvas.getContext("2d"),
    width = 600,
    height = 300;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "black";
ctx.strokeStyle = "papayawhip";
ctx.lineWidth = 2;

function draw() {
  ctx.fillRect(0,0, width, height);

  var y = height/2;

  ctx.beginPath();
  ctx.moveTo(0, y);
  for (var x = 1; x <= width; x++) {
    y += Math.round(1 - Math.random() * 2);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
//  setTimeout(function() { requestAnimationFrame(draw); }, 1000)
}

draw();

