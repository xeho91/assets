export interface AssetOptions {
	withColors: boolean;
	altForeground: boolean;
	withBackground: boolean;
	backgroundType: "normal" | "gradient";
	withAnimation: boolean;
	animationDuration?: number;
}

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

export type GradinetDirections = "vertical" | "diagonal" | "horizontal";

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
