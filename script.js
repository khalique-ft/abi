const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let bullets = [];
let enemies = [];
let keys = {};
let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function updatePlayer() {
  let px = player.offsetLeft;
  if (keys["ArrowLeft"] && px > 0) px -= 5;
  if (keys["ArrowRight"] && px < game.clientWidth - player.offsetWidth) px += 5;
  player.style.left = px + "px";

  if (keys["Space"]) {
    if (bullets.length < 5) shoot();
  }
}

function shoot() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = player.offsetLeft + 20 + "px";
  bullet.style.top = player.offsetTop - 20 + "px";
  game.appendChild(bullet);
  bullets.push(bullet);
}

function spawnEnemy() {
  if (gameOver) return;
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.x = Math.random() * (game.clientWidth - 50);
  enemy.y = -50;
  enemy.style.left = enemy.x + "px";
  enemy.style.top = enemy.y + "px";
  game.appendChild(enemy);
  enemies.push(enemy);

  setTimeout(spawnEnemy, 1000);
}

function isCollide(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

function createExplosion(x, y) {
  const explosion = document.createElement("div");
  explosion.classList.add("explosion");
  explosion.style.left = x + "px";
  explosion.style.top = y + "px";
  game.appendChild(explosion);
  setTimeout(() => explosion.remove(), 300); // remove after animation
}

function loop() {
  if (gameOver) return;

  updatePlayer();

  bullets.forEach((bullet, i) => {
    bullet.style.top = bullet.offsetTop - 8 + "px";
    if (bullet.offsetTop < -20) {
      bullet.remove();
      bullets.splice(i, 1);
    }
  });

  enemies.forEach((enemy, ei) => {
    enemy.style.top = enemy.offsetTop + 3 + "px";

    if (isCollide(player, enemy)) {
      endGame();
    }

    if (enemy.offsetTop > game.clientHeight) {
      enemy.remove();
      enemies.splice(ei, 1);
    }

    bullets.forEach((bullet, bi) => {
      if (isCollide(bullet, enemy)) {
        createExplosion(enemy.offsetLeft, enemy.offsetTop);
        enemy.remove();
        bullet.remove();
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score += 10;
        scoreDisplay.textContent = "Score: " + score;
      }
    });
  });

  requestAnimationFrame(loop);
}

function endGame() {
  gameOver = true;
  alert("Game Over! Your Score: " + score);
  window.location.reload();
}

// Start game
spawnEnemy();
requestAnimationFrame(loop);
