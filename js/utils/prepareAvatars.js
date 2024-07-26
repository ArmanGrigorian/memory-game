function getRandomPositions(avatars) {
	const positions = [];
	const usedIds = new Set();

	while (positions.length < avatars.length) {
		const randomIndex = Math.floor(Math.random() * avatars.length);
		const avatar = avatars[randomIndex];

		if (!usedIds.has(avatar.id)) {
			positions.push(avatar);
			usedIds.add(avatar.id);
		}
	}

	return positions;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

export default function prepareAvatars(avatars) {
	let id = 0;
	const shuffledAvatars = shuffle([...getRandomPositions(avatars), ...getRandomPositions(avatars)]);

	return shuffledAvatars.map((avatar) => ({
		...avatar,
		id: (++id).toString(),
	}));
}
