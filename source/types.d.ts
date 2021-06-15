declare module "*.svelte" {
	const value: any;
	export default value;
}

/// <reference types="svelte" />

declare interface AssetOptions {
	withColors: boolean;
	altForeground: boolean;
	withBackground: boolean;
	backgroundType: "normal" | "gradient";
	withAnimation: boolean;
	animationDuration?: number;
}
