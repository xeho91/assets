import colorsData from "@xeho91/colors/dist/colors.json";

import type { Color, ComponentOptions } from "../types";

/** Returns a string with CSS color using HSLA format, e.g. "hsla(0deg, 0%, 0%, 1)" */
function getHSLA(colorData: Color) {
	const { alpha } = colorData;
	const { hue, saturation, lightness } = colorData.HSL;
	const hsla = `hsla(${hue}deg, ${saturation}%, ${lightness}%, ${alpha})`;

	return hsla;
}

/** Object with strings containing CSS HSLA format for each color */
const HSLA = {
	clairvoyant: getHSLA(colorsData.brand.clairvoyant as Color),
	terracotta: getHSLA(colorsData.brand.terracotta as Color),
	kilamanjaro: getHSLA(colorsData.supplementary.kilamanjaro as Color),
	black: "hsla(0deg, 0% , 0%, 1)",
	white: "hsla(0deg, 0% , 100%, 1)",
};

/** Get an array of strings with CSS hsla color codes for the gradient */
export function getGradient(color: ComponentOptions["color"]) {
	const gradientColors = [
		HSLA.clairvoyant,
		...Object.values(colorsData.gradient).map((color) =>
			getHSLA(color as Color)
		),
		HSLA.terracotta,
	];

	return color === "alternative" ? gradientColors.reverse() : gradientColors;
}

/** Get a CSS hsla color code for foreground color based on asset options */
export function getColorForeground(color: ComponentOptions["color"]) {
	switch (color) {
		case "default":
			return HSLA.terracotta;
		case "alternative":
			return HSLA.clairvoyant;
		case "white":
			return HSLA.white;
		case "black":
			return HSLA.black;

		default:
			throw new Error(`Unknown color option: "${color}".`);
	}
}

/** Get a CSS hsla color code string for the background color or a gradient url */
export function getColorBackground(
	background: ComponentOptions["background"],
	color: ComponentOptions["color"],
	id: string,
) {
	switch (background) {
		case "gradient": {
			if (color === "default" || color === "alternative") {
				return `url(#${id}_gradient)`;
			} else {
				throw new Error(
					`You can't set a background: "gradient", when color option is neither "default" or "alternative".`,
				);
			}
		}

		case "normal": {
			if (color === "default") {
				return HSLA.clairvoyant;
			} else if (color === "alternative") {
				return HSLA.terracotta;
			} else if (color === "white") {
				return HSLA.black;
			} else if (color === "black") {
				return HSLA.white;
			} else {
				throw new Error(
					`Background can't be set because of the unkown "color" option.`,
				);
			}
		}

		case "none":
			return undefined;

		default:
			console.error(`Unknown background option: "${background}".`);
			return undefined;
	}
}

/** Get a CSS hsla color code for shadow color based on asset options */
export function getColorShadow(color: ComponentOptions["color"] = "default") {
	if (color === "default" || color === "alternative") {
		return HSLA.kilamanjaro;
	} else {
		return HSLA.black;
	}
}

export function getShadow(options: ComponentOptions["shadow"]) {
	const { offset, blur } = options;

	return `drop-shadow(${offset.x} ${offset.y} ${blur}px ${getColorShadow()})`;
}
