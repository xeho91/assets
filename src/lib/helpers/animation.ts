import { chars } from "./chars";

import type { AnimationsOptions, PreviousChar } from "../types";

function getCharactersCount() {
	return Object.keys(chars).reduce((accumulator, currentValue) => {
		return accumulator + Object.values(chars[currentValue]).length;
	}, 0);
}

export function getCharAnimationDuration(
	duration: AnimationsOptions["duration"],
) {
	return duration / getCharactersCount();
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
