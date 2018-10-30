import _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { attach } from "node-waves";

import { attributeUtil, ElementSize, ElementFocusedController } from "../core/index";
import { supportedButtonTypes, ButtonType } from "./button.model";
import { buttonConfig, ButtonConfig } from "./button.config";

const PREFIX = "ssv-button";

@autoinject()
@customAttribute(PREFIX)
export class ButtonAttribute {

	@bindable({
		primaryProperty: true
	}) color: string | undefined;
	@bindable type: ButtonType | undefined;
	@bindable size: ElementSize | undefined;
	@bindable disableRipple: boolean | undefined;
	@bindable rippleType: string | undefined;

	private logger: ILog;
	private config!: ButtonConfig;
	private focusedController: ElementFocusedController;

	constructor(
		loggerFactory: LoggerFactory,
		private element: HTMLElement, // todo: test!!!! previous value was: Element
	) {
		this.logger = loggerFactory.get("buttonAttribute");
		this.element.classList.add(PREFIX);
		this.focusedController = new ElementFocusedController(PREFIX, element);
	}

	bind() {
		this.setDefaults();

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.size) {
			this.element.classList.add(`${PREFIX}--${this.config.size}`);
		}
		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.focusedController.init();
		if (!this.config.disableRipple) {
			attach(this.element, this.config.rippleType);
		}
	}

	detached() {
		this.focusedController.destroy();
	}

	colorChanged(newValue: string, previousValue: string) {
		attributeUtil.changeBemModifier(PREFIX, newValue.toLowerCase(), previousValue, this.element);
	}

	private validateType(type: string | ButtonType) {
		if (supportedButtonTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "button type unsupported!", { type });
		}
	}

	private setDefaults(): void {
		this.config = _.defaults({
			type: this.type,
			disableRipple: this.disableRipple,
			rippleType: this.rippleType,
			color: this.color,
			size: this.size,
		}, buttonConfig);
	}

}