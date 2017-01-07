const conf = require("./build/config");

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],

		files: [
			"node_modules/systemjs/dist/system.src.js",
			{ pattern: "node_modules/systemjs/dist/system-polyfills.js", included: false, watched: false, served: true }, // PhantomJS2 (and possibly others) might require it

			// vendors
			{ pattern: "node_modules/lodash/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/aurelia-*/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@ssv/**/*", included: false, watched: false, served: true },

			{ pattern: conf.src.ts, included: false, watched: true }, // source files
			{ pattern: conf.test.setup, included: false, watched: true },
			"karma-test-shim.js"
		],
		exclude: [
			"node_modules/**/*_spec.js",
			"node_modules/**/*.spec.js",
		],
		preprocessors: {
			[conf.src.ts]: ["typescript"],
			[conf.test.setup]: ["typescript"],
		},
		typescriptPreprocessor: {
			options: {
				inlineSourceMap: true,
				inlineSources: true,
				emitDecoratorMetadata: true,
				experimentalDecorators: true
			}
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO
	});
};