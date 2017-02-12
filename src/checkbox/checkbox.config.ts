import {
	LabelPositionType,
	labelPositionType,
	CheckboxType,
	checkboxType
} from "./checkbox.model";

export interface CheckboxConfig {
	type: CheckboxType;
	color?: string;
	labelPosition: LabelPositionType;
}

export const checkboxConfig: CheckboxConfig = {
	type: checkboxType.minimal,
	labelPosition: labelPositionType.after,
};