
import { incrementMoves, showGameOver } from "../script.js";

export function playAudio(src) {
	const audio = new Audio(src);
	audio.play();
}

export function handleMouseEnter(e) {
	e.target.style.transform = "translateY(-4px)";
	e.target.style.boxShadow = "0px 8px 16px 1px rgba(255,51,0,0.5)";
	e.target.style.backgroundColor = "#4d1a00";
}

export function handleMouseLeave(e) {
	e.target.style.transform = "translateY(0px)";
	e.target.style.boxShadow = "0px 4px 8px 1px #000";
	e.target.style.backgroundColor = "#331100";
}

function updateBoxForCompletion(isCompleted) {
	if (isCompleted) {
        playAudio("../assets/sounds/fatality.mp3");
        showGameOver();
	} else {
		playAudio("../assets/sounds/excellent.mp3");
	}
}

function flipCardsBack(firstElement, secondElement) {
	firstElement.querySelector('img').style.transform = "rotateY(180deg)";
    firstElement.querySelector('div').style.transform = "rotateY(0deg)";
	secondElement.querySelector('img').style.transform = "rotateY(180deg)";
    secondElement.querySelector('div').style.transform = "rotateY(0deg)";
}

export function handleClick(e, result, avatar, img, box, backFace) {
	if (result.length === 2 || result.find((val) => val.id === avatar.id)) return;

	const boxItems = Array.from(document.getElementsByClassName("box__item"));
	playAudio(avatar.audioSrc);

	img.style.transform = "rotateY(0deg)";
    backFace.style.transform = "rotateY(180deg)";
	result.push(avatar);

	if (result.length === 2) {
        incrementMoves();
		if (result[0].name === result[1].name) {
			const firstElement = boxItems.find((item) => item.dataset.id === result[0].id);
			const secondElement = boxItems.find((item) => item.dataset.id === result[1].id);

			firstElement.style.pointerEvents = "none";
			secondElement.style.pointerEvents = "none";

			setTimeout(() => {
				firstElement.style.visibility = "hidden";
				secondElement.style.visibility = "hidden";
			}, 900);

			setTimeout(() => {
				const isCompleted = boxItems.every((item) => item.style.visibility === "hidden");
				updateBoxForCompletion(isCompleted);
				result.length = 0;
			}, 980);
		} else {
			const firstElement = boxItems.find((item) => item.dataset.id === result[0].id);
			const secondElement = boxItems.find((item) => item.dataset.id === result[1].id);

			setTimeout(() => {
				flipCardsBack(firstElement, secondElement);
				result.length = 0;
			}, 560);
		}
	}
}

