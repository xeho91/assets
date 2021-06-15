import path from "path";
import TSconfigPaths from "tsconfig-paths-webpack-plugin";
import ShebangPlugin from "webpack-shebang-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

const isProduction = process.env["NODE_ENV"] === "production";

export default {
	mode: process.env["NODE_ENV"],
	target: "node16.0",

	entry: path.join(__dirname, "./source/cli/index.ts"),
	output: {
		path: path.join(__dirname, "./bin"),
		filename: "cli.cjs",
	},

	resolve: {
		extensions: [".js", ".ts", ".json"],
		plugins: [new TSconfigPaths()],
	},


	module: {
		rules: [
		],
	},

	plugins: [
		new ShebangPlugin(),
	],
};
