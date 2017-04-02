const gulp = require("gulp");
const ssvTools = require("@ssv/tools");

const args = require("../args");

gulp.task("lint", () => ssvTools.lintTs({
	fix: args.fix
}));