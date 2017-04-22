import { chipType, ChipType } from "./chip.model";

export interface ChipConfig {
	type: ChipType;
	color?: string;
	allowRemove: boolean;
	removeIcon: string;
}

export const chipConfig: ChipConfig = {
	type: chipType.rounded,
	allowRemove: true,
	removeIcon: "times-circle"
};