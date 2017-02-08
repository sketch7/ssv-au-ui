import { selectType, SelectType } from "./select.model";

export interface SelectConfig {
	type: SelectType;
	color?: string;
}

export const selectConfig: SelectConfig = {
	type: selectType.single
};