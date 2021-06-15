import { info } from "$cli/utils/log";

import type { ListrTask } from "listr2";
import type { ContextGenerate } from "$cli/commands/generate";

export const selectAsset: ListrTask = {
	title: "Selecting the asset to generate... ",
	task: async (context: ContextGenerate, task) => {
		if (!context.target) {
			context.target = await task.prompt([{
				type: "select",
				name: "target",
				message: "Which asset do you want to generate?",
				choices: [
					{ message: "Avatar.", name: "avatar" },
					{ message: "Logo.", name: "logo" },
				],
			}]);
		}

		task.title += info(context.target);
	},
	options: {
		persistentOutput: true,
	},
};

