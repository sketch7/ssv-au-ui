import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";

import { snackbarConfig, SnackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-snackbar";

@autoinject()
@customElement(PREFIX)
export class SnackbarElement {

	@bindable label: string;
	@bindable color: string;

	private logger: ILog;
	private config: SnackbarConfig;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("snackbarElement");
	}

	bind() {
		this.setDefaults();

		if (this.config.color) {
			this.element.classList.add(`${PREFIX}--${this.config.color.toLowerCase()}`);
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<SnackbarConfig>({
			color: this.color,
		}, snackbarConfig);
	}

}