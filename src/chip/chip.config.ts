import { chipType, ChipType } from "./chip.model";

export interface ChipConfig {
	type: ChipType;
	color?: string;
	allowRemove: boolean;
	removeIconName: string;
}

export const chipConfig: ChipConfig = {
	type: chipType.rounded,
	allowRemove: true,
	removeIconName: "times-circle"
};