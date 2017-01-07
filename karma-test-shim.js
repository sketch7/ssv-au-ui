// reference: https://github.com/ocombe/ng2-translate/blob/master/karma-test-shim.js

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma"s synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

const config = {
	baseURL: "/base/",
	defaultJSExtensions: true,
	paths: {
		"npm:*": "node_modules/*"
	},
	map: {
		// vendors
		"lodash": "npm:lodash",
		"@ssv": "npm:@ssv",
	},
	packages: {
		// vendors
		"lodash": { main: "index.js", defaultExtension: "js" }
	}
};

// ssv
const ssvPackageNames = [
	"core",
];
ssvPackageNames.forEach(pkgName => {
	const name = `@ssv/${pkgName}`;
	config.packages[name] = { main: "dist/umd/index.js", defaultExtension: "js" };
});

// aurelia
const auPackageNames = [
	"dependency-injection",
	"logging",
	"metadata",
	"polyfills",
	"pal",
];
auPackageNames.forEach(pkgName => {
	const name = `aurelia-${pkgName}`;
	config.map[name] = `npm:${name}/dist/amd/index.js`;
});

SystemJS.config(config);
SystemJS.import("test/test-setup")
	.then(function () {
		return Promise.all(resolveTestFiles());
	})
	.then(function () {
		__karma__.start();
	}, function (error) {
		__karma__.error(error.stack || error);
	});

function onlySpecFiles(path) {
	return /[\.|_]spec\.js$/.test(path);
}
function resolveTestFiles() {
	return Object.keys(window.__karma__.files)  // All files served by Karma.
		.filter(onlySpecFiles)
		.map(function (moduleName) {
			return SystemJS.import(moduleName);
		});
}