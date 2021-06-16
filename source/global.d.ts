declare module "*.svelte" {
  const options: any;
  export default value;
}

declare interface AssetOptions {
	withColors: boolean;
	altForeground: boolean;
	withBackground: boolean;
	backgroundType: "normal" | "gradient";
	withAnimation: boolean;
	animationDuration?: number;
}
