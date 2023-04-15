
let field = document.getElementById("field");
let ball = document.getElementById('ball');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');

let ballRadius = ball.width / 2;
let playerRadius = player1.width / 2;

let player1X = 300;
let player1Y = 400;
let player2X = 1450;
let player2Y = 400;
let playerSpeed = 5;

let moveBall = (ev) => {
  let ball = document.getElementById('ball');

  let newX = ev.clientX - ball.width / 2;
  let newY = ev.clientY - ball.height / 2;

  ball.style.top = newY + 'px';
  ball.style.left = newX + "px";

}

let movePlayer1 = (keyCode) => {
  if (keyCode === 'KeyA' && player1X > 150 + playerRadius) {
    player1X -= playerSpeed;
  } else if (keyCode === 'KeyD' && player1X < 1600 - playerRadius) {
    player1X += playerSpeed;
  } else if (keyCode === 'KeyW' && player1Y + 60 > playerRadius) {
    player1Y -= playerSpeed;
  } else if (keyCode === 'KeyS' && player1Y < 750 + playerRadius) {
    player1Y += playerSpeed;
  }
  player1.style.top = player1Y + 'px';
  player1.style.left = player1X + 'px';
}

let movePlayer2 = (keyCode) => {
  if (keyCode === 'ArrowLeft' && player2X > 150 + playerRadius) {
    player2X -= playerSpeed;
  } else if (keyCode === 'ArrowRight' && player2X < 1600 - playerRadius) {
    player2X += playerSpeed;
  } else if (keyCode === 'ArrowUp' && player2Y + 60 > playerRadius) {
    player2Y -= playerSpeed;
  } else if (keyCode === 'ArrowDown' && player2Y < 750 + playerRadius) {
    player2Y += playerSpeed;
  }
  player2.style.top = player2Y + 'px';
  player2.style.left = player2X + 'px';
}

let kickBall = (ev) => {
  let ball = document.getElementById('ball');
  let player1 = document.getElementById('player1');
  let player2 = document.getElementById('player2');

  let ballRect = ball.getBoundingClientRect();
  let player1Rect = player1.getBoundingClientRect();
  let player2Rect = player2.getBoundingClientRect();

  let ballCenterX = ballRect.x + ballRect.width / 2;
  let ballCenterY = ballRect.y + ballRect.height / 2;

  let player1CenterX = player1Rect.x + player1Rect.width / 2;
  let player1CenterY = player1Rect.y + player1Rect.height / 2;
  let player2CenterX = player2Rect.x + player2Rect.width / 2;
  let player2CenterY = player2Rect.y + player2Rect.height / 2;

  let dx1 = ballCenterX - player1CenterX;
  let dy1 = ballCenterY - player1CenterY;
  let dx2 = ballCenterX - player2CenterX;
  let dy2 = ballCenterY - player2CenterY;

  let distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  let distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  let force = 20; // сила удара

  // обработка столкновения мяча с игроком 1
  if (distance1 < ballRect.width / 2 + player1Rect.width / 2) {
    let nx = dx1 / distance1;
    let ny = dy1 / distance1;
    let fx = force * nx;
    let fy = force * ny;
    ball.style.left = (ballRect.x + fx) + 'px';
    ball.style.top = (ballRect.y + fy) + 'px';
  }

  // обработка столкновения мяча с игроком 2
  if (distance2 < ballRect.width / 2 + player2Rect.width / 2) {
    let nx = dx2 / distance2;
    let ny = dy2 / distance2;
    let fx = force * nx;
    let fy = force * ny;
    ball.style.left = (ballRect.x + fx) + 'px';
    ball.style.top = (ballRect.y + fy) + 'px';
  }

  // перемещение мяча
  let newX = ev.clientX - ball.width / 2;
  let newY = ev.clientY - ball.height / 2;

  ball.style.top = newY + 'px';
  ball.style.left = newX + 'px';
}


document.addEventListener('keydown', (event) => {
  movePlayer1(event.code);
  movePlayer2(event.code);
  kickBall();
});


field.ondragstar = (ev) => ev.preventDefault();
field.onclick = moveBall;
