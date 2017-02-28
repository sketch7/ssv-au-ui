import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { computedFrom } from "aurelia-binding";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
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
	@bindable selected: any | any[] | null;
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
	isOpen = false;
	arrowUpIcon: string;
	arrowDownIcon: string;
	clearIcon: string;
	filterBy: string;
	filteredOptions: SelectItem[] = [];
	noOptionsAvailableText: string;
	selectedLabel: string;

	@computedFrom("isOpen", "selectedLabel")
	get isActive(): boolean {
		return this.isOpen || this.selectedItems.length > 0;
	}

	private logger: ILog;
	private config: SelectConfig;
	private optionsList: SelectItem[];
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

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	onChange(option: SelectItem) {
		option.isSelected = true;
		let previous: SelectItem[] | SelectItem | null = null;
		let newValues: SelectItem[] | SelectItem | null = null;

		if (this.config.type === selectType.single) {
			for (let optionItem of this.optionsList) {
				optionItem.isSelected = optionItem.value === option.value ? true : false;
			}
			previous = this.selectedItems[0];
			this.selectedItems = [option];
			newValues = option;
		} else if (this.config.type === selectType.multi) {
			previous = _.cloneDeep(this.selectedItems);

			if (!_.find(this.selectedItems, x => x.value === option.value)) {
				this.selectedItems.push(option);
			} else {
				option.isSelected = false;
				_.remove(this.selectedItems, x => x.value === option.value);
			}
			newValues = this.selectedItems;
		}

		if (this.config.autoClose) {
			this.isOpen = false;
		}

		// todo: set selected item from the actual array.

		const event = DOM.createCustomEvent("change", { bubbles: true, detail: { previous, value: newValues } });
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
		this.selected = null;
		this.filterBy = "";
		this.selectedLabel = "";
		this.filteredOptions = this.optionsList;
		for (let option of this.optionsList) {
			option.isSelected = false;
		}

		this.isOpen = false;
		event.stopPropagation();
	}

	toggle() {
		this.isOpen = !this.isOpen;
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

		switch (this.config.type) {
			case selectType.single:
				if (_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an object!");
					return;
				}
				this.selectedItems = this.convertToSelectItems([this.selected], true);
				break;
			case selectType.multi:
				if (!_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an array!");
					return;
				}
				this.selectedItems = this.convertToSelectItems(this.selected, true);
				break;
		}

		// for (let selectedItem of this.selectedItems) {
		// 	let result = _.find(this.optionsList, x => x.value = selectedItem.value);
		// 	if (result) {
		// 		result.isSelected = true;
		// 	} else {
		// 		// todo remove
		// 	}
		// }

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
		this.selectedLabel = this.selected ? this.selected.text : "";
	}

}