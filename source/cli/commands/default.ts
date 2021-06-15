// import { cmdExport } from "$cli/commands/export";
import { cmdGenerate } from "$cli/commands/generate";
import { info } from "$cli/utils/log";
import { Listr } from "listr2";
import yargs from "yargs";

import type { CommandModule } from "yargs";

export const cmdDefault: CommandModule = {
	command: "$0",

	async handler() {
		const tasks = new Listr([{
			task: async (_, task) => {
				const command = await task.prompt({
					type: "select",
					message: "What do you want to do?",
					choices: [
						{
							message: "Generate a SVG file with the logo.",
							name: "generate",
						},
						// {
						// 	message:
						// 		"Export generated SVG logo file(s) to PNG format.",
						// 	name: "export",
						// },
						{
							message: "Do nothing.",
							name: "quit",
						},
					],
				});

				if (command === "quit") {
					process.exit(0);
				} else {
					task.output = `Executing the command: "${info(command)}".`;
				}

				yargs
					.command(cmdGenerate)
					// .command(cmdExport)
					.parse([command]);
			},
			options: {
				persistentOutput: true,
			},
		}]);

		await tasks.run();
	},
};
