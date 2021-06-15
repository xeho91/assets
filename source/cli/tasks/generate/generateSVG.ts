import { error, success } from "$cli/utils/log";
import Avatar from "$components/Avatar.svelte";
import Logo from "$components/Logo.svelte";

import type { ListrTask } from "listr2";
import type { ContextGenerate } from "$cli/commands/generate";
import type { SvelteComponentTyped } from "svelte/internal";

function getOptions(variant: string): AssetOptions {
	return {
		withColors: !variant.includes("white") && !variant.includes("black"),
		altForeground: variant.includes("alt") || variant.includes("white"),
		withBackground: !variant.includes("nobg"),
		backgroundType: variant.includes("gradient") ? "gradient" : "normal",
		withAnimation: variant.includes("animated"),
	};
}

export const generateSVG: ListrTask = {
	title: "Generating the SVG logo(s)... ",
	task: (context: ContextGenerate, task) => {
		const { target } = context;
		let component: SvelteComponentTyped;

		if (target === "avatar") {
			component = Avatar;
		} else if (target === "logo") {
			component = Logo;
		}

		if (context.selectedVariants) {
			context.results = context.selectedVariants.map((variant) => {
				const options = getOptions(variant);
				const { html } = component.render({ options });

				return { variant, svg: html };
			});
			task.title += success("done");
		} else {
			task.title += error("failed");
			throw new Error(error("Selected variants are empty!"));
		}
	},
	options: {
		persistentOutput: true,
	},
};
