import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { selectType, SelectType, supportedSelectTypes, SelectItem } from "./select.model";
import { selectConfig, SelectConfig } from "./select.config";

const PREFIX = "ssv-select";

@autoinject()
@customElement(PREFIX)
export class SelectElement {
	static id = 0;

	@bindable color: string;
	@bindable placeholder: string;
	@bindable selected: SelectItem | null;
	@bindable selectedValue = "";
	@bindable selectedClass: string;
	@bindable options: SelectItem[] = [];

	@bindable autoClose: boolean;
	@bindable allowClear: boolean;
	@bindable allowFiltering: boolean;

	@bindable type: SelectType = selectType.single;
	@bindable modifier: string | undefined;

	controlId: string;
	modifiers: string | undefined;
	isOpen = false;
	arrowUpIcon: string;
	arrowDownIcon: string;
	clearIcon: string;

	private logger: ILog;
	private config: SelectConfig;

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
		this.selectedClass = attributeUtil.generateBemStyleModifiers(this.config.selectedClass, `${PREFIX}__item`) as string;

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	onChange(value: SelectItem) {
		const event = DOM.createCustomEvent("change", { bubbles: true, detail: { previous: this.selected, value } });

		for (let option of this.options) {
			option.isSelected = false;
		}

		this.selected = value;
		this.selected.isSelected = true;

		if (this.config.autoClose) {
			this.isOpen = false;
		}

		this.element.dispatchEvent(event);
	}

	onClear(event: MouseEvent) {
		this.selected = null;
		for (let option of this.options) {
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

	private setDefaults(): void {
		this.config = _.defaults<SelectConfig>({
			type: this.type,
			color: this.color,
			autoClose: this.autoClose,
			allowClear: this.allowClear,
			allowFiltering: this.allowFiltering,
			selectedClass: this.selectedClass,
		}, selectConfig);

		this.arrowUpIcon = this.config.arrowUpIcon;
		this.arrowDownIcon = this.config.arrowDownIcon;
		this.clearIcon = this.config.clearIcon;
		this.allowClear = this.config.allowClear;
	}

}