import * as _ from "lodash";
export type LabelPositionType = "before" | "after";

export const labelPositionType = {
	before: "before" as LabelPositionType,
	after: "after" as LabelPositionType,
};
export const supportedLabelPositionTypes: string[] = _.values<string>(labelPositionType);

export type CheckboxType = "filled" | "minimal";

export const checkboxType = {
	filled: "filled" as CheckboxType,
	minimal: "minimal" as CheckboxType,
};

export const supportedCheckboxTypes: string[] = _.values<string>(checkboxType);