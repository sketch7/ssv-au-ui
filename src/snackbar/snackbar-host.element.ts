import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
// import { observable } from "aurelia-binding";

// import { SnackbarService } from "./snackbar.service";
import { snackbarConfig, SnackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-snackbar-host";

@autoinject()
@customElement(PREFIX)
export class SnackbarHostElement {

	@bindable targetHost: string;

	private logger: ILog;
	private config: SnackbarConfig;

	constructor(
		loggerFactory: LoggerFactory,
		// snackbar: SnackbarService,
		// private element: Element,
	) {
		this.logger = loggerFactory.get("snackbarHostElement");
	}

	bind() {
		this.setDefaults();
	}

	onAction($event: Event) {
		this.logger.debug("onAction", "", $event);
	}

	private setDefaults(): void {
		this.config = _.defaults<SnackbarConfig>({
		}, snackbarConfig);
	}

}