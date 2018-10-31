import { autoinject } from "aurelia-dependency-injection";
// import { ILog, LoggerFactory } from "@ssv/au-core";

import { SnackbarHostService } from "./snackbar/index";

@autoinject()
export class UiBootstrapper {

	// private logger: ILog;

	constructor(
		// loggerFactory: LoggerFactory,
		private snackbarHost: SnackbarHostService
	) {
		// this.logger = loggerFactory.get("uiBootstrapper");
	}

	/** Initialize services such as snackbar host. */
	async init(): Promise<void> {
		await this.snackbarHost.init();
	}

}