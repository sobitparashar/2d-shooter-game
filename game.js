const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: canvas.width / 2,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  speed: 5,
  jumpPower: 10,
  velocityY: 0,
  isJumping: false,
  color: 'red'
};

let leftPressed = false;
let rightPressed = false;
let jumpPressed = false;

const gravity = 0.5;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  if (leftPressed) {
    player.x -= player.speed;
  }
  if (rightPressed) {
    player.x += player.speed;
  }
  if (jumpPressed && !player.isJumping) {
    player.velocityY = -player.jumpPower;
    player.isJumping = true;
  }

  player.velocityY += gravity;
  player.y += player.velocityY;

  // Prevent player from going off-screen
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
    player.velocityY = 0;
  }
}

function handleTouchControls() {
  document.getElementById('moveLeft').addEventListener('touchstart', () => {
    leftPressed = true;
  });
  document.getElementById('moveLeft').addEventListener('touchend', () => {
    leftPressed = false;
  });

  document.getElementById('moveRight').addEventListener('touchstart', () => {
    rightPressed = true;
  });
  document.getElementById('moveRight').addEventListener('touchend', () => {
    rightPressed = false;
  });

  document.getElementById('jumpButton').addEventListener('touchstart', () => {
    jumpPressed = true;
  });
  document.getElementById('jumpButton').addEventListener('touchend', () => {
    jumpPressed = false;
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  drawPlayer();
  requestAnimationFrame(update);
}

handleTouchControls();
update();
