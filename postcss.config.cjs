// const path = require("path");

// https://github.com/postcss/postcss
module.exports = {
	plugins: [
		// https://github.com/postcss/postcss-mixins
		// require("postcss-mixins")({
		// 	mixinsDir: path.join(__dirname, "src/styles/library"),
		// }),

		// https://github.com/postcss/postcss-size
		require("postcss-size"),

		// https://github.com/csstools/postcss-preset-env
		require("postcss-preset-env")({
			stage: 1,
			features: {
				// https://preset-env.cssdb.org/features
			},
		}),

		// https://github.com/postcss/autoprefixer
		require("autoprefixer"),

		// https://github.com/postcss/postcss-reporter
		require("postcss-reporter")({ clearReportedMessages: true })
	],
};
