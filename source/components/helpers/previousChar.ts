import { chars } from "$components/helpers/paths";

export interface PreviousChar {
	name: string;
	lastPath: string;
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
