const gulp = require("gulp");
const runSeq = require("run-sequence");
const tsc = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const merge = require("merge2");
const ssvTools = require("@ssv/tools");

const args = require("../args");
const config = require("../config");

gulp.task("build", (cb) => {
	if (args.isRelease) {
		return runSeq(
			["lint", "compile:ts:all"],
			"copy-dist",
			"bundle:ts",
			cb);
	}
	return runSeq(
		["lint", "compile:ts"],
		cb);
});

gulp.task("rebuild", (cb) => {
	if (args.isRelease) {
		return runSeq(
			"clean",
			"build",
			cb);
	}
	return runSeq(
		"clean:artifact",
		"build",
		cb);
});

gulp.task("ci", (cb) => {
	return runSeq(
		"rebuild",
		"compile:test",
		"test",
		cb);
});

// scripts
gulp.task("compile:ts", ["compile:ts:es2015"]);
gulp.task("compile:ts:all", ["compile:ts:es2015", "compile:ts:umd"]);
gulp.task("compile:ts:es2015", () => compileTs({ module: "es2015" }));
gulp.task("compile:ts:umd", () => compileTs({ module: "amd" }));

gulp.task("bundle:ts", () => ssvTools.rollup({ continueOnError: args.continueOnError }));

function compileTs({ module }) {
	return ssvTools.compileTsc({
		module,
		configPath: "./tsconfig.build.json",
		continueOnError: args.continueOnError
	});
	// const tsProject = tsc.createProject("tsconfig.json", {
	// 	typescript: require("typescript"),
	// 	module
	// 	// outFile: `${config.packageName}.js`
	// });
	// const tsResult = gulp.src([config.src.ts, `!${config.src.testTs}`])
	// 	.pipe(plumber())
	// 	//.pipe(changed(paths.output.dist, { extension: ".js" }))
	// 	.pipe(sourcemaps.init())
	// 	.pipe(tsProject());

	// return merge([
	// 	tsResult.js
	// 		.pipe(sourcemaps.write("."))
	// 		.pipe(gulp.dest(`${config.output.artifact}/${module}`)),
	// 	tsResult.dts
	// 		.pipe(gulp.dest(`${config.output.artifact}/typings`))
	// ]);
}

gulp.task("copy-dist", () => {
	return gulp.src(`${config.output.artifact}/**/*`)
		.pipe(gulp.dest(`${config.output.dist}`));
});