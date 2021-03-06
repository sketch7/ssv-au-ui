const path = require("path");
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const outputRoot = "./dist";
const srcRoot = "src";

module.exports = {
	output: {
		dist: outputRoot,
		artifact: "./_artifact",
		sass: `${outputRoot}/sass/${pkg.name}`,
	},
	src: {
		root: srcRoot,
		ts: `./${srcRoot}/**/*.ts`,
		testTs: `./${srcRoot}/**/*.spec.ts`,
		karmaConfig: "karma.conf.js",
		html: `./${srcRoot}/**/*.html`,
		styles: `./${srcRoot}/**/*.scss`,
	},
	test: {
		reporters: ["mocha"],
		browsers: ["Chrome"],
		setup: "test/test-setup.ts"
	},
	buildTargets: [
		"es2015",
		"umd"
	],
	devTarget: "umd",
	doc: "./doc",
	packageName: pkg.name
};