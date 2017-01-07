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
			["lint", "compile:ts", "compile:html", "compile:styles"],
			"copy-dist",
			"bundle:ts",
			cb);
	}
	return runSeq(
		["lint", "compile:ts:dev", "compile:html:dev", "compile:styles:dev"],
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

// scripts - compile:ts | compile:ts:dev | compile:ts:TARGET
function compileTs(target) {
	return ssvTools.compileTsc({
		module: target,
		configPath: "./tsconfig.build.json",
		continueOnError: args.continueOnError
	});
}
registerMultiTargetBuilds({
	taskName: "ts",
	action: compileTs
})

gulp.task("bundle:ts", () => ssvTools.rollup({ continueOnError: args.continueOnError }));

// html - compile:html | compile:html:dev | compile:html:TARGET
function compileHtml(target) {
	return gulp.src(config.src.html)
		.pipe(gulp.dest(`${config.output.dist}/${target}`))
}
registerMultiTargetBuilds({
	taskName: "html",
	action: compileHtml
})

// styles - compile:styles | compile:styles:dev | compile:styles:TARGET
function compileStyle(target) {
	return gulp.src(config.src.styles)
		.pipe(gulp.dest(`${config.output.dist}/${target}`));
}
registerMultiTargetBuilds({
	taskName: "styles",
	action: compileStyle
})

gulp.task("copy-dist", () => {
	return gulp.src(`${config.output.artifact}/**/*`)
		.pipe(gulp.dest(`${config.output.dist}`));
});

// todo: refactor to @ssv/tools
function registerMultiTargetBuilds({
	taskName,
	action
}) {
	gulp.task(`compile:${taskName}:dev`, [`compile:html:${config.devTarget}`]);
	gulp.task(`compile:${taskName}`, config.buildTargets.map(x => `compile:${taskName}:${x}`));
	for (let target of config.buildTargets) {
		gulp.task(`compile:${taskName}:${target}`, () => action(target));
	}
}