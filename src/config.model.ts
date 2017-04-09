import { BadgeConfig } from "./badge/badge.config";
import { ButtonConfig } from "./button/button.config";
import { CheckboxConfig } from "./checkbox/checkbox.config";
import { IconConfig } from "./icon/icon.config";
import { InputConfig } from "./input/input.config";
import { SelectConfig } from "./select/select.config";
import { SnackbarConfig } from "./snackbar/snackbar.config";
import { WavesConfig } from "./waves/waves.config";

export interface UiConfig {
	badge?: Partial<BadgeConfig>;
	button?: Partial<ButtonConfig>;
	checkbox?: Partial<CheckboxConfig>;
	icon?: Partial<IconConfig>;
	input?: Partial<InputConfig>;
	select?: Partial<SelectConfig>;
	snackbar?: Partial<SnackbarConfig>;
	waves?: Partial<WavesConfig>;
}