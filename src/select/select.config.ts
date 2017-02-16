import { selectType, SelectType } from "./select.model";

export interface SelectConfig {
	type: SelectType;
	autoClose: boolean;
	selectedClass: string;
	color?: string;
}

export const selectConfig: SelectConfig = {
	autoClose: true,
	type: selectType.single,
	selectedClass: "selected"
};