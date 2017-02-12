import { BadgeConfig } from "./badge/badge.config";
import { ButtonConfig } from "./button/button.config";
import { CheckboxConfig } from "./checkbox/checkbox.config";
import { IconConfig } from "./icon/icon.config";
import { SelectConfig } from "./select/select.config";
import { WavesConfig } from "./waves/waves.config";

export interface UiConfig {
	badge?: Partial<BadgeConfig>;
	button?: Partial<ButtonConfig>;
	checkbox?: Partial<CheckboxConfig>;
	icon?: Partial<IconConfig>;
	select?: Partial<SelectConfig>;
	waves?: Partial<WavesConfig>;
}