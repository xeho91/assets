import path from "path";
import SveltePreprocess from "svelte-preprocess";
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

	ignoreWarnings: [
		// Ignore warnings due to yargs dynamic module loading
		{ module: /node_modules\/yargs/ },
		{ module: /node_modules\/svgo/ },
	],

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "typescript",
								tsx: false,
								dynamicImport: true,
								decorators: true,
								importAssertions: true,
							},

							target: "es2020",
							loose: true,
							externalHelpers: true,
							keepClassNames: true,
						},

						module: {
							type: "commonjs",
							strict: true,
							strictMode: true,
							lazy: false,
						},

						minify: isProduction,
						sourceMaps: false,
					},
				},
			},
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: "svelte-loader",
					options: {
						preprocess: SveltePreprocess({}),
						emitCss: false,
						compilerOptions: {
							generate: "ssr",
						},
					},
				},
			},
		],
	},

	plugins: [
		new ShebangPlugin(),
	],
};
