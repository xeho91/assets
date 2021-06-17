import { error, info, success } from "../../utils/log";
import fsExtra from "fs-extra";
import { join } from "path";

import type { Asset, ContextGenerate, ListrTask } from "../../types";

const { outputFileSync } = fsExtra;

function createFileName(asset: Asset, variant: string) {
	const fileName = variant
		.replace("default", "")
		.replace("alternative", ".alt")
		.replace("black", ".black")
		.replace("white", ".white")
		.replace("|animated", ".animated")
		.replace("|nobg", ".nobg")
		.replace("|gradient", ".gradient");

	return `xeho91-${asset}${fileName}.svg`;
}

export const saveSVG: ListrTask = {
	title: "Saving the output... ",
	task: async (context: ContextGenerate, task) => {
		let { outputDir } = context;
		const { target, results } = context;

		if (!outputDir) {
			outputDir = await task.prompt([{
				type: "input",
				name: "outputDir",
				message: "Where do you want to save the SVG output?",
				initial: `./dist/${target}/svg`,
				default: `./dist/${target}/svg`,
			}]);
		}

		outputDir = join(process.cwd(), outputDir!);

		if (results) {
			results.forEach(({ svg, variant }) => {
				if (target) {
					const outputFilePath = join(
						outputDir!,
						createFileName(target, variant),
					);

					outputFileSync(outputFilePath, svg);
				} else {
					throw new Error(error("Target not specified!"));
				}
			});
			task.title += success("done");
		} else {
			task.title += error("failed");
			throw new Error(error("Results are empty!"));
		}

		task.output = `Saved ${target} SVG files to: ${
			info(`file://${outputDir}`)
		}`;
	},
	options: {
		persistentOutput: true,
	},
};
