import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";

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
	}) value: string;
	@bindable label: string;
	@bindable disabled: boolean | string = false;
	@bindable color: string;
	@bindable type: InputType = inputType.text;
	@bindable placeholder: string | undefined;
	@bindable help: string | undefined;
	@bindable modifier: string | undefined;

	controlId: string;
	modifiers: string | undefined;
	private input: HTMLInputElement;
	private config: InputConfig;

	get isActive(): boolean {
		return !!this.value || !!this.placeholder || this.isFocused;
	}

	private isFocused = false;
	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("inputElement");
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
		this.input.addEventListener("focus", this.onInputFocus.bind(this));
		this.input.addEventListener("blur", this.onInputBlur.bind(this));
	}

	detached() {
		this.input.removeEventListener("focus", this.onInputFocus);
		this.input.removeEventListener("blur", this.onInputBlur);
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
		this.config = _.defaults<InputConfig>({
			color: this.color,
		}, inputConfig);
	}

}