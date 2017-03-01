import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { computedFrom } from "aurelia-binding";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Dictionary, collection } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { SelectType, selectType, supportedSelectTypes, SelectItem } from "./select.model";
import { selectConfig, SelectConfig } from "./select.config";

const PREFIX = "ssv-select";

@autoinject()
@customElement(PREFIX)
export class SelectElement {
	static id = 0;

	@bindable color: string;
	@bindable placeholder: string;
	@bindable selected: any | null;
	@bindable selectedClass: string | undefined;
	@bindable autoClose: boolean;
	@bindable allowClear: boolean;
	@bindable allowFiltering: boolean;
	@bindable filterPlaceholder: string;
	@bindable type: SelectType;
	@bindable modifier: string | undefined;

	@bindable options: any[] = [];
	@bindable text: string;
	@bindable value: string;
	@bindable groupby: string | undefined;

	controlId: string;
	modifiers: string | undefined;
	labelModifierClass: string | undefined;
	isOpen = false;
	arrowUpIcon: string;
	arrowDownIcon: string;
	clearIcon: string;
	filterBy: string;
	filteredOptions: SelectItem[] = [];
	noOptionsAvailableText: string;

	@computedFrom("isOpen", "selectedItems", "selected")
	get isActive(): boolean {
		return this.isOpen || this.selectedItems.length > 0 || this.selected && this.selected.length > 0;
	}

	private logger: ILog;
	private config: SelectConfig;
	private optionsList: SelectItem[];
	private optionsItems: Dictionary<object> = {};
	private selectedItems: SelectItem[] = [];

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("selectElement");
		this.controlId = `${PREFIX}-${SelectElement.id++}`;
	}

	bind() {
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		this.selectedClass = attributeUtil.generateBemStyleModifiers(this.config.selectedClass, `${PREFIX}__item`);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.validateSelectedType();
		this.element.classList.add(`${PREFIX}--${type}`);
		this.labelModifierClass = attributeUtil.generateBemStyleModifiers(type, `${PREFIX}__label`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	// selectedChanged(value: any | undefined) {
	// 	this.logger.warn("selectedChanged", "init", value);
	// }

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	onChange(option: SelectItem) {
		let previous: any | null;

		if (this.config.type === selectType.single) {
			collection.mutualExclusiveSelect(this.optionsList, option);
			previous = this.selectedItems.length > 0 ? this.optionsItems[this.selectedItems[0].value] : null;
			this.selectedItems = [option];
			this.selected = this.optionsItems[option.value];
		} else if (this.config.type === selectType.multi) {
			previous = [];
			this.selected = this.selected ? this.selected : [];
			for (let item of this.selectedItems) {
				previous.push(this.optionsItems[item.value]);
			}

			if (!_.find(this.selectedItems, x => x.value === option.value)) {
				option.isSelected = true;
				this.selectedItems.push(option);
				this.selected.push(this.optionsItems[option.value]);
			} else {
				this.clearMultiSelectionItem(option);
			}
		}

		if (this.config.autoClose) {
			this.isOpen = false;
		}

		const event = DOM.createCustomEvent("change", { bubbles: true, detail: { previous, value: this.selected } });
		this.element.dispatchEvent(event);
	}

	filterOptions(searchTerm: string) {
		if (!searchTerm) {
			this.filteredOptions = this.optionsList;
			return;
		}

		this.filteredOptions = _.filter(this.optionsList, item => {
			return _.includes(item.text.toLowerCase(), searchTerm.toLowerCase());
		});
	}

	onClear(event: MouseEvent) {
		this.filterBy = "";
		this.isOpen = false;
		this.selected = null;
		this.selectedItems = [];
		this.filteredOptions = this.optionsList;

		for (let option of this.optionsList) {
			option.isSelected = false;
		}
		event.stopPropagation();
	}

	onDeselect(event: MouseEvent, option: SelectItem) {
		this.clearMultiSelectionItem(option);
		event.stopPropagation();
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}

	private clearMultiSelectionItem(option: SelectItem) {
		option.isSelected = false;
		_.remove(this.selectedItems, x => x.value === option.value);
		_.remove(this.selected, x => x === this.optionsItems[option.value]);
	}

	private validateType(type: string | SelectType) {
		if (supportedSelectTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "select type unsupported!", { type });
		}
	}

	private validateSelectedType() {
		if (!this.selected) {
			return;
		}

		let tempList: SelectItem[] = [];
		switch (this.config.type) {
			case selectType.single:
				if (_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an object!");
					return;
				}
				tempList = this.convertToSelectItems([this.selected], true);
				break;
			case selectType.multi:
				if (!_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an array!");
					return;
				}
				tempList = this.convertToSelectItems(this.selected, true);
				break;
		}

		const tempSelected: any = [];
		for (let option of tempList) {
			let item = _.find(this.optionsList, x => x.value === option.value);
			if (item) {
				item.isSelected = true;
				this.selectedItems.push(option);
				tempSelected.push(this.optionsItems[option.value]);
			}
		}
		this.selected = tempSelected.length === 0 ? null
			: this.config.type === selectType.single
				? tempSelected[0]
				: tempSelected;
	}

	private convertToSelectItems(options: any[], isSelected = false): SelectItem[] {
		return _.map(options, item => {
			return {
				value: item[this.config.dataValueField],
				text: item[this.config.dataTextField],
				groupBy: item[this.config.dataGroupByField as string],
				isSelected: isSelected
			} as SelectItem;
		});
	}

	private setDefaults(): void {
		this.config = _.defaults<SelectConfig>({
			type: this.type,
			color: this.color,
			autoClose: this.autoClose,
			allowClear: this.allowClear,
			allowFiltering: this.allowFiltering,
			filterPlaceholder: this.filterPlaceholder,
			selectedClass: this.selectedClass,
			dataTextField: this.text,
			dataValueField: this.value,
			dataGroupByField: this.groupby,
		}, selectConfig);

		this.arrowUpIcon = this.config.arrowUpIcon;
		this.arrowDownIcon = this.config.arrowDownIcon;
		this.clearIcon = this.config.clearIcon;
		this.allowClear = this.config.allowClear;
		this.allowFiltering = this.config.allowFiltering;
		this.filterPlaceholder = this.config.filterPlaceholder;
		this.noOptionsAvailableText = this.config.noOptionsAvailableText;

		this.optionsList = this.convertToSelectItems(this.options);
		this.filteredOptions = this.optionsList;

		for (let item of this.options) {
			this.optionsItems[item[this.config.dataValueField]] = item;
		}
	}

}