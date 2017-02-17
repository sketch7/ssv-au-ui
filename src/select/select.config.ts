import { selectType, SelectType } from "./select.model";

export interface SelectConfig {
	type: SelectType;
	autoClose: boolean;
	selectedClass: string;
	color?: string;
	arrowUpIcon: string;
	arrowDownIcon: string;
	allowFiltering: boolean;
	allowClear: boolean;
	clearIcon: string;
}

export const selectConfig: SelectConfig = {
	autoClose: true,
	type: selectType.single,
	selectedClass: "selected",
	arrowUpIcon: "chevron-circle-up",
	arrowDownIcon: "chevron-circle-down",
	allowFiltering: false,
	allowClear: true,
	clearIcon: "times"
};