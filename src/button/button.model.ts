import * as _ from "lodash";
export type ButtonType = "flat" | "raised" | "outline";

export const buttonType = {
	flat: "flat" as ButtonType,
	raised: "raised" as ButtonType,
	outline: "outline" as ButtonType,
};

export const supportedButtonTypes: string[] = _.values<string>(buttonType);