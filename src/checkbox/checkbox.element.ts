import _ from "lodash";
import { KeyCode } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";

import { attributeUtil, ElementFocusedController } from "../core/index";
import { checkboxConfig, CheckboxConfig } from "./checkbox.config";
import {
	LabelPositionType,
	supportedLabelPositionTypes,
	CheckboxType,
	supportedCheckboxTypes
} from "./checkbox.model";

const PREFIX = "ssv-checkbox";

@autoinject()
@customElement(PREFIX)
export class CheckboxElement {
	static id = 0;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) checked: boolean | string | null | undefined;
	@bindable label: string | undefined;
	@bindable labelPosition: LabelPositionType | undefined;
	@bindable color: string | undefined;
	@bindable type: CheckboxType | undefined;
	@bindable disabled: boolean | string = false;
	@bindable indeterminate = false;
	@bindable modifier: string | undefined;

	controlId: string;
	modifiers: string | undefined;

	get isIndeterminate() {
		return this.indeterminate && this.checked === null;
	}

	private logger: ILog;
	private config!: CheckboxConfig;
	private focusedController: ElementFocusedController;

	private _onClick = this.onClick.bind(this);
	private _onFocusedKeyPress = this.onFocusedKeyPress.bind(this);

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("input");
		this.controlId = `${PREFIX}-${CheckboxElement.id++}`;
		this.focusedController = new ElementFocusedController(PREFIX, element);
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
		this.focusedController.init();
		this.element.addEventListener("click", this._onClick);
		this.element.addEventListener("keypress", this._onFocusedKeyPress);
	}

	detached() {
		this.focusedController.destroy();
		this.element.removeEventListener("click", this._onClick);
		this.element.removeEventListener("keypress", this._onFocusedKeyPress);
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

	private getCheckedState(checked: boolean | string | null | undefined, indeterminate: boolean) {
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

	private setDefaults(): void {
		this.config = _.defaults({
			type: this.type,
			color: this.color,
			labelPosition: this.labelPosition,
		}, checkboxConfig);
	}

}