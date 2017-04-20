import * as _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { ChipType, supportedChipTypes } from "./chip.model";
import { chipConfig, ChipConfig } from "./chip.config";

const PREFIX = "ssv-chip";

@autoinject()
@customElement(PREFIX)
export class ChipElement {

	@bindable color: string;
	@bindable type: ChipType;
	@bindable src: string;
	@bindable iconName: string;
	@bindable allowRemove: boolean;
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private config: ChipConfig;

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("chipElement");
	}

	bind() {
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	private validateType(type: string | ChipType) {
		if (supportedChipTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "chip type unsupported!", { type });
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<ChipConfig>({
			type: this.type,
			color: this.color,
			allowRemove: this.allowRemove
		}, chipConfig);
	}

}