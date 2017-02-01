import { BadgeConfig } from "./badge/badge.config";
import { ButtonConfig } from "./button/button.config";
import { WavesConfig } from "./waves/waves.config";

export interface UiConfig {
	badge?: Partial<BadgeConfig>;
	button?: Partial<ButtonConfig>;
	waves?: Partial<WavesConfig>;
}