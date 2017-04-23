import { chipType, ChipType } from "./chip.model";

export interface ChipConfig {
	type: ChipType;
	color?: string;
	allowRemove: boolean;
	removeIcon: string;
	textField: string;
	valueField: string;
	isRemovableField: string;
	imgSrcField: string;
	imgIconField: string;
	imgTextField: string;
}

export const chipConfig: ChipConfig = {
	type: chipType.rounded,
	allowRemove: true,
	removeIcon: "times-circle",
	textField: "text",
	valueField: "value",
	isRemovableField: "allowRemove",
	imgSrcField: "imgSrc",
	imgIconField: "imgIcon",
	imgTextField: "imgText"
};