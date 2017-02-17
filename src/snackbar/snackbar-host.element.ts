import * as _ from "lodash";
import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Disposable } from "aurelia-binding";

import { SnackbarService, SnackbarItem } from "./snackbar.service";
import { snackbarConfig, SnackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-snackbar-host";

@autoinject()
@customElement(PREFIX)
export class SnackbarHostElement {

	@bindable targetHost: string;

	activeItem: SnackbarItem;

	private logger: ILog;
	private config: SnackbarConfig;
	private activeItem$$: Disposable;

	constructor(
		loggerFactory: LoggerFactory,
		private snackbar: SnackbarService,
		// private element: Element,
	) {
		this.logger = loggerFactory.get("snackbarHostElement");
	}

	bind() {
		this.setDefaults();
		this.activeItem$$ = this.snackbar.activeItem$.subscribe(x => {
			this.logger.debug("activeItem$", "item changed", x);
			this.activeItem = x;
		});
	}

	onAction($event: Event) {
		this.logger.debug("onAction", "", $event);
		// todo: trigger onAction
	}

	private setDefaults(): void {
		this.config = _.defaults<SnackbarConfig>({
		}, snackbarConfig);
	}

}