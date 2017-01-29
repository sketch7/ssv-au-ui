import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { attach } from "node-waves";

import { attributeUtil, ElementSizeType } from "../core/index";
import { supportedButtonTypes, ButtonType } from "./button.model";
import { buttonConfig, ButtonConfig } from "./button.config";

const PREFIX = "ssv-button";
const FOCUSED_CLASS = `${PREFIX}--focused`;


@autoinject()
@customAttribute(PREFIX)
export class Button {

	@bindable type: ButtonType;
	@bindable size: ElementSizeType;
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

	colorChanged(newValue: string, previousValue: string) {
		attributeUtil.changeBemModifier(PREFIX, newValue.toLowerCase(), previousValue, this.element);
	}

	private validateType(type: string | ButtonType) {
		if (supportedButtonTypes.indexOf(type) === -1) {
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
			color: this.color,
			size: this.size,
		}, buttonConfig);
	}

}