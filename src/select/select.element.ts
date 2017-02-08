import * as _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { selectType, SelectType, supportedSelectTypes } from "./select.model";
import { selectConfig, SelectConfig } from "./select.config";

const PREFIX = "ssv-select";

@autoinject()
@customElement(PREFIX)
export class SelectElement {

	@bindable color: string;
	@bindable type: SelectType = selectType.single;
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private config: SelectConfig;

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

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
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