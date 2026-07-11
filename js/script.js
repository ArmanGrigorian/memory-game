import { avatars } from "./data.js";
import { createBox, createBoxItem, handleClick, prepareAvatars } from "./utils/index.js";

export const gameState = {
    moves: 0,
    timeElapsed: 0,
    timerInterval: null,
    isGameStarted: false
};

const timeDisplay = document.getElementById("timeDisplay");
const movesDisplay = document.getElementById("movesDisplay");
const gameBoardContainer = document.getElementById("gameBoardContainer");
const gameOverModal = document.getElementById("gameOverModal");
const restartBtn = document.getElementById("restartBtn");
const finalTime = document.getElementById("finalTime");
const finalMoves = document.getElementById("finalMoves");

export function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

export function startTimer() {
    if (gameState.isGameStarted) return;
    gameState.isGameStarted = true;
    gameState.timerInterval = setInterval(() => {
        gameState.timeElapsed++;
        timeDisplay.textContent = formatTime(gameState.timeElapsed);
    }, 1000);
}

export function stopTimer() {
    clearInterval(gameState.timerInterval);
    gameState.isGameStarted = false;
}

export function incrementMoves() {
    gameState.moves++;
    movesDisplay.textContent = gameState.moves;
}

export function showGameOver() {
    stopTimer();
    finalTime.textContent = formatTime(gameState.timeElapsed);
    finalMoves.textContent = gameState.moves;
    gameOverModal.classList.remove("hidden");
}

function initGame(avatars) {
	const box = createBox();
	const readyAvatars = prepareAvatars(avatars);
	const result = [];
	const fragment = new DocumentFragment();

	readyAvatars.forEach((avatar) => {
		const { boxItem, img, backFace } = createBoxItem(avatar);

		boxItem.addEventListener("click", (e) => {
            startTimer();
            handleClick(e, result, avatar, img, box, backFace);
        });

		boxItem.append(img);
		fragment.append(boxItem);
	});

	box.append(fragment);
    
  gameBoardContainer.innerHTML = '';
	gameBoardContainer.append(box);
}

function resetGame() {
    stopTimer();
    gameState.moves = 0;
    gameState.timeElapsed = 0;
    timeDisplay.textContent = "00:00";
    movesDisplay.textContent = "0";
    gameOverModal.classList.add("hidden");
    initGame(avatars);
}

restartBtn.addEventListener("click", resetGame);

document.addEventListener("DOMContentLoaded", () => initGame(avatars));
