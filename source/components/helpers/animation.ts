import { chars } from "../helpers/paths";

import type { AssetOptions, PreviousChar } from "../types";

function getCharactersCount() {
	return Object.keys(chars).reduce((accumulator, currentValue) => {
		return accumulator + Object.values(chars[currentValue]).length;
	}, 0);
}

export function getDuration({ animationDuration }: AssetOptions) {
	const totalDuration = animationDuration ?? 3000;

	return totalDuration / getCharactersCount();
}



export function getPreviousChar(index: number) {
	if (index === 0) {
		return null;
	} else {
		const name = Object.keys(chars)[index - 1];
		const paths = Object.keys(chars[name]);
		const lastPath = paths[paths.length - 1];

		return { name, lastPath } as PreviousChar;
	}
}
