import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { init as initWaves } from "node-waves";

import { UiConfig } from "./config.model";
import { badgeConfig } from "./badge/badge.config";
import { buttonConfig } from "./button/button.config";
import { checkboxConfig } from "./checkbox/checkbox.config";
import { chipConfig } from "./chips/chips.config";
import { iconConfig } from "./icon/icon.config";
import { inputConfig } from "./input/input.config";
import { selectConfig } from "./select/select.config";
import { snackbarConfig } from "./snackbar/snackbar.config";
import { wavesConfig } from "./waves/waves.config";

export function configure(aurelia: FrameworkConfiguration, config: UiConfig): Promise<void> {
	aurelia.globalResources([
		PLATFORM.moduleName("./badge/badge.element"),
		PLATFORM.moduleName("./button/button.attribute"),
		PLATFORM.moduleName("./checkbox/checkbox.element"),
		PLATFORM.moduleName("./chips/chips.element"),
		PLATFORM.moduleName("./highlight/highlight.value-convetor"),
		PLATFORM.moduleName("./icon/icon.element"),
		PLATFORM.moduleName("./input/input.element"),
		PLATFORM.moduleName("./select/select.element"),
		PLATFORM.moduleName("./snackbar/snackbar-host.element"),
		PLATFORM.moduleName("./snackbar/simple-snackbar.element"),
		PLATFORM.moduleName("./waves/waves.attribute"),
	]);

	Object.assign(badgeConfig, config.badge);
	Object.assign(buttonConfig, config.button);
	Object.assign(checkboxConfig, config.checkbox);
	Object.assign(chipConfig, config.chip);
	Object.assign(iconConfig, config.icon);
	Object.assign(inputConfig, config.input);
	Object.assign(selectConfig, config.select);
	Object.assign(snackbarConfig, config.snackbar);
	Object.assign(wavesConfig, config.waves);

	// const service = aurelia.container.get(SampleClass) as SampleClass;
	initWaves(config.waves);
	return Promise.resolve();
}
