import * as _ from "lodash";

export type ChipType = "label" | "rounded";
export type FillStyle = "none" | "filled";

export const chipType = {
	label: "label" as ChipType,
	rounded: "rounded" as ChipType
};

export const fillStyle = {
	none: "none" as FillStyle,
	filled: "filled" as FillStyle
};

export const supportedChipTypes: string[] = _.values<string>(chipType);
export const supportedFillStyles: string[] = _.values<string>(fillStyle);

export interface ChipItem {
	text: string;
	value: string;
	iconImage?: string;
	iconName?: string;
	iconText?: string;
	hasIconImage?: boolean;
	hasIconName?: boolean;
	hasIconText?: boolean;
	isRemovable: boolean;
}