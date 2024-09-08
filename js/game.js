const gameBox = document.getElementById('gameBox');

const bird = document.getElementById('bird');

const upButton = document.getElementById('upButton');

const downButton = document.getElementById('downButton');

let birdTop = gameBox.offsetHeight / 2 - bird.offsetHeight / 2;

let birdVelocity = 0;

const gravity = 0.5;

const jump = -8;

let isGameOver = false;

let canFlap = true;

function createPipe() {

const pipeGap = 200;

const pipeHeight = Math.random() * 150 + 100;

const upperPipe = document.createElement('div');

upperPipe.classList.add('pipe', 'upper');

upperPipe.style.height = `${pipeHeight}px`;

upperPipe.style.right = '-50px';

const lowerPipe = document.createElement('div');

lowerPipe.classList.add('pipe', 'lower');

lowerPipe.style.height = `${gameBox.offsetHeight - pipeHeight - pipeGap}px`;

lowerPipe.style.right = '-50px';

gameBox.appendChild(upperPipe);

gameBox.appendChild(lowerPipe);

function movePipes() {
    if (isGameOver) return;
    const pipes = document.querySelectorAll('.pipe');

pipes.forEach(pipe => {

const pipeRight = parseInt(pipe.style.right);

if (pipeRight >= gameBox.offsetWidth) {
    pipe.remove();

} else {
    pipe.style.right = `${pipeRight + 2}px`;

const birdRect = bird.getBoundingClientRect();

const pipeRect = pipe.getBoundingClientRect();

if (pipeRight > gameBox.offsetWidth - 100 && pipeRight < gameBox.offsetWidth - 80) {

if (birdRect.top < pipeRect.bottom && birdRect.bottom > pipeRect.top) {
    isGameOver = true;

}

}

}

});

if (!isGameOver) {
    requestAnimationFrame(movePipes);

}

}

requestAnimationFrame(movePipes);

}

function gameLoop() {
    if (isGameOver) return;
    birdVelocity += gravity;
    birdTop += birdVelocity;
    
if (birdTop < 0) {
    birdTop = 0;
    birdVelocity = 0;

} else if (birdTop > gameBox.offsetHeight - bird.offsetHeight) {
    birdTop = gameBox.offsetHeight - bird.offsetHeight;
    birdVelocity = 0;

}

bird.style.top = `${birdTop}px`;

if (!isGameOver) {
    requestAnimationFrame(gameLoop);

} else {
    alert('Game Over');

}

}

function flap() {

if (isGameOver || !canFlap) return;

birdVelocity = jump;
canFlap = false;
setTimeout(() => canFlap = true, 200);

}

document.addEventListener('keydown', (event) => {

if (event.code === 'Space') {

flap();

}

});

upButton.addEventListener('click', () => {

flap();

});

gameBox.addEventListener('touchstart', (event) => {

const touchY = event.touches[0].clientY;
if (touchY < window.innerHeight / 2) {

flap();

}

});

setInterval(createPipe, 2000);

requestAnimationFrame(gameLoop);