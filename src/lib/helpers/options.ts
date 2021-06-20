import type {
	ComponentOptions,
	OptionsAnimation,
	OptionsShadow,
} from "../types";

export const optionsColor = [
	"default",
	"alternative",
	"black",
	"white",
] as const;

export const optionsBackground = ["none", "normal", "gradient"] as const;

const optionsShadow: OptionsShadow = {
	offset: { x: 0, y: 0 },
	blur: 8,
};

const optionsAnimation: OptionsAnimation = {
	duration: 3000,
};

export const optionsDefault: ComponentOptions = {
	color: optionsColor[0],
	background: optionsBackground[0],
	shadow: optionsShadow,
	animation: optionsAnimation,
};
