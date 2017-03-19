import { ButtonType, buttonType } from "../button/index";

export interface SnackbarConfig {
	actionColor?: string;
	actionType?: ButtonType;
	duration?: number;
}

export const snackbarConfig: SnackbarConfig = {
	actionType: buttonType.flat,
	actionColor: "accent",
	duration: 3000,
};