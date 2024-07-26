import { handleMouseEnter, handleMouseLeave } from "./index.js";

export function createBox() {
  const box = document.createElement("div");
  
  box.classList.add("box");

	box.style.cssText = `
		position: absolute;
    inset: 0;
    margin: auto;
		border: 1px solid black;
		width: min(640px, 96%);
		aspect-ratio: 1;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0px 4px 16px 2px rgba(48,48,48, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 16px;
		background-image: url('../assets/images/logo.gif');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	`;

	return box;
}

export function createBoxItem(avatar) {
	const boxItem = document.createElement("div");
	const img = new Image();

	boxItem.classList.add("box__item");
	boxItem.setAttribute("data-id", avatar.id);

	boxItem.style.cssText = `
	user-select: none;
	cursor: pointer;
	width: calc(25% - 12px);
	border-radius: 4px;
	background-color: rgb(240, 240, 240);
	padding: 8px;
	border: none;
	box-shadow: 0px 4px 8px 1px rgb(48,48,48);
	transition: transform 240ms linear, box-shadow 240ms linear, background-color 240ms linear;
	`;

	img.src = avatar.imgSrc;
	img.alt = `${avatar.name} avatar png`;

	img.style.cssText = `
		display: block;
		width: 100%;
		object-fit: contain;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: transform 160ms linear;
	`;

	boxItem.addEventListener("mouseenter", handleMouseEnter);
	boxItem.addEventListener("mouseleave", handleMouseLeave);

	return { boxItem, img };
}
