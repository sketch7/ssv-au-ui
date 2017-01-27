import { LoggerFactory, ILog } from "@ssv/au-core";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { init, attach } from "node-waves";

import { attributeUtil } from "../core/index";
import { buttonType, ButtonType } from "./button.model";

const PREFIX = "ssv-button";
const FOCUSED_CLASS = `${PREFIX}--focused`;
const SUPPORTED_TYPES: string[] = [
	buttonType.fab,
	buttonType.flat,
	buttonType.raised,
];

@autoinject()
@customAttribute(PREFIX)
export class Button {

	@bindable type: ButtonType = buttonType.flat; // todo: global configureble default
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private isMouseDown = false;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("button");
		this.element.classList.add(PREFIX);
	}

	bind() {
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		const typeClass = `${PREFIX}--${this.type.toLowerCase()}`;
		this.element.classList.add(typeClass);
	}

	attached() {
		this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.element.addEventListener("focus", this.onFocus.bind(this));
		this.element.addEventListener("blur", this.onBlur.bind(this));
		init();
		attach(this.element, "waves-button");
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

}