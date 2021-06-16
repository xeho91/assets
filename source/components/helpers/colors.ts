import type { Color } from "@xeho91/colors/source/cli/types";

import colors from "@xeho91/colors/dist/colors.json";

/** Returns a string with CSS color using HSLA format, e.g. "hsla(0deg, 0%, 0%, 1)" */
function getHSLA(colorData: Color) {
	const { alpha } = colorData;
	const { hue, saturation, lightness } = colorData.HSL;
	const hsla = `hsla(${hue}deg, ${saturation}%, ${lightness}%, ${alpha})`;

	return hsla;
}

const clairvoyant = getHSLA(colors.brand.clairvoyant);
const terracotta = getHSLA(colors.brand.terracotta);
const kilamanjaro = getHSLA(colors.supplementary.kilamanjaro);
const black = "hsla(0deg, 0% , 0%, 1)";
const white = "hsla(0deg, 0% , 100%, 1)";

/** Get an array of strings with CSS hsla color codes for the gradient */
export function getGradient({ altForeground }: AssetOptions) {
	const gradientColors = [
		clairvoyant,
		...Object.values(colors.gradient).map((color) => getHSLA(color)),
		terracotta,
	];

	return altForeground ? gradientColors.reverse() : gradientColors;
}

/** Get a CSS hsla color code for foreground color based on asset options */
export function getColorForeground({ withColors, altForeground }: AssetOptions) {
	if (withColors) {
		if (altForeground) {
			return clairvoyant;
		} else {
			return terracotta;
		}
	} else {
		if (altForeground) {
			return white;
		} else {
			return black;
		}
	}
}

/** Get a CSS hsla color code string for the background color or a gradient url */
export function getColorBackground(
	id: string,
	{ withColors, altForeground, backgroundType }: AssetOptions,
) {
	if (withColors) {
		if (backgroundType === "gradient") {
			return `url(#${id}_gradient)`;
		} else if (backgroundType === "normal") {
			if (altForeground) {
				return terracotta;
			} else {
				return clairvoyant;
			}
		}
	} else {
		if (altForeground) {
			return black;
		} else {
			return white;
		}
	}
}

/** Get a CSS hsla color code for shadow color based on asset options */
export function getColorShadow({ withColors }: AssetOptions) {
	if (withColors) {
		return kilamanjaro;
	} else {
		return black;
	}
}
