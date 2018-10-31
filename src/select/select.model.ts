import _ from "lodash";

export type SelectType = "single" | "multi";

export const selectType = {
	single: "single" as SelectType,
	multi: "multi" as SelectType
};

export const supportedSelectTypes: string[] = _.values<string>(selectType);

export interface SelectItem {
	text: string;
	value: string;
	groupBy: string;
	isSelected: boolean;
}

export interface SelectGroup {
	name: string | undefined;
	options: SelectItem[];
}