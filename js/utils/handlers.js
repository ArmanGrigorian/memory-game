
export function playAudio(src) {
	const audio = new Audio(src);
	audio.play();
}

export function handleMouseEnter(e) {
	e.target.style.transform = "translateY(-4px)";
	e.target.style.boxShadow = "0px 8px 16px 1px rgb(240,240,240)";
	e.target.style.backgroundColor = "rgb(16, 16, 16)";
}

export function handleMouseLeave(e) {
	e.target.style.transform = "translateY(0px)";
	e.target.style.boxShadow = "0px 4px 8px 1px rgb(48,48,48)";
	e.target.style.backgroundColor = "rgb(240, 240, 240)";
}

function updateBoxForCompletion(box, isCompleted) {
	if (isCompleted) {
		box.textContent = "Fatality";
		box.style.color = "rgb(128, 0, 0)";
		box.style.fontSize = "64px";
    box.style.letterSpacing = "4px";
    playAudio("../assets/sounds/fatality.mp3");
	} else {
		playAudio("../assets/sounds/excellent.mp3");
	}
}

function flipCardsBack(firstElement, secondElement) {
	firstElement.firstElementChild.style.transform = "rotateY(180deg)";
	secondElement.firstElementChild.style.transform = "rotateY(180deg)";
}

export function handleClick(e, result, avatar, img, box) {
	if (result.length === 2 || result.find((val) => val.id === avatar.id)) return;

	const boxItems = Array.from(document.getElementsByClassName("box__item"));
	playAudio(avatar.audioSrc);

	img.style.transform = "rotateY(0deg)";
	result.push(avatar);

	if (result.length === 2) {
		if (result[0].name === result[1].name) {
			boxItems.forEach((item) => {
				if (item.dataset.id === result[0].id || item.dataset.id === result[1].id) {
					setTimeout(() => {
						item.style.visibility = "hidden";
					}, 900);

					setTimeout(() => {
						const isCompleted = boxItems.every((item) => item.style.visibility === "hidden");
						updateBoxForCompletion(box, isCompleted);
					}, 980);
				}
			});
			result.length = 0;
		} else {
			const firstElement = boxItems.find((item) => item.dataset.id === result[0].id);
			const secondElement = boxItems.findLast((item) => item.dataset.id === result[1].id);

			setTimeout(() => {
				flipCardsBack(firstElement, secondElement);
				result.length = 0;
			}, 560);
		}
	}
}

