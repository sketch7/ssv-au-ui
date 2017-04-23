import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { bindingMode } from "aurelia-binding";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Dictionary } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { ChipType, supportedChipTypes, ChipItem } from "./chip.model";
import { chipConfig, ChipConfig } from "./chip.config";

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
	@bindable src: string;
	@bindable iconName: string;

	@bindable color: string;
	@bindable type: ChipType;
	@bindable allowRemove: boolean;
	@bindable modifier: string | undefined;
	@bindable disabled: boolean | string = false;

	modifiers: string | undefined;
	removeIcon: string;
	items: ChipItem[] = [];

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

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
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

	onRemoveItem(item: ChipItem) {
		const selected = this.optionsMap[item.value];
		this.removeOptionItem(item.value);
		const event = DOM.createCustomEvent("remove", { bubbles: true, detail: { value: selected } });
		this.element.dispatchEvent(event);
	}

	private validateType(type: string | ChipType) {
		if (supportedChipTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "chip type unsupported!", { type });
		}
	}

	private removeOptionItem(optionValue: string) {
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
			imgSrc: item[this.config.imgSrcField],
			imgIcon: item[this.config.imgIconField],
			imgText: item[this.config.imgTextField],
			isRemovable: this.config.allowRemove && (!_.has(item, this.config.removeField) || item[this.config.removeField])
		}));
	}

	private setImages(options: ChipItem[]) {
		if (!this.isComplexList) {
			return;
		}

		for (const item of options) {
			if (item.imgSrc) {
				item.hasImageSrc = true;
			} else if (item.imgIcon) {
				item.hasImageIcon = true;
			} else if (item.imgText) {
				item.hasImageText = true;
				item.imgText = _.truncate(item.imgText, { length: 3, omission: "" });
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