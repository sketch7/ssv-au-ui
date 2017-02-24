import { autoinject } from "aurelia-dependency-injection";
import { BindingEngine, PropertyObserver } from "aurelia-binding";
import { ILog, LoggerFactory } from "@ssv/au-core";

import { SnackbarRef, SnackbarOptions } from "./snackbar-ref";

/**
 * Service to dispatch snackbar messages.
 */
@autoinject()
export class SnackbarService {

	activeItem: SnackbarRef | null;
	activeItem$: PropertyObserver;

	private items: SnackbarRef[];
	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private bindingEngine: BindingEngine,
	) {
		this.logger = loggerFactory.get("snackbarService");
		this.items = [];
		this.activeItem$ = this.bindingEngine.propertyObserver(this, "activeItem");
		this.activeItem$.subscribe(x => {
			if (!x && this.items.length) {
				this.handleNext();
			}
		});
	}

	open(message: string, action?: string, options?: SnackbarOptions): SnackbarRef {
		const item = new SnackbarRef(message, action, options);
		item.onDismiss(() => {
			this.activeItem = null;
		});
		this.add(item);
		if (this.activeItem) {
			return item;
		}
		this.handleNext();
		return item;
	}

	private handleNext() {
		this.logger.debug("handleNext");
		const next = this.items.shift();
		if (!next) {
			return;
		}

		this.activeItem = next;
		setTimeout(() => {
			if (!this.activeItem) {
				return;
			}
			this.activeItem.dismiss();
		}, 3000); // todo: make timer configurable
	}

	private add(item: SnackbarRef) {
		this.items.push(item);
	}

}