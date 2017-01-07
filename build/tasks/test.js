const gulp = require("gulp");
const gutil = require("gulp-util");
const Karma = require("karma").Server;
const path = require("path");
const tsc = require("gulp-typescript");
const plumber = require("gulp-plumber");

const config = require("../config");
var args = require("../args");

gulp.task("test", (cb) => {
	runTests(true, cb);
});

gulp.task("tdd", ["compile:test"], (cb) => {
	runTests(false, cb);
});

function runTests(singleRun, cb) {
	gutil.log(gutil.colors.cyan(`Launching Karma... Reporters '${args.reporters}' ; Browsers '${args.browsers}'`));
	new Karma({
		configFile: path.join(__dirname, `../../${config.src.karmaConfig}`),
		singleRun: singleRun,
		autoWatch: !singleRun,
		reporters: args.reporters,
		browsers: args.browsers
	}, (code) => {

		// make sure failed karma tests cause gulp to exit non-zero
		if (code === 1) {
			gutil.log(gutil.colors.red("------- Error: unit test failed -------"));
			return process.exit(1);
		}
		cb();
	}).start();
}

gulp.task("compile:test", () => {
	const tsProject = tsc.createProject("tsconfig.json", {
		typescript: require("typescript")
	});
	const tsResult = gulp.src([config.src.testTs])
		.pipe(plumber())
		.pipe(tsProject());

	return tsResult.js;
});