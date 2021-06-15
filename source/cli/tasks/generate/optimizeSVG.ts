import { error, success } from "$cli/utils/log";
import { optimize } from "svgo";

import type { ContextGenerate } from "$cli/commands/generate";
import type { ListrTask } from "listr2";
import type { OptimizeOptions } from "svgo";

export const optimizeSVG: ListrTask = {
	title: "Optimizing the SVG output(s)... ",
	task: async (context: ContextGenerate, task) => {
		const config: OptimizeOptions = {
			plugins: [
				{
					name: "removeUnknownsAndDefaults",
					active: false,
				},
				{
					name: "cleanupIDs",
					active: false,
				},
				{
					name: "cleanupNumericValues",
					params: { leadingZero: false },
				},
				{
					name: "convertShapeToPath",
					active: false,
				},
			],
		};

		if (context.results) {
			context.results = context.results.map(({ variant, svg }) => {
				return { variant, svg: optimize(svg, config).data };
			});
			task.title += success("done");
		} else {
			task.title += error("failed");
			throw new Error(error("Outputs are empty!"));
		}
	},
	options: {
		persistentOutput: true,
	},
};
