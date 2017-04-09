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
	noOptions: string;
	textField: string;
	valueField: string;
}

export const selectConfig: SelectConfig = {
	autoClose: true,
	type: selectType.single,
	selectedClass: "selected",
	arrowUpIcon: "chevron-up",
	arrowDownIcon: "chevron-down",
	allowFiltering: true,
	filterPlaceholder: "filter options...",
	allowClear: true,
	clearIcon: "times",
	noOptions: "no options available",
	textField: "text",
	valueField: "value"
};