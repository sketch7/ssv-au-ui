import * as _ from "lodash";

export type SelectType = "single" | "multi";

export const selectType = {
	single: "single" as SelectType,
	multi: "multi" as SelectType
};

export const supportedSelectTypes: string[] = _.values<string>(selectType);