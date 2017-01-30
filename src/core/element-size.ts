import * as _ from "lodash";
export type ElementSizeType = "small" | "medium" | "large";

export const elementSizeType = {
	small: "small" as ElementSizeType,
	medium: "medium" as ElementSizeType,
	large: "large" as ElementSizeType,
};

export const supportedElementSizeTypes: string[] = _.values<string>(elementSizeType);

export function validateElementSize(size: string | ElementSizeType) {
	return supportedElementSizeTypes.indexOf(size) > -1;
}