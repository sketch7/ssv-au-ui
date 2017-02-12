import * as _ from "lodash";
import { KeyCode } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";

import { attributeUtil } from "../core/index";
import { checkboxConfig, CheckboxConfig } from "./checkbox.config";
import {
	LabelPositionType,
	supportedLabelPositionTypes,
	CheckboxType,
	supportedCheckboxTypes
} from "./checkbox.model";

const PREFIX = "ssv-checkbox";
const FOCUSED_CLASS = `${PREFIX}--focused`;

@autoinject()
@customElement(PREFIX)
export class CheckboxElement {
	static id = 0;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) checked: boolean | string | null;
	@bindable label: string;
	@bindable labelPosition: LabelPositionType;
	@bindable color: string;
	@bindable type: CheckboxType;
	@bindable disabled: boolean | string = false;
	@bindable indeterminate = false;
	@bindable modifier: string | undefined;

	controlId: string;
	modifiers: string | undefined;

	get isIndeterminate() {
		return this.indeterminate && this.checked === null;
	}

	private logger: ILog;
	private config: CheckboxConfig;
	private isMouseDown = false;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("input");
		this.controlId = `${PREFIX}-${CheckboxElement.id++}`;
	}

	bind() {
		this.setDefaults();
		this.indeterminate = attributeUtil.getFlagAsBoolean(this.indeterminate);
		this.checked = this.getCheckedState(this.checked, this.indeterminate);
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);

		const position = this.config.labelPosition.toLowerCase();
		this.validatePosition(position);
		this.element.classList.add(`${PREFIX}--${position}`);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.element.addEventListener("click", this.onClick.bind(this));
		this.element.addEventListener("keypress", this.onFocusedKeyPress.bind(this));
		this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.element.addEventListener("focus", this.onFocus.bind(this));
		this.element.addEventListener("blur", this.onBlur.bind(this));
	}

	detached() {
		this.element.removeEventListener("click", this.onClick);
		this.element.removeEventListener("keypress", this.onFocusedKeyPress);
		this.element.removeEventListener("mousedown", this.onMouseDown);
		this.element.removeEventListener("focus", this.onFocus);
		this.element.removeEventListener("blur", this.onBlur);
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

	private getCheckedState(checked: boolean | string | null, indeterminate: boolean) {
		if (!indeterminate) {
			return attributeUtil.getFlagAsBoolean(checked);
		}
		if (checked === "" || checked === null || checked === undefined) {
			return null;
		}
		return attributeUtil.getFlagAsBoolean(checked);
	}

	private validatePosition(position: string | LabelPositionType) {
		if (supportedLabelPositionTypes.indexOf(position) === -1) {
			this.logger.error("validatePosition", "position type unsupported!", { position });
		}
	}

	private validateType(type: string | CheckboxType) {
		if (supportedCheckboxTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "checkbox type unsupported!", { type });
		}
	}

	private onClick() {
		if (this.disabled) {
			return;
		}
		this.checked = !this.checked;
	}

	private onFocusedKeyPress(e: KeyboardEvent) {
		if (e.keyCode !== KeyCode.Space) {
			return;
		}
		this.logger.debug("onFocusedKeyPress", "keypressed! toggle", { e });
		this.checked = !this.checked;
		e.preventDefault();
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
		this.config = _.defaults<CheckboxConfig>({
			type: this.type,
			color: this.color,
			labelPosition: this.labelPosition,
		}, checkboxConfig);
	}

}