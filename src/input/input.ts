import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";

import { inputType, InputType } from "./input.model";

@autoinject()
@customElement("ssv-input")
export class Input {
	static id = 0;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) value: string;
	@bindable label: string;
	@bindable placeholder: string | null = null;
	@bindable help: string | null = null;
	@bindable disabled: boolean | string = false;
	@bindable type: InputType = inputType.text;

	input: HTMLInputElement;
	controlId: string;

	get isActive(): boolean {
		return !!this.value || !!this.placeholder || this.isFocused;
	}

	private isFocused = false;
	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("input");
		this.controlId = `ssv-input-${Input.id++}`;
	}

	bind() {
		this.disabled = getAttributeFlagAsBoolean(this.disabled);
		this.input.disabled = this.disabled;
		setAttributeFlag(this.element, "disabled", this.disabled);
	}

	attached() {
		this.input.addEventListener("focus", this.onInputFocus.bind(this));
		this.input.addEventListener("blur", this.onInputBlur.bind(this));
	}

	detached() {
		this.input.removeEventListener("focus", this.onInputFocus);
		this.input.removeEventListener("blur", this.onInputBlur);
	}

	disabledChanged(newValue: boolean) {
		if (this.input) {
			this.input.disabled = !!newValue;
		}
		setAttributeFlag(this.element, "disabled", newValue);
	}

	private onInputFocus() {
		this.isFocused = true;
	}

	private onInputBlur() {
		this.isFocused = false;
	}

}

// todo: move somewhere reusable.
export function getAttributeFlagAsBoolean(value: string | boolean): boolean {
	return value === true || value === "true" || value === "";
}

export function setAttributeFlag(element: Element, attributeName: string, attributeValue: string | boolean) {
	if (getAttributeFlagAsBoolean(attributeValue)) {
		element.setAttribute(attributeName, "");
	} else {
		element.removeAttribute(attributeName);
	}
}