const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let score = 0;
let speed = 4;
let gameRunning = false;
let playerX = 135;

/* 🎵 Sound Effects */
const crashSound = new Audio(
  "https://cdn.pixabay.com/download/audio/2021/08/04/audio_8a4f59b0e4.mp3?filename=8-bit-explosion-85572.mp3"
);
const beepSound = new Audio(
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1f76101128.mp3?filename=menu-select-110624.mp3"
);

/* Start Game */
document.getElementById("startBtn").onclick = () => {
  startScreen.style.display = "none";
  gameRunning = true;
  gameLoop();
};

/* Restart Game */
document.getElementById("restartBtn").onclick = () => {
  window.location.reload();
};

/* Player Movement (Keyboard) */
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
    beepSound.play();
  }
  if (e.key === "ArrowRight" && playerX < 270) {
    playerX += 20;
    beepSound.play();
  }

  player.style.left = playerX + "px";
});

/* Mobile buttons */
leftBtn.onclick = () => {
  if (playerX > 0) playerX -= 20;
  player.style.left = playerX + "px";
};

rightBtn.onclick = () => {
  if (playerX < 270) playerX += 20;
  player.style.left = playerX + "px";
};

/* Reset enemy to top */
function resetEnemy(enemy) {
  enemy.style.top = "-120px";
  enemy.style.left = Math.floor(Math.random() * 260) + "px";
}

enemies.forEach((enemy) => resetEnemy(enemy));

/* Collision Detection */
function isColliding(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

/* Main Game Loop */
function gameLoop() {
  if (!gameRunning) return;

  score++;
  scoreDisplay.textContent = score;

  enemies.forEach((enemy) => {
    let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));

    if (enemyTop > 600) {
      resetEnemy(enemy);
      speed += 0.08;
    } else {
      enemy.style.top = enemyTop + speed + "px";
    }

    if (isColliding(player, enemy)) {
      crashSound.play();
      endGame();
    }
  });

  requestAnimationFrame(gameLoop);
}

/* End Game */
function endGame() {
  gameRunning = false;
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}
