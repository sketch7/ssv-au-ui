import { ButtonConfig } from "./button/button.config";
import { WavesConfig } from "./waves/waves.config";

export interface UiConfig {
	button?: Partial<ButtonConfig>;
	waves?: Partial<WavesConfig>;
}