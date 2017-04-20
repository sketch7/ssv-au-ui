import * as _ from "lodash";

export type ChipType = "label" | "rounded";

export const chipType = {
	label: "label" as ChipType,
	rounded: "rounded" as ChipType
};

export const supportedChipTypes: string[] = _.values<string>(chipType);