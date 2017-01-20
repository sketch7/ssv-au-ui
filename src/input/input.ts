import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";

import { attributeUtil } from "../core/index";
import { inputType, InputType } from "./input.model";

const prefix = "ssv-input";

@autoinject()
@customElement(prefix)
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
	@bindable modifier: string | undefined;

	input: HTMLInputElement;
	controlId: string;
	modifiers: string | undefined;

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
		this.controlId = `${prefix}-${Input.id++}`;
	}

	bind() {
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, prefix);
		this.input.disabled = this.disabled;
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);
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
		attributeUtil.setAsFlag(this.element, "disabled", newValue);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, prefix);
	}

	private onInputFocus() {
		this.isFocused = true;
	}

	private onInputBlur() {
		this.isFocused = false;
	}

}