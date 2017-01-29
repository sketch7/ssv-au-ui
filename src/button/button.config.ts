import { buttonType, ButtonType } from "./button.model";

export interface ButtonConfig {
	type: ButtonType;
	disableRipple: boolean;
	rippleType?: string;
	color?: string;
}

export const buttonConfig: ButtonConfig = {
	type: buttonType.flat,
	disableRipple: false,
};