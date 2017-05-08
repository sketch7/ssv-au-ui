import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { bindingMode } from "aurelia-binding";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Dictionary, KeyCode } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { ChipType, supportedChipTypes, ChipItem, FillStyle } from "./chips.model";
import { chipConfig, ChipConfig } from "./chips.config";

const PREFIX = "ssv-chips";

@autoinject()
@customElement(PREFIX)
export class ChipElement {

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) options: any[] = [];
	@bindable textField: string;
	@bindable valueField: string;
	@bindable removeField: string;
	@bindable iconImageField: string;
	@bindable iconNameField: string;
	@bindable iconTextField: string;
	@bindable src: string;
	@bindable iconName: string;

	@bindable fillStyle: FillStyle;
	@bindable focusStyle: FillStyle;
	@bindable color: string;
	@bindable type: ChipType;
	@bindable allowRemove: boolean;
	@bindable modifier: string | undefined;
	@bindable disabled: boolean | string = false;

	modifiers: string | undefined;
	removeIcon: string;
	items: ChipItem[] = [];
	focusValue: string | undefined = undefined;

	private logger: ILog;
	private config: ChipConfig;
	private isComplexList: boolean;
	private optionsMap: Dictionary<object> = {};

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("chipElement");
	}

	bind() {
		this.presetBooleanTypes();
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		const fillStyle = this.config.fillStyle.toLowerCase();
		this.element.classList.add(`${PREFIX}--fill-${fillStyle}`);
		const focusStyle = this.config.focusStyle.toLowerCase();
		this.element.classList.add(`${PREFIX}--focus-${focusStyle}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.element.addEventListener("keydown", this.onFocusedKeyPress.bind(this));
	}

	detached() {
		this.element.removeEventListener("keydown", this.onFocusedKeyPress);
	}

	optionsChanged(options: any[]) {
		this.onOptionsChanged(options);
	}

	disabledChanged(newValue: boolean) {
		attributeUtil.setAsFlag(this.element, "disabled", newValue);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	onRemoveItem(e: MouseEvent, item: ChipItem) {
		e.stopPropagation();
		if (this.disabled) {
			return;
		}
		this.removeOptionItem(item.value);
	}

	setFocus(value: string) {
		this.focusValue = value;
	}

	private setFocusValue(position?: (KeyCode.LeftArrow | KeyCode.RightArrow | KeyCode.Delete)) {
		if (_.isEmpty(this.items)) {
			return;
		}
		if (!position) {
			this.focusValue = this.items[0].value;
			return;
		}
		if (position) {
			let index = _.findIndex(this.items, x => x.value === this.focusValue);

			if (position === KeyCode.LeftArrow && index > 0) {
				this.focusValue = this.items[--index].value;
			} else if (position === KeyCode.RightArrow && index + 1 < this.items.length) {
				this.focusValue = this.items[++index].value;
			} else if (position === KeyCode.Delete) {
				if (index + 1 < this.items.length) {
					this.focusValue = this.items[++index].value;
				} else if (index > 0) {
					this.focusValue = this.items[--index].value;
				} else {
					this.focusValue = "";
				}
			}
			return;
		}
	}

	private onFocusedKeyPress(e: KeyboardEvent) {
		switch (e.keyCode) {
			case KeyCode.Tab:
			case KeyCode.Escape:
				this.focusValue = "";
				break;
			case KeyCode.LeftArrow: {
				this.setFocusValue(KeyCode.LeftArrow);
				e.preventDefault();
				break;
			}
			case KeyCode.RightArrow: {
				this.setFocusValue(KeyCode.RightArrow);
				e.preventDefault();
				break;
			}
			case KeyCode.Backspace:
			case KeyCode.Delete:
				if (!this.focusValue) {
					break;
				}
				const item = _.find(this.items, x => x.value === this.focusValue);
				if (item && item.isRemovable) {
					this.removeOptionItem(this.focusValue);
					e.preventDefault();
				}
				break;
		}
	}

	private validateType(type: string | ChipType) {
		if (supportedChipTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "chip type unsupported!", { type });
		}
	}

	private removeOptionItem(optionValue: string) {
		const selected = this.optionsMap[optionValue];
		this.removeItem(optionValue);
		this.setFocusValue(KeyCode.Delete);
		const event = DOM.createCustomEvent("remove", { bubbles: true, detail: { value: selected } });
		this.element.dispatchEvent(event);
	}

	private removeItem(optionValue: string) {
		if (this.isComplexList) {
			this.options = _.filter(this.options, (x: object & { [key: string]: any }) => x[this.config.valueField] !== optionValue);
			return;
		}

		this.options = _.filter(this.options, x => x !== optionValue);
	}

	private convertToChipItems(options: any[]): ChipItem[] {
		if (_.isEmpty(options)) {
			return [];
		}

		return this.isComplexList
			? this.convertObjectToChipItems(options)
			: this.convertSimpleToChipItems(options);
	}

	private convertSimpleToChipItems(options: (string | boolean | number)[]): ChipItem[] {
		return _.map<string | boolean | number, ChipItem>(options, item => ({
			value: item.toString(),
			text: item.toString(),
			isRemovable: this.config.allowRemove
		}));
	}

	private convertObjectToChipItems(options: any[]): ChipItem[] {
		return _.map(options, item => ({
			value: item[this.config.valueField],
			text: item[this.config.textField],
			iconImage: item[this.config.iconImageField],
			iconName: item[this.config.iconNameField],
			iconText: item[this.config.iconTextField],
			isRemovable: this.config.allowRemove && (!_.has(item, this.config.removeField) || item[this.config.removeField])
		}));
	}

	private setImages(options: ChipItem[]) {
		if (!this.isComplexList) {
			return;
		}

		for (const item of options) {
			if (item.iconImage) {
				item.hasIconImage = true;
			} else if (item.iconName) {
				item.hasIconName = true;
			} else if (item.iconText) {
				item.hasIconText = true;
				item.iconText = _.truncate(item.iconText, { length: 3, omission: "" });
			}
		}
	}

	private onOptionsChanged(options: any[]) {
		options = options || [];
		options = options.filter(x => !_.isNil(x));
		this.isComplexList = _.isObject(options[0]);
		this.items = this.convertToChipItems(options);
		this.setImages(this.items);

		_.zipWith(options, this.items, (original: any, internal: ChipItem) => {
			this.optionsMap[internal.value] = original;
		});
	}

	private setDefaults(): void {
		this.config = _.defaults<ChipConfig>({
			type: this.type,
			color: this.color,
			allowRemove: this.allowRemove,
			textField: this.textField,
			valueField: this.valueField,
			removeField: this.removeField,
			iconImageField: this.iconImageField,
			iconNameField: this.iconNameField,
			iconTextField: this.iconTextField,
			fillStyle: this.fillStyle,
			focusStyle: this.focusStyle,
		}, chipConfig);

		this.removeIcon = this.config.removeIcon;
		this.allowRemove = this.config.allowRemove;

		this.onOptionsChanged(this.options);
	}

	private presetBooleanTypes() {
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);

		if (this.allowRemove) {
			this.allowRemove = attributeUtil.getFlagAsBoolean(this.allowRemove);
		}

	}
}