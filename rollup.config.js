export default {
	input: "./dist/es2015/index.js",
	output: {
		file: "./dist/bundles/ssv-au-ui.umd.js",
		format: "umd",
		name: "ssv.au.ui"
	},
	external: id => id.indexOf("node_modules") > -1,
	onwarn
}

function onwarn(warning) {
	const suppressed = [
		"UNRESOLVED_IMPORT",
		"MISSING_GLOBAL_NAME",
		"THIS_IS_UNDEFINED"
	];

	if (!suppressed.find(code => warning.code === code)) {
		return console.warn(warning.message);
	}
}