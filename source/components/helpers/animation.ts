import { chars } from "$components/helpers/paths";

function getCharactersCount() {
	let count = 0;

	Object.keys(chars).forEach((charName) => {
		count += Object.values(chars[charName]).length;
	});

	return count;
}

export function getDuration({ animationDuration }: AssetOptions) {
	animationDuration = animationDuration ?? 3000;

	return animationDuration / getCharactersCount();
}
