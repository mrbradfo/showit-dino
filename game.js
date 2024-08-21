const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: 50,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 5,
  dy: 0,
};

const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;
const obstacleGap = 300;
let frame = 0;

function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "green";
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  });
}

function updateObstacles() {
  if (frame % obstacleGap === 0) {
    const obstacleY = Math.random() * (canvas.height - obstacleHeight);
    obstacles.push({ x: canvas.width, y: obstacleY });
  }

  obstacles.forEach((obstacle) => {
    obstacle.x -= player.speed;
  });

  obstacles.filter((obstacle) => obstacle.x + obstacleWidth > 0);
}

function detectCollision() {
  obstacles.forEach((obstacle) => {
    if (
      player.x < obstacle.x + obstacleWidth &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacleHeight &&
      player.y + player.height > obstacle.y
    ) {
      alert("Game Over");
      document.location.reload();
    }
  });
}

function updatePlayer() {
  player.y += player.dy;

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }

  if (player.y < 0) {
    player.y = 0;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawObstacles();
  updateObstacles();
  updatePlayer();
  detectCollision();

  frame++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    player.dy = -player.speed;
  } else if (e.code === "ArrowDown") {
    player.dy = player.speed;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    player.dy = 0;
  }
});

gameLoop();
