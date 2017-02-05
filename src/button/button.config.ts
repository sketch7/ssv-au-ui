import { elementSize, ElementSize } from "../core/index";
import { buttonType, ButtonType } from "./button.model";

export interface ButtonConfig {
	type: ButtonType;
	size?: ElementSize;
	color?: string;
	disableRipple: boolean;
	rippleType?: string;
}

export const buttonConfig: ButtonConfig = {
	type: buttonType.raised,
	size: elementSize.medium,
	disableRipple: false,
};