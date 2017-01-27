import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

export function configure(aurelia: FrameworkConfiguration, config: any): Promise<void> {
	console.log(">>> au-ui configure!", config);
	aurelia.globalResources([
		"./input/input",
		"./button/button",
		"./waves/waves.attribute",
	]);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(); // todo: pass config
	return Promise.resolve();
}