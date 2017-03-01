import { autoinject } from "aurelia-dependency-injection";
import { BindingEngine, Disposable } from "aurelia-binding";
import { Subscription } from "aurelia-event-aggregator";
import { ILog, LoggerFactory } from "@ssv/au-core";

import { SnackbarRef, SnackbarOptions } from "./snackbar-ref";

// todo: remove when merged https://github.com/aurelia/binding/pull/580
/**
 * Observes property changes.
 */
export interface PropertyObserver<T> {
	/**
 	* Subscribe to property change events.
 	*/
	subscribe(callback: (newValue: T, oldValue: T) => void): Disposable;
}


/**
 * Service to dispatch snackbar messages.
 */
@autoinject()
export class SnackbarService {

	activeItem: SnackbarRef | null;
	activeItem$: PropertyObserver<SnackbarRef | null>;

	private items: SnackbarRef[];
	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private bindingEngine: BindingEngine,
	) {
		this.logger = loggerFactory.get("snackbarService");
		this.items = [];
		this.activeItem$ = this.bindingEngine.propertyObserver(this, "activeItem");
	}

	/**
	 * Opens a snackbar with a message and an optional action.
	 *
	 * @param {string} message message to show.
	 * @param {string} [action] label for the action button.
	 * @param {SnackbarOptions} [options] Additional configuration options for the snackbar.
	 */
	open(message: string, action?: string, options?: SnackbarOptions): SnackbarRef {
		const item = new SnackbarRef(message, action, options);
		const dismiss$$ = item.onDismiss(() => this.handleNext());
		item._onPreDismiss(() => this.handleDismissWhenQueued(item, dismiss$$));

		this.items.push(item);
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
			this.activeItem = null;
			return;
		}
		this.activeItem = next;
	}

	private handleDismissWhenQueued(item: SnackbarRef, dismiss$$: Subscription) {
		const index = this.items.indexOf(item);
		if (index < 0) {
			return;
		}
		dismiss$$.dispose(); // skip handleNext in this case.
		this.items.splice(index, 1);
		item._triggerDismiss();
	}

}