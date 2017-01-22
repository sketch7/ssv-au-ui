import { LoggerFactory, ILog } from "@ssv/au-core";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";

import { attributeUtil } from "../core/index";
import { buttonType, ButtonType } from "./button.model";

const PREFIX = "ssv-button";
const SUPPORTED_TYPES: string[] = [
	buttonType.fab,
	buttonType.flat,
	buttonType.raised,
];

@autoinject()
@customAttribute(PREFIX)
export class Button {

	@bindable type: ButtonType = buttonType.flat; // todo: configureble
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("button");
		this.element.classList.add(PREFIX);
	}

	bind() {
		this.modifiers = attributeUtil.generateBemStyleModifiers(this.modifier, PREFIX);
		const typeClass = `${PREFIX}--${this.type}`;
		this.element.classList.add(typeClass);
	}

	modifierChanged(newValue: string | undefined) {
		this.modifiers = attributeUtil.generateBemStyleModifiers(newValue, PREFIX);
	}

	typeChanged(newValue: ButtonType, previousValue: ButtonType) {
		this.validateType(newValue);
		attributeUtil.changeBemModifier(PREFIX, newValue, previousValue, this.element);
	}

	private validateType(type: ButtonType) {
		if (SUPPORTED_TYPES.indexOf(type) === -1) {
			this.logger.error("validateType", "button type unsupported!", { type });
		}
	}

}
