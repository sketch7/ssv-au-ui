import { elementSizeType, ElementSizeType } from "../core/index";
import { buttonType, ButtonType } from "./button.model";

export interface ButtonConfig {
	type: ButtonType;
	size?: ElementSizeType;
	color?: string;
	disableRipple: boolean;
	rippleType?: string;
}

export const buttonConfig: ButtonConfig = {
	type: buttonType.flat,
	size: elementSizeType.medium,
	disableRipple: false,
};