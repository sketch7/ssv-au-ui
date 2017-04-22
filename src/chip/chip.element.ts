import * as _ from "lodash";
import { DOM } from "aurelia-pal";
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

	@bindable text: string;
	@bindable src: string;
	@bindable iconName: string;
	@bindable color: string;
	@bindable type: ChipType;
	@bindable allowRemove: boolean;
	@bindable modifier: string | undefined;
	@bindable disabled: boolean | string = false;

	modifiers: string | undefined;
	removeIcon: string;

	private logger: ILog;
	private config: ChipConfig;

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("chipElement");
	}

	bind() {
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);

		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	disabledChanged(newValue: boolean) {
		attributeUtil.setAsFlag(this.element, "disabled", newValue);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	onClose() {
		const event = DOM.createCustomEvent("close", { bubbles: true, detail: { value: this.text } });
		this.element.dispatchEvent(event);
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

		this.removeIcon = this.config.removeIcon;
		this.allowRemove = this.config.allowRemove;
	}

}