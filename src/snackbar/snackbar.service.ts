import { autoinject } from "aurelia-dependency-injection";
import { BindingEngine, PropertyObserver } from "aurelia-binding";

import { SnackbarRef, SnackbarOptions } from "./snackbar-ref";

/**
 * Service to dispatch snackbar messages.
 */
@autoinject()
export class SnackbarService {

	activeItem: SnackbarRef;
	activeItem$: PropertyObserver;

	private items: SnackbarRef[];

	constructor(
		private bindingEngine: BindingEngine,
	) {
		this.items = [];
		this.activeItem$ = this.bindingEngine.propertyObserver(this, "activeItem");
	}

	open(message: string, action?: string, options?: SnackbarOptions): SnackbarRef {
		const item = new SnackbarRef(message, action, options);
		this.add(item);

		// todo: handle active better
		this.activeItem = item;
		return item;
	}

	private add(item: SnackbarRef) {
		this.items.push(item);
	}

}