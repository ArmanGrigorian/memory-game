import { handleMouseEnter, handleMouseLeave } from "./index.js";

export function createBox() {
  const box = document.createElement("div");
  
  box.classList.add("box");

	box.style.cssText = `
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 2px solid #ff3300;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0px 0px 20px rgba(255,51,0, 0.4);
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
    height: calc(25% - 12px);
	border-radius: 6px;
	background-color: #331100;
	padding: 8px;
	border: 2px solid #ff3300;
	box-shadow: 0px 4px 8px 1px #000;
	transition: transform 240ms linear, box-shadow 240ms linear, background-color 240ms linear;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform-style: preserve-3d;
	`;

	img.src = avatar.imgSrc;
	img.alt = `${avatar.name} avatar png`;

	img.style.cssText = `
		display: block;
		width: 100%;
        height: 100%;
		object-fit: contain;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: transform 160ms linear;
        position: absolute;
	`;

    const backFace = document.createElement("div");
    backFace.textContent = "MK";
    backFace.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        color: #ff3300;
        backface-visibility: hidden;
        transition: transform 160ms linear;
    `;

	boxItem.addEventListener("mouseenter", handleMouseEnter);
	boxItem.addEventListener("mouseleave", handleMouseLeave);

    boxItem.append(backFace);
	return { boxItem, img, backFace };
}
