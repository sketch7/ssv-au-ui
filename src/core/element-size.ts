import * as _ from "lodash";
export type ElementSize = "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";

export const elementSize = {
	xxsmall: "xxsmall" as ElementSize,
	xsmall: "xsmall" as ElementSize,
	small: "small" as ElementSize,
	medium: "medium" as ElementSize,
	large: "large" as ElementSize,
	xlarge: "xlarge" as ElementSize,
	xxlarge: "xxlarge" as ElementSize
};

export const supportedElementSizes: string[] = _.values<string>(elementSize);

export function validateElementSize(size: string | ElementSize) {
	return supportedElementSizes.indexOf(size) > -1;
}