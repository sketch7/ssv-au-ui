import _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode, computedFrom } from "aurelia-binding";

import { attributeUtil } from "../core/index";
import { inputType, InputType } from "./input.model";
import { inputConfig, InputConfig } from "./input.config";

const PREFIX = "ssv-input";

@autoinject()
@customElement(PREFIX)
export class InputElement {
	static id = 0;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) value: string | undefined;
	@bindable label: string | undefined;
	@bindable disabled: boolean | string = false;
	@bindable color: string | undefined;
	@bindable type: InputType = inputType.text;
	@bindable placeholder: string | undefined;
	@bindable help: string | undefined;
	@bindable modifier: string | undefined;

	controlId: string;
	modifiers: string | undefined;
	isFocused = false;

	@computedFrom("value", "placeholder", "isFocused")
	get isActive(): boolean {
		return !!this.value || !!this.placeholder || this.isFocused;
	}

	private input!: HTMLInputElement;
	private config!: InputConfig;

	private _onInputFocus = this.onInputFocus.bind(this);
	private _onInputBlur = this.onInputBlur.bind(this);

	constructor(
		private element: Element,
	) {
		this.controlId = `${PREFIX}-${InputElement.id++}`;
	}

	bind() {
		this.setDefaults();
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.input.addEventListener("focus", this._onInputFocus);
		this.input.addEventListener("blur", this._onInputBlur);
	}

	detached() {
		this.input.removeEventListener("focus", this._onInputFocus);
		this.input.removeEventListener("blur", this._onInputBlur);
	}

	disabledChanged(newValue: boolean) {
		attributeUtil.setAsFlag(this.element, "disabled", newValue);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	colorChanged(newValue: string, previousValue: string) {
		attributeUtil.changeBemModifier(PREFIX, newValue.toLowerCase(), previousValue, this.element);
	}

	private onInputFocus() {
		this.isFocused = true;
	}

	private onInputBlur() {
		this.isFocused = false;
	}

	private setDefaults(): void {
		this.config = _.defaults({
			color: this.color,
		}, inputConfig);
	}

}