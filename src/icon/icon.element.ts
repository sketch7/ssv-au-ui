import * as _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { ElementSize, validateElementSize } from "../core/index";
import { iconConfig, IconConfig } from "./icon.config";

const ELEMENT_PREFIX = "ssv-icon";

@autoinject()
@customElement(ELEMENT_PREFIX)
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

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("iconElement");
	}

	bind() {
		this.setDefaults();
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, ELEMENT_PREFIX);

		const size = this.config.size.toLowerCase();
		this.validateType(size);
		this.element.classList.add(`${ELEMENT_PREFIX}--${size}`);

		let iconName = this.config.aliases ? this.config.aliases[this.name] : null;
		iconName = iconName ? iconName : this.name;

		this.element.classList.add(`${this.config.prefix}${iconName}`);

		if (this.config.color) {
			this.element.classList.add(`${ELEMENT_PREFIX}--${this.config.color.toLowerCase()}`);
		}

		if (this.config.defaultClass) {
			this.element.classList.add(this.config.defaultClass);
		}
	}

	nameChanged(newValue: string | undefined, previous: string | undefined) {
		this.element.classList.remove(`${this.config.prefix}${previous}`);
		this.element.classList.add(`${this.config.prefix}${newValue}`);
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