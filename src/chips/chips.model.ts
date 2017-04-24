import * as _ from "lodash";

export type ChipType = "label" | "rounded";

export const chipType = {
	label: "label" as ChipType,
	rounded: "rounded" as ChipType
};

export const supportedChipTypes: string[] = _.values<string>(chipType);

export interface ChipItem {
	text: string;
	value: string;
	imgSrc?: string;
	imgIcon?: string;
	imgText?: string;
	hasImageSrc?: boolean;
	hasImageIcon?: boolean;
	hasImageText?: boolean;
	isRemovable: boolean;
}