import * as _ from "lodash";
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

	@bindable color: string;
	@bindable placeholder: string;
	@bindable selected: SelectItem;
	@bindable selectedValue = "";
	@bindable selectedClass = "selected"; // todo move to config
	@bindable options: SelectItem[] = [];


	@bindable type: SelectType = selectType.single;
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private isFocused = false;
	private logger: ILog;
	private config: SelectConfig;
	private div: HTMLDivElement;

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("selectElement");
	}

	bind() {
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);

		const type = this.config.type.toLowerCase();
		this.validateType(type);
		this.element.classList.add(`${PREFIX}--${type}`);

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	attached() {
		this.logger.debug("attached", "init", this.div);
		this.div.addEventListener("focus", this.onInputFocus.bind(this));
		this.div.addEventListener("blur", this.onInputBlur.bind(this));
	}

	detached() {
		this.div.removeEventListener("focus", this.onInputFocus);
		this.div.removeEventListener("blur", this.onInputBlur);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	private onInputFocus() {
		this.logger.debug("onInputFocus", "init");
		this.isFocused = true;
	}

	private onInputBlur() {
		this.logger.debug("onInputBlur", "init");
		this.isFocused = false;
	}

	private validateType(type: string | SelectType) {
		if (supportedSelectTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "select type unsupported!", { type });
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<SelectConfig>({
			type: this.type,
			color: this.color
		}, selectConfig);
	}

}