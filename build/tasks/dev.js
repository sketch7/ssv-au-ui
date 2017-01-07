const gulp = require("gulp");
const util = require("gulp-util");
const runSeq = require("run-sequence");

const args = require("../args");
const config = require("../config");

gulp.task("watch", () => {
	args.continueOnError = true;
	// ts
	gulp.watch([config.src.ts, `!${config.src.testTs}`], () => {
		if (args.isRelease) {
			return runSeq(
				"compile:ts:dev",
				"copy-dist"
			);
		} else {
			return runSeq(
				"compile:ts:dev"
			);
		}
	}).on("change", reportChange)
		.on("error", swallowError);

	// html
	gulp.watch([config.src.html], () => {
		if (args.isRelease) {
			return runSeq(
				"compile:html:dev",
				"copy-dist"
			);
		} else {
			return runSeq(
				"compile:html:dev"
			);
		}
	}).on("change", reportChange)
		.on("error", swallowError);

	// styles
	gulp.watch([config.src.styles], () => {
		if (args.isRelease) {
			return runSeq(
				"compile:styles:dev",
				"copy-dist"
			);
		} else {
			return runSeq(
				"compile:styles:dev"
			);
		}
	}).on("change", reportChange)
		.on("error", swallowError);

});

function reportChange(event) {
	console.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	console.log(util.colors.red("Error occurred while running watched task..."));
}