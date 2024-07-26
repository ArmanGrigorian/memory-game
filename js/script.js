import { avatars } from "./data.js";
import { createBox, createBoxItem, handleClick, prepareAvatars } from "./utils/index.js";


function initGame(avatars) {
	const box = createBox();
	const readyAvatars = prepareAvatars(avatars);
	const result = [];
	const fragment = new DocumentFragment();

	readyAvatars.forEach((avatar) => {
		const { boxItem, img } = createBoxItem(avatar);

		boxItem.addEventListener("click", (e) => handleClick(e, result, avatar, img, box));

		boxItem.append(img);
		fragment.append(boxItem);
	});

	box.append(fragment);
	document.body.append(box);
}

document.addEventListener("DOMContentLoaded", () => initGame(avatars));
