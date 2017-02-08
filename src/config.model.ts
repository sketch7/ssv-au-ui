import { BadgeConfig } from "./badge/badge.config";
import { ButtonConfig } from "./button/button.config";
import { WavesConfig } from "./waves/waves.config";
import { IconConfig } from "./icon/icon.config";
import { SelectConfig } from "./select/select.config";

export interface UiConfig {
	badge?: Partial<BadgeConfig>;
	button?: Partial<ButtonConfig>;
	waves?: Partial<WavesConfig>;
	icon?: Partial<IconConfig>;
	select?: Partial<SelectConfig>;
}