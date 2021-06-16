// Rollup plugins
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import shebang from "rollup-plugin-preserve-shebang";
import svelte from "rollup-plugin-svelte";

import { resolve } from "node:path";
import SveltePreprocess from "svelte-preprocess";
import packageJSON from "./package.json";

const __dirname = new URL(".", import.meta.url).pathname;
const rootDir = resolve(__dirname);

const isDevelopment = process.env["ROLLUP_WATCH"];
const isProduction = !process.env["ROLLUP_WATCH"];

/** @param { "cli" | "components" } target */
function getConfig(target) {
	const isCLI = target === "cli";
	const isComponents = target === "components";

	function getInputFilePath() {
		if (isCLI) {
			return "source/cli/index.ts";
		} else if (isComponents) {
			return "source/components/index.ts";
		}
	}

	function getOutputFilePath() {
		if (isCLI) {
			return packageJSON.bin.xeho91;
		} else if (isComponents) {
			return packageJSON.exports;
		}
	}

	/** @type { import("rollup").RollupOptions } */
	const config = {
		input: getInputFilePath(),

		output: [
			{
				name: target,
				file: getOutputFilePath(),
				format: "module",
				exports: "auto",
				sourcemap: isComponents && isProduction,
				compact: isProduction,
			},
		],

		external: isCLI
			&& ["yargs", "listr2", "chalk", "svgo", "fs-extra", "enquirer"],

		plugins: [
			isCLI && shebang({}),
			alias({
				entries: [
					{
						find: "$cli",
						replacement: resolve(rootDir, "./source/cli"),
					},
					{
						find: "$components",
						replacement: resolve(rootDir, "./source/components"),
					},
				],
			}),
			svelte({
				extensions: [".svelte"],
				preprocess: SveltePreprocess({}),
				emitCss: false,
				compilerOptions: {
					dev: true,
					generate: "ssr",
				},
			}),
			esbuild({
				sourceMap: isComponents && isProduction,
				minify: isProduction,
				target: "esnext",
			}),
			nodeResolve({
				extensions: [".js", ".ts", ".d.ts"],
				dedupe: ["svelte"],
			}),
			commonjs({}),
		],
	};

	return config;
}

export default [
	getConfig("cli"),
	getConfig("components")
];
