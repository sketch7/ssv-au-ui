import * as _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { ElementSize, validateElementSize } from "../core/index";
import { iconConfig, IconConfig } from "./icon.config";

const ELEMENT_PREFIX = "ssv-icon__i";

@autoinject()
@customElement("ssv-icon")
export class IconElement {

	@bindable prefix: string;
	@bindable name: string;
	@bindable color: string;
	@bindable size: ElementSize;
	@bindable modifier: string | undefined;
	@bindable defaultClass: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private config: IconConfig;
	private iconElement: HTMLElement;

	constructor(
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("iconElement");
	}

	bind() {
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, ELEMENT_PREFIX);

	const size = this.config.size.toLowerCase();
		this.validateType(size);
		this.iconElement.classList.add(`${ELEMENT_PREFIX}--${size}`);

		let iconName = this.config.aliases ? this.config.aliases[this.name] : null;
		iconName = iconName ? iconName : this.name;

		this.iconElement.classList.add(`${this.config.prefix}${iconName}`);

		if (this.config.color) {
			this.iconElement.classList.add(`${ELEMENT_PREFIX}--${this.config.color.toLowerCase()}`);
		}

		if (this.config.defaultClass) {
			this.iconElement.classList.add(this.config.defaultClass);
		}
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, ELEMENT_PREFIX);
	}

	private validateType(size: string | ElementSize) {
		if (this.config.strictElementSize && !validateElementSize(size)) {
			this.logger.error("validateType", "icon size not supported!", { size });
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<IconConfig>({
			prefix: this.prefix,
			color: this.color,
			size: this.size,
			defaultClass: this.defaultClass
		}, iconConfig);
	}

}