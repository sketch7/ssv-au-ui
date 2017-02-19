import { selectType, SelectType } from "./select.model";

export interface SelectConfig {
	type: SelectType;
	autoClose: boolean;
	selectedClass: string;
	color?: string;
	arrowUpIcon: string;
	arrowDownIcon: string;
	allowFiltering: boolean;
	filterPlaceholder: string;
	allowClear: boolean;
	clearIcon: string;
	noOptionsAvilableText: string;
}

export const selectConfig: SelectConfig = {
	autoClose: true,
	type: selectType.single,
	selectedClass: "selected",
	arrowUpIcon: "chevron-circle-up",
	arrowDownIcon: "chevron-circle-down",
	allowFiltering: true,
	filterPlaceholder: "filter options...",
	allowClear: true,
	clearIcon: "times",
	noOptionsAvilableText: "no options available"
};