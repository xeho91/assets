import { optionsBackground, optionsBackground } from "./helpers";

export interface OptionsAnimation {
	duration: number;
}
export type OptionsBackground = typeof optionsBackground[number];
export type OptionsColor = typeof optionsColor[number];
export interface OptionsShadow {
	offset: { x: number, y: number };
	blur: number;
}

export interface ComponentOptions {
	color:  OptionsColor
	background: OptionsBackground;
	shadow: OptionsShadow;
	animation?: OptionsAnimation;
}

export type GradientDirection = "vertical" | "diagonal" | "horizontal";

export type PositionX = "left" | "middle" | "right";
export type PositionY = "bottom" | "center" | "top";
export type Position = [PositionX, PositionY];

export interface PathData {
	d: string;
	from: Position;
	to: Position;
}
export type CharData = { [partName: string]: PathData };
export type Chars = { [charName: string]: CharData };
export interface PreviousChar {
	name: string;
	lastPath: string;
}
export interface Color {
	hex: string;
	hexa: string;

	HSL: {
		hue: number;
		saturation: number;
		lightness: number;
	};

	RGB: {
		red: number;
		green: number;
		blue: number;
	};

	alpha: number;

	polarity: "dark" | "light";
}
