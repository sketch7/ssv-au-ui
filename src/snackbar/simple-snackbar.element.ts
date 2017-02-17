import * as _ from "lodash";
import { DOM } from "aurelia-pal";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { snackbarConfig, SnackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-simple-snackbar";

@autoinject()
@customElement(PREFIX)
export class SimpleSnackbarElement {

	@bindable label: string;
	@bindable action: string;
	@bindable color: string;

	private logger: ILog;
	private config: SnackbarConfig;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("simpleSnackbarElement");
	}

	bind() {
		this.setDefaults();

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	onAction() {
		this.logger.debug("onAction");
		const event = DOM.createCustomEvent("action", {});
		this.element.dispatchEvent(event);
	}

	private setDefaults(): void {
		this.config = _.defaults<SnackbarConfig>({
			color: this.color,
		}, snackbarConfig);
	}

}