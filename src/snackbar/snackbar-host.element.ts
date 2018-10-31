import { customElement, ComponentDetached } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Disposable } from "aurelia-binding";

import { SnackbarRef } from "./snackbar-ref";
import { SnackbarService } from "./snackbar.service";

const PREFIX = "ssv-snackbar-host";

@autoinject()
@customElement(PREFIX)
export class SnackbarHostElement implements ComponentDetached {

	activeItem: SnackbarRef| null | undefined;

	private activeItem$$!: Disposable;

	constructor(
		private snackbar: SnackbarService,
	) {
	}

	bind() {
		this.activeItem = this.snackbar.activeItem;
		this.activeItem$$ = this.snackbar.activeItem$.subscribe(x => {
			this.activeItem = x;
		});
	}

	detached() {
		this.activeItem$$.dispose();
	}

}