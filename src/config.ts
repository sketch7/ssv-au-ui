import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./config.model";
import { buttonConfig } from "./button/button.config";
import { wavesConfig } from "./waves/waves.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		"./input/input.element",
		"./button/button.attribute",
		"./waves/waves.attribute",
	]);

	Object.assign(buttonConfig, config.button);
	Object.assign(wavesConfig, config.waves);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(config.waves);
	return Promise.resolve();
}