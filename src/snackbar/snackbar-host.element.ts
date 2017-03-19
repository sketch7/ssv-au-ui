import { customElement, ComponentDetached } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Disposable } from "aurelia-binding";
import { LoggerFactory, ILog } from "@ssv/au-core";

import { SnackbarRef } from "./snackbar-ref";
import { SnackbarService } from "./snackbar.service";

const PREFIX = "ssv-snackbar-host";

@autoinject()
@customElement(PREFIX)
export class SnackbarHostElement implements ComponentDetached {

	activeItem: SnackbarRef | null;

	private logger: ILog;
	private activeItem$$: Disposable;

	constructor(
		loggerFactory: LoggerFactory,
		private snackbar: SnackbarService,
	) {
		this.logger = loggerFactory.get("snackbarHostElement");
	}

	bind() {
		this.activeItem = this.snackbar.activeItem;
		this.activeItem$$ = this.snackbar.activeItem$.subscribe(x => {
			this.logger.debug("activeItem$", "item changed", x);
			this.activeItem = x;
		});
	}

	detached() {
		this.activeItem$$.dispose();
	}

}