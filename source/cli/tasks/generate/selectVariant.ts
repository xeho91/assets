import { info } from "../../utils/log";
import { possibleVariants } from "../../utils/variants";

import type { ContextGenerate, ListrTask, VariantGroup } from "../../types";

function createMessage(fileName: string) {
	const description = [];

	// Foreground
	if (fileName.includes("alternative")) description.push("Alternative");
	else if (fileName.includes("white")) description.push("White");
	else if (fileName.includes("black")) description.push("Black");
	else description.push("Default");

	// Background
	if (fileName.includes("gradient")) description.push("Gradient background");
	else if (fileName.includes("nobg")) description.push("No background");
	else description.push("Normal background");

	return description.join(" | ");
}

interface Choice {
	name: string;
	value: string;
	selected: boolean;
}

function createChoices(group: VariantGroup) {
	return possibleVariants
		.filter((name) => name.includes(group))
		.map((name) => ({ message: createMessage(name), name: name }));
}

export const selectVariant: ListrTask = {
	title: "Selecting the variant(s) to generate... ",
	task: async (context: ContextGenerate, task) => {
		let { variants, animations } = context;

		if (!variants) {
			variants = await task.prompt([{
				type: "select",
				name: "target",
				message: "Which asset variant(s) do you want to generate?",
				choices: [
					{
						message: "All possible variants.",
						name: "all",
					},
					{
						message: "Select from the list of possible variants.",
						name: "selected",
					},
				],
				initial: "selected",
			}]);
		}

		if (variants === "all") {
			context.selectedVariants = possibleVariants;
		} else if (variants === "selected") {
			context.selectedVariants = await task.prompt([{
				type: "multiselect",
				name: "selectedVariants",
				message: "Which one of these variants to generate?",
				choices: [
					// Default - colored
					{
						message:
							"Default - colored (uses orange as foreground - logotype)",
						role: "separator",
					},
					...createChoices("default"),

					// Alternative - colored
					{
						message:
							"Alternative - colored (use violet as foreground - logotype)",
						role: "separator",
					},
					...createChoices("alternative"),

					// White
					{
						message: "White foreground (logotype)",
						role: "separator",
					},
					...createChoices("white"),

					// Black
					{
						message: "Black foreground (logotype)",
						role: "separator",
					},
					...createChoices("black"),
				],
				validate(choices: Choice[]) {
					return choices.find(({ selected }) => !selected)
						? true
						: "Select at least one logo file (with space) to continue.";
				},
			}]);

			task.output = `${info("variants")}:\n- ${
				context.selectedVariants!.join(",\n- ")
			}`;
		}

		task.title += info(variants);

		if (variants === "all") {
			animations = "include";
		} else if (variants === "selected") {
			animations = await task.prompt([{
				type: "select",
				message: "Include the animations for selected variants?",
				name: "animations",
				choices: [
					{
						message: "Generate animated only.",
						name: "only",
					},
					{
						message: "Include animated (generate both).",
						name: "include",
					},
					{
						message: "Exclude animated.",
						name: "exclude",
					},
				],
			}]);
		}

		if (context.selectedVariants && animations !== "exclude") {
			const animatedVariants = context.selectedVariants.map(
				(selection) => {
					return selection += "|animated";
				},
			);

			if (animations === "only") {
				context.selectedVariants = animatedVariants;
			} else if (animations === "include") {
				context.selectedVariants = [
					...context.selectedVariants,
					...animatedVariants,
				].sort();
			}
		}

		// Output a formatted list of selected variants
		task.output = `${info("variants")}:\n- ${
			context.selectedVariants?.join(",\n- ")
		}`;
	},
	options: {
		persistentOutput: true,
	},
};
