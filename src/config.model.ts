import { BadgeConfig } from "./badge/badge.config";
import { ButtonConfig } from "./button/button.config";
import { WavesConfig } from "./waves/waves.config";
import { IconConfig } from "./icon/icon.config";

export interface UiConfig {
	badge?: Partial<BadgeConfig>;
	button?: Partial<ButtonConfig>;
	waves?: Partial<WavesConfig>;
	icon?: Partial<IconConfig>;
}