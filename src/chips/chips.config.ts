import { chipType, ChipType, fillStyle, FillStyle } from "./chips.model";

export interface ChipConfig {
	type: ChipType;
	color?: string;
	allowRemove: boolean;
	removeIcon: string;
	textField: string;
	valueField: string;
	removeField: string;
	iconImageField: string;
	iconNameField: string;
	iconTextField: string;
	fillStyle: FillStyle;
	focusStyle: FillStyle;
}

export const chipConfig: ChipConfig = {
	type: chipType.rounded,
	allowRemove: true,
	removeIcon: "times",
	textField: "text",
	valueField: "value",
	removeField: "allowRemove",
	iconImageField: "iconImage",
	iconNameField: "iconName",
	iconTextField: "iconText",
	fillStyle: fillStyle.color,
	focusStyle: fillStyle.color
};