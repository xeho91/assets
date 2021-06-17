export type { SvelteComponentTyped } from "svelte/internal";
export type { ListrTask } from "listr2";
export type { OptimizeOptions } from "svgo";
export type { CommandModule } from "yargs";
export type { AssetOptions } from "../components/types";

export interface Results {
	variant: string;
	svg: string;
}

export type Asset = "avatar" | "logo";

export interface ContextGenerate {
	outputDir?: string;
	target?: Asset;
	variants?: "all" | "selected";
	selectedVariants?: string[];
	animations?: "only" | "include" | "exclude";
	results?: Results[];
}

export type VariantGroup = "default" | "alternative" | "white" | "black";
