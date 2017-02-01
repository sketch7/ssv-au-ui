import * as _ from "lodash";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { attributeUtil } from "../core/index";
import { badgeType, BadgeType, supportedBadgeTypes } from "./badge.model";
import { badgeConfig, BadgeConfig } from "./badge.config";

const PREFIX = "ssv-badge";

@autoinject()
@customElement(PREFIX)
export class Badge {

	@bindable color: string;
	@bindable type: BadgeType = badgeType.label;
	@bindable modifier: string | undefined;

	modifiers: string | undefined;

	private logger: ILog;
	private config: BadgeConfig;

	constructor(
		private element: Element,
		loggerFactory: LoggerFactory,
	) {
		this.logger = loggerFactory.get("input");
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

	private validateType(type: string | BadgeType) {
		if (supportedBadgeTypes.indexOf(type) === -1) {
			this.logger.error("validateType", "button type unsupported!", { type });
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<BadgeConfig>({
			type: this.type,
			color: this.color
		}, badgeConfig);
	}

}