const gulp = require("gulp");
const ssvTools = require("@ssv/tools");

const args = require("../args");

gulp.task("lint", ["lint:ts", "lint:sass", "lint:html"]);

gulp.task("lint:ts", () => ssvTools.lintTs({
	fix: args.fix
}));

gulp.task("lint:sass", () => ssvTools.lintSass({
	fix: args.fix
}));

gulp.task("lint:html", ssvTools.lintHtml);