import sveltePreprocess from "svelte-preprocess";
import postcssConfig from "./postcss.config.cjs";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development;"

/** @type {import("@sveltejs/kit").Config} */
const config = {
	compilerOptions: {
		dev: isDev,
		format: "esm",
		generate: "ssr",
		hydratable: true,
	},

	preprocess: [
		sveltePreprocess({
			postcss: postcssConfig,
		}),
	],

	kit: {
		target: "#svelte",
		hydrate: true,
		prerender: {
			crawl: true,
			force: true,
			enabled: true,
		},
		ssr: true,

		vite: {
			build: {
				target: "esnext",
				minify: "esbuild",
				brotliSize: true,
			},
		},
	},
};

export default config;
