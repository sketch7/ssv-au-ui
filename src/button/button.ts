import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { attach } from "node-waves";

import { attributeUtil } from "../core/index";
import { buttonType, ButtonType } from "./button.model";
import { buttonConfig, ButtonConfig } from "./button.config";

const PREFIX = "ssv-button";
const FOCUSED_CLASS = `${PREFIX}--focused`;
const SUPPORTED_TYPES: string[] = [
	buttonType.flat,
	buttonType.raised,
];

@autoinject()
@customAttribute(PREFIX)
export class Button {

	@bindable type: ButtonType;
	@bindable disableRipple: boolean;
	@bindable rippleType: string;
	@bindable color: string;
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private isMouseDown = false;
	private config: ButtonConfig;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("button");
		this.element.classList.add(PREFIX);
	}

	bind() {
		this.setDefaults();

		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		this.element.classList.add(`${PREFIX}--${this.config.type.toLowerCase()}`);
		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.element.addEventListener("focus", this.onFocus.bind(this));
		this.element.addEventListener("blur", this.onBlur.bind(this));
		if (!this.config.disableRipple) {
			attach(this.element, this.config.rippleType);
		}
	}

	detached() {
		this.element.removeEventListener("mousedown", this.onMouseDown);
		this.element.removeEventListener("focus", this.onFocus);
		this.element.removeEventListener("blur", this.onBlur);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	typeChanged(newValue: ButtonType, previousValue: ButtonType) {
		const newValueLower = newValue.toLowerCase();
		this.validateType(newValueLower);
		attributeUtil.changeBemModifier(PREFIX, newValueLower, previousValue, this.element);
	}

	colorChanged(newValue: string, previousValue: string) {
		attributeUtil.changeBemModifier(PREFIX, newValue.toLowerCase(), previousValue, this.element);
	}

	private validateType(type: string | ButtonType) {
		if (SUPPORTED_TYPES.indexOf(type) === -1) {
			this.logger.error("validateType", "button type unsupported!", { type });
		}
	}

	private onMouseDown() {
		this.isMouseDown = true;
		// this fixes focus bug - https://marcysutton.com/button-focus-hell/
		setTimeout(() => this.isMouseDown = false, 100);
	}

	private onFocus() {
		if (!this.isMouseDown) {
			this.element.classList.add(FOCUSED_CLASS);
		}
	}

	private onBlur() {
		this.element.classList.remove(FOCUSED_CLASS);
	}

	private setDefaults(): void {
		this.config = _.defaults<ButtonConfig>({
			type: this.type,
			disableRipple: this.disableRipple,
			rippleType: this.rippleType,
			color: this.color
		}, buttonConfig);
	}

}