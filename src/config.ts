import { FrameworkConfiguration } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./config.model";
import { badgeConfig } from "./badge/badge.config";
import { buttonConfig } from "./button/button.config";
import { checkboxConfig } from "./checkbox/checkbox.config";
import { iconConfig } from "./icon/icon.config";
import { inputConfig } from "./input/input.config";
import { snackbarConfig } from "./snackbar/snackbar.config";
import { wavesConfig } from "./waves/waves.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		"./badge/badge.element",
		"./button/button.attribute",
		"./checkbox/checkbox.element",
		"./icon/icon.element",
		"./input/input.element",
		"./waves/waves.attribute",
	]);

	Object.assign(badgeConfig, config.badge);
	Object.assign(buttonConfig, config.button);
	Object.assign(checkboxConfig, config.checkbox);
	Object.assign(iconConfig, config.icon);
	Object.assign(inputConfig, config.input);
	Object.assign(snackbarConfig, config.snackbar);
	Object.assign(wavesConfig, config.waves);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(config.waves);
	return Promise.resolve();
}