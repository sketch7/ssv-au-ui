import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { computedFrom, bindingMode, BindingEngine } from "aurelia-binding";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Subscription } from "aurelia-event-aggregator";
import { Dictionary, KeyCode } from "@ssv/core";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil, ElementFocusedController } from "../core/index";
import { SelectType, selectType, supportedSelectTypes, SelectItem, SelectGroup } from "./select.model";
import { selectConfig, SelectConfig } from "./select.config";

const PREFIX = "ssv-select";

@autoinject()
@customElement(PREFIX)
export class SelectElement {
	static id = 0;

	@bindable color: string;
	@bindable placeholder: string;
	@bindable selectedClass: string | undefined;
	@bindable autoClose: boolean;
	@bindable allowClear: boolean;
	@bindable allowFiltering: boolean;
	@bindable filterPlaceholder: string;
	@bindable type: SelectType;
	@bindable modifier: string | undefined;
	@bindable disabled: boolean | string = false;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) selected: any | undefined;
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
	filteredGroupOptions: SelectGroup[] = [];
	noOptionsAvailableText: string;
	focusValue: string;

	@computedFrom("isOpen", "selectedItems")
	get isActive(): boolean {
		return this.isOpen || this.selectedItems.length > 0;
	}

	private logger: ILog;
	private config: SelectConfig;
	private items: SelectItem[];
	private selectedItems: SelectItem[] = [];
	private flattenedFilteredGroupOptions: SelectItem[];
	private optionsMap: Dictionary<object> = {};
	private isComplexList: boolean;

	private focusedController: ElementFocusedController;
	private focus$$: Subscription;
	private input$$: Subscription;

	constructor(
		private element: Element,
		private bindingEngine: BindingEngine,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("selectElement");
		this.controlId = `${PREFIX}-${SelectElement.id++}`;
		this.focusedController = new ElementFocusedController(PREFIX, element);
		const input$ = this.bindingEngine.propertyObserver(this, "input");
		this.input$$ = input$.subscribe((inputElement: HTMLInputElement) => {
			if (!inputElement) {
				return;
			}
			inputElement.focus();
		});
	}

	bind() {
		this.presetBooleanTypes();
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		this.selectedClass = attributeUtil.generateBemStyleModifiers(this.config.selectedClass, `${PREFIX}__item`);

		const type = this.config.type.toLowerCase();
		this.element.classList.add(`${PREFIX}--${type}`);
		this.labelModifierClass = attributeUtil.generateBemStyleModifiers(type, `${PREFIX}__label`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.focusedController.init();
		this.focus$$ = this.focusedController.onFocus(() => this.toggle());
		this.element.addEventListener("keydown", this.onFocusedKeyPress.bind(this));
		DOM.addEventListener("click", this.onBodyClick.bind(this), true);
	}

	detached() {
		this.focusedController.destroy();
		this.focus$$.dispose();
		this.input$$.dispose();
		this.element.removeEventListener("keydown", this.onFocusedKeyPress);
		DOM.removeEventListener("click", this.onBodyClick, true);
	}

	selectedChanged(value: any) {
		this.onSelectedChanged(value);
	}

	optionsChanged(options: any[]) {
		this.onOptionsChanged(options);
	}

	disabledChanged(newValue: boolean) {
		if (this.disabled) {
			this.isOpen = false;
		}
		attributeUtil.setAsFlag(this.element, "disabled", newValue);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	filterOptions(searchTerm: string) {
		let filteredOptions = this.items;
		if (!searchTerm) {
			this.groupedOptions(filteredOptions);
			return;
		}

		filteredOptions = _.filter(this.items, item => {
			return _.includes(item.text.toLowerCase(), searchTerm.toLowerCase());
		});
		this.groupedOptions(filteredOptions);
	}

	onClear() {
		this.filterBy = "";
		this.isOpen = false;
		this.selected = undefined;
		this.selectedItems = [];
		this.groupedOptions(this.items);

		for (let item of this.items) {
			item.isSelected = false;
		}
	}

	onDeselect(optionValue: string) {
		this.clearSelectionItem(optionValue);
	}

	toggle() {
		if (this.disabled) {
			return;
		}
		this.isOpen = !this.isOpen;
		if (this.isOpen) {
			this.setFocusValue();
		}
	}

	onBodyClick(event: Event): void {
		if (!this.isOpen || event.target === this.element
			|| this.element.contains(event.target as Node)) {
			return;
		}
		this.isOpen = false;
	}

	onChange(option: SelectItem) {
		let previous: any | undefined;

		if (this.config.type === selectType.single) {
			previous = this.selectedItems.length > 0 ? this.optionsMap[this.selectedItems[0].value] : undefined;
			this.selected = this.optionsMap[option.value];
		} else if (this.config.type === selectType.multi) {
			previous = [];
			this.selected = this.selected ? this.selected : [];
			for (const item of this.selectedItems) {
				previous.push(this.optionsMap[item.value]);
			}

			if (!_.find(this.selectedItems, x => x.value === option.value)) {
				this.selected = [...this.selected, this.optionsMap[option.value]];
			} else {
				this.clearSelectionItem(option.value);
			}
		}

		const event = DOM.createCustomEvent("change", { bubbles: true, detail: { previous, value: this.selected } });
		this.element.dispatchEvent(event);
	}

	private onFocusedKeyPress(e: KeyboardEvent) {
		switch (e.keyCode) {
			case KeyCode.Tab:
			case KeyCode.Escape:
				this.isOpen = false;
				break;
			case KeyCode.Enter:
				if (this.isOpen) {
					const selectedItem = _.find(this.flattenedFilteredGroupOptions, x => x.value === this.focusValue)!;
					this.onChange(selectedItem);
				} else {
					this.isOpen = true;
				}
				e.preventDefault();
				break;
			case KeyCode.UpArrow: {
				this.isOpen = true;
				this.setFocusValue(KeyCode.UpArrow);
				e.preventDefault();
				break;
			}
			case KeyCode.DownArrow: {
				this.isOpen = true;
				this.setFocusValue(KeyCode.DownArrow);
				e.preventDefault();
				break;
			}
			case KeyCode.Space:
				if (!this.isOpen) {
					this.isOpen = true;
					e.preventDefault();
				}
				break;
			case KeyCode.Backspace:
				if (!this.isOpen && !_.isEmpty(this.selectedItems)) {
					const selectedItem = _.last(this.selectedItems);
					this.onChange(selectedItem);
					e.preventDefault();
				}
				break;
		}
	}

	private onSelectedChanged(selectedItem: any) {
		if (this.config.autoClose) {
			this.isOpen = false;
		}

		if (!selectedItem) {
			this.selectedItems = [];
			return;
		}

		const list = this.config.type === selectType.single
			? this.convertToSelectItems([selectedItem], true)
			: this.convertToSelectItems(selectedItem, true);

		for (let item of this.items) {
			item.isSelected = false;
		}

		this.selectedItems = [];
		for (const option of list) {
			const item = _.find(this.items, x => x.value === option.value);
			if (!item) {
				continue;
			}
			item.isSelected = true;
			this.selectedItems.push(item);
		}
	}

	private setFocusValue(position: (KeyCode.UpArrow | KeyCode.DownArrow) | null = null) {
		if (_.isEmpty(this.flattenedFilteredGroupOptions)) {
			return;
		}
		if (position) {
			let index = _.findIndex(this.flattenedFilteredGroupOptions, x => x.value === this.focusValue);

			if (position === KeyCode.UpArrow && index > 0) {
				this.focusValue = this.flattenedFilteredGroupOptions[--index].value;
			} else if (position === KeyCode.DownArrow && index + 1 < this.flattenedFilteredGroupOptions.length) {
				this.focusValue = this.flattenedFilteredGroupOptions[++index].value;
			}
			return;
		}

		this.focusValue = _.isEmpty(this.selectedItems)
			? this.flattenedFilteredGroupOptions[0].value
			: _.last(this.selectedItems).value;
	}

	private convertToSelectItems(options: any[], isSelected = false): SelectItem[] {
		if (_.isEmpty(options)) {
			return [];
		}

		return this.isComplexList
			? this.convertObjectToSelectItems(options, isSelected)
			: this.convertSimpleToSelectItems(options, isSelected);
	}

	private convertSimpleToSelectItems(options: Array<string | boolean | number>, isSelected = false): SelectItem[] {
		return _.map(options, item => {
			return {
				value: item,
				text: item,
				groupBy: "",
				isSelected
			} as SelectItem;
		});
	}

	private convertObjectToSelectItems(options: any[], isSelected = false): SelectItem[] {
		return _.map(options, item => {
			return {
				value: item[this.config.dataValueField],
				text: item[this.config.dataTextField],
				groupBy: item[this.groupby!],
				isSelected
			} as SelectItem;
		});
	}

	private clearSelectionItem(optionValue: string) {
		if (this.isComplexList) {
			this.selected = _.filter(this.selected, (x: object & { [key: string]: any }) => x[this.config.dataValueField] !== optionValue);
			return;
		}

		this.selected = _.filter(this.selected, x => x !== optionValue);
	}

	private validateType(type: string | SelectType) {
		if (supportedSelectTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "select type unsupported!", { type });
		}
	}

	private validateSelectedType() {
		switch (this.config.type) {
			case selectType.single:
				if (_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an object!");
				}
				break;
			case selectType.multi:
				if (!_.isArray(this.selected)) {
					this.logger.error("validateSelectedType", "selected value should be an array!");
				}
				break;
		}
	}

	private groupedOptions(options: SelectItem[]) {
		const grouped = _.groupBy(options, x => x.groupBy);
		this.filteredGroupOptions = _.map(grouped, (values, key) => {
			return {
				name: key !== "undefined" ? key : undefined,
				options: values
			};
		});

		this.flattenedFilteredGroupOptions = _.flatMap<SelectItem>(this.filteredGroupOptions, item => item.options);
	}

	private cleanseSelectedItems() {
		if (_.isNil(this.selected)) {
			return;
		}

		const list = this.config.type === selectType.single
			? this.convertToSelectItems([this.selected], true)
			: this.convertToSelectItems(this.selected, true);

		for (const item of list) {
			const exist = this.optionsMap[item.value];
			if (exist) {
				continue;
			}

			if (this.config.type === selectType.single) {
				this.selected = undefined;
				return;
			}
			this.clearSelectionItem(item.value);
		}
	}

	private onOptionsChanged(options: any[]) {
		options = options || [];
		options = options.filter(x => !_.isNil(x));
		this.isComplexList = _.isObject(options[0]);
		this.items = this.convertToSelectItems(options);

		_.zipWith(options, this.items, (original: any, internal: SelectItem) => {
			this.optionsMap[internal.value] = original;
		});

		this.groupedOptions(this.items);
		this.cleanseSelectedItems();
		this.onSelectedChanged(this.selected);
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
			dataValueField: this.value
		}, selectConfig);

		this.validateType(this.config.type.toLowerCase());
		this.validateSelectedType();

		this.arrowUpIcon = this.config.arrowUpIcon;
		this.arrowDownIcon = this.config.arrowDownIcon;
		this.clearIcon = this.config.clearIcon;
		this.allowClear = this.config.allowClear;
		this.allowFiltering = this.config.allowFiltering;
		this.filterPlaceholder = this.config.filterPlaceholder;
		this.noOptionsAvailableText = this.config.noOptionsAvailableText;

		this.onOptionsChanged(this.options);
	}

	private presetBooleanTypes() {
		this.disabled = attributeUtil.getFlagAsBoolean(this.disabled);
		attributeUtil.setAsFlag(this.element, "disabled", this.disabled);
		if (this.autoClose) {
			this.autoClose = attributeUtil.getFlagAsBoolean(this.autoClose);
		}
		if (this.allowClear) {
			this.allowClear = attributeUtil.getFlagAsBoolean(this.allowClear);
		}
		if (this.allowFiltering) {
			this.allowFiltering = attributeUtil.getFlagAsBoolean(this.allowFiltering);
		}
	}

}