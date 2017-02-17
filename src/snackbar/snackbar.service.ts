import { autoinject } from "aurelia-dependency-injection";
import { BindingEngine, PropertyObserver } from "aurelia-binding";

export interface SnackbarOptions {

}

export interface SnackbarItem {
	message: string;
	action?: string;
	options?: SnackbarOptions;
}

/**
 * Service to dispatch snackbar messages.
 */
@autoinject()
export class SnackbarService {

	activeItem: SnackbarItem;
	activeItem$: PropertyObserver;

	private items: SnackbarItem[];

	constructor(
		private bindingEngine: BindingEngine,
	) {
		this.items = [];
		this.activeItem$ = this.bindingEngine.propertyObserver(this, "activeItem");
	}

	open(message: string, action?: string, options?: SnackbarOptions): void {
		const item = {
			message,
			action,
			options
		};
		this.add(item);
		this.activeItem = item;
	}

	private add(item: SnackbarItem) {
		this.items.push(item);
	}

}