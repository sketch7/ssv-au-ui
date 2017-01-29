import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./ui-core.config";
import { buttonConfig } from "./button/button.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		"./input/input",
		"./button/button",
		"./waves/waves.attribute",
	]);

	Object.assign(buttonConfig, config.button);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(); // todo: pass config
	return Promise.resolve();
}