const canvas = document.getElementById('lightsCanvas');
const ctx = canvas.getContext('2d');
const colors = ["red", "green", "blue", "yellow", "pink"];
const lightCount = 20;

// Generate random color for each light
const lights = Array.from({ length: lightCount }, (_, i) => ({
  x: (canvas.width / (lightCount + 1)) * (i + 1),
  y: canvas.height / 2,
  color: getRandomColor(),
}));

// Function to get a random color
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Draw the string of lights
function drawLights() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the string
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Draw the lights
  lights.forEach(({ x, y, color }) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, 15, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.ellipse(x - 5, y - 8, 5, 10, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Base
    ctx.fillStyle = "gray";
    ctx.fillRect(x - 5, y + 15, 10, 5);
  });
}

// Update colors when spacebar is pressed
document.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    lights.forEach(light => (light.color = getRandomColor()));
    drawLights();
  }
});

drawLights(); // Initial draw
