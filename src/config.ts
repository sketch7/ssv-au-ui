import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./config.model";
import { badgeConfig } from "./badge/badge.config";
import { buttonConfig } from "./button/button.config";
import { wavesConfig } from "./waves/waves.config";
import { iconConfig } from "./icon/icon.config";
import { selectConfig } from "./select/select.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		"./badge/badge.element",
		"./input/input.element",
		"./icon/icon.element",
		"./select/select.element",
		"./button/button.attribute",
		"./waves/waves.attribute",
	]);

	Object.assign(badgeConfig, config.badge);
	Object.assign(buttonConfig, config.button);
	Object.assign(wavesConfig, config.waves);
	Object.assign(iconConfig, config.icon);
	Object.assign(selectConfig, config.select);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(config.waves);
	return Promise.resolve();
}