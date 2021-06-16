import { generateSVG } from "$cli/tasks/generate/generateSVG";
import { optimizeSVG } from "$cli/tasks/generate/optimizeSVG";
import { saveSVG } from "$cli/tasks/generate/saveSVG";
import { selectAsset } from "$cli/tasks/generate/selectAsset";
import { selectVariant } from "$cli/tasks/generate/selectVariant";
import { Listr } from "listr2";

import type { CommandModule } from "yargs";

interface Results {
	variant: string;
	svg: string;
}

export type Asset = "avatar" | "logo";
const assets: ReadonlyArray<Asset> = ["avatar", "logo"];

export interface ContextGenerate {
	outputDir?: string;
	target?: Asset;
	variants?: "all" | "selected";
	selectedVariants?: string[];
	animations?: "only" | "include" | "exclude";
	results?: Results[];
}

export const cmdGenerate: CommandModule = {
	command: "generate [asset]",

	describe: "Generate a SVG file(s) for the avatar or logo.",

	builder(yargs) {
		return yargs
			.showHelpOnFail(false)
			.help()
			.example([
				[
					"generate avatar --output ./dist/svg/xeho91-avatar.svg",
					"Generate avatar SVG file to the specified ouput filename.",
				],
				[
					"generate logo --output ./dist/svg/xeho91-logo.svg",
					"Generate logo SVG file to the specified ouput filename.",
				],
			])
			.options({
				"all": {
					alias: "a",
					describe: "Generate all possible variants.",
					type: "boolean",
					default: undefined,
				},

				"output": {
					alias: "o",
					describe: "Specify the output directory path.",
					type: "string",
					default: undefined,
				},
			})
			.choices("asset", assets);
	},

	async handler(argv) {
		const { all, output, asset } = argv;
		const context: ContextGenerate = {
			target: (asset as Asset) ?? undefined,
			variants: all ? "all" : undefined,
			outputDir: (output as string) ?? undefined,
		};
		const tasks = new Listr<ContextGenerate>([
			selectAsset,
			selectVariant,
			generateSVG,
			optimizeSVG,
			saveSVG,
		], {
			ctx: context,
			concurrent: false,
		});

		await tasks.run();
	},
};
