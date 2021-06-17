import { info } from "../../utils/log";

import type { ContextGenerate, ListrTask } from "../../types";

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

