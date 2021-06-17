import { generateSVG } from "../tasks/generate/generateSVG";
import { optimizeSVG } from "../tasks/generate/optimizeSVG";
import { saveSVG } from "../tasks/generate/saveSVG";
import { selectAsset } from "../tasks/generate/selectAsset";
import { selectVariant } from "../tasks/generate/selectVariant";
import { Listr } from "listr2";

import type {
	Asset,
	CommandModule,
	ContextGenerate
} from "../types";

const assets: ReadonlyArray<Asset> = ["avatar", "logo"];

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
