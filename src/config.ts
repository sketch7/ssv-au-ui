import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./config.model";
import { buttonConfig } from "./button/button.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		"./input/input.element",
		"./button/button.attribute",
		"./waves/waves.attribute",
	]);

	Object.assign(buttonConfig, config.button);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(); // todo: pass config
	return Promise.resolve();
}