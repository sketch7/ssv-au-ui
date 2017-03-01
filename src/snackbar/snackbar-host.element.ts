// import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Disposable } from "aurelia-binding";

import { SnackbarRef } from "./snackbar-ref";
import { SnackbarService } from "./snackbar.service";
// import { snackbarConfig, SnackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-snackbar-host";

@autoinject()
@customElement(PREFIX)
export class SnackbarHostElement {

	// @bindable targetHost: string;

	activeItem: SnackbarRef | null;

	private logger: ILog;
	// private config: SnackbarConfig;
	private activeItem$$: Disposable;

	constructor(
		loggerFactory: LoggerFactory,
		private snackbar: SnackbarService,
		// private element: Element,
	) {
		this.logger = loggerFactory.get("snackbarHostElement");
	}

	bind() {
		// this.setDefaults();
		this.activeItem$$ = this.snackbar.activeItem$.subscribe((x: SnackbarRef | null) => {
			this.logger.debug("activeItem$", "item changed", x);
			this.activeItem = x;
		});
	}

	detached() {
		this.activeItem$$.dispose();
	}

	// private setDefaults(): void {
	// 	this.config = _.defaults<SnackbarConfig>({
	// 	}, snackbarConfig);
	// }

}