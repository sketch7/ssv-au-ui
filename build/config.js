const path = require("path");
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const srcRoot = "src";

module.exports = {
	output: {
		dist: "./dist",
		artifact: "./_artifact",
	},
	src: {
		root: srcRoot,
		ts: `./${srcRoot}/**/*.ts`,
		testTs: `./${srcRoot}/**/*.spec.ts`,
		karmaConfig: "karma.conf.js",
		html: `./${srcRoot}/**/*.html`,
		styles: `./${srcRoot}/**/*.css`,
	},
	test: {
		reporters: ["mocha"],
		browsers: ["Chrome"],
		setup: "test/test-setup.ts"
	},
	buildTargets: [
		"es2015",
		"amd",
		"umd"
	],
	devTarget: "amd",
	doc: "./doc",
	packageName: pkg.name
};