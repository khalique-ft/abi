const gameArea = document.querySelector('.game-area');
const playerCar = document.querySelector('.player-car');
const enemyCar = document.querySelector('.enemy-car');

let playerX = 175;
let enemyY = -100;
let gameSpeed = 5;

function moveEnemy() {
  enemyY += gameSpeed;
  if (enemyY > 600) {
    enemyY = -100;
    enemyX = Math.floor(Math.random() * 350);
    enemyCar.style.left = `${enemyX}px`;
  }
  enemyCar.style.top = `${enemyY}px`;
}

function detectCollision() {
  const playerRect = playerCar.getBoundingClientRect();
  const enemyRect = enemyCar.getBoundingClientRect();

  return !(
    playerRect.top > enemyRect.bottom ||
    playerRect.bottom < enemyRect.top ||
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right
  );
}

function gameLoop() {
  moveEnemy();

  if (detectCollision()) {
    alert("Game Over!");
    window.location.reload();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 10;
    playerCar.style.left = `${playerX}px`;
  }
  if (e.key === 'ArrowRight' && playerX < 350) {
    playerX += 10;
    playerCar.style.left = `${playerX}px`;
  }
});

gameLoop();
