import { collection } from "@ssv/core";

import { elementSize, ElementSize } from "../core/index";

export interface IconConfig {
	defaultClass: string;
	prefix: string;
	color?: string;
	size: ElementSize;
	strictElementSize: boolean;
	aliases?: collection.Dictionary<string>;
}

export const iconConfig: IconConfig = {
	prefix: "fa-",
	defaultClass: "fa",
	size: elementSize.xsmall,
	strictElementSize: true
};