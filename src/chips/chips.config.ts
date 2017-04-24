import { chipType, ChipType } from "./chips.model";

export interface ChipConfig {
	type: ChipType;
	color?: string;
	allowRemove: boolean;
	removeIcon: string;
	textField: string;
	valueField: string;
	removeField: string;
	imgSrcField: string;
	imgIconField: string;
	imgTextField: string;
}

export const chipConfig: ChipConfig = {
	type: chipType.rounded,
	allowRemove: true,
	removeIcon: "times",
	textField: "text",
	valueField: "value",
	removeField: "allowRemove",
	imgSrcField: "imgSrc",
	imgIconField: "imgIcon",
	imgTextField: "imgText"
};