import { customElement, bindable, Animator, ComponentAttached, ComponentDetached } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";

import { SnackbarRef } from "./snackbar-ref";
import { snackbarConfig } from "./snackbar.config";

const PREFIX = "ssv-simple-snackbar";
const ACTIVE_CLASS = `${PREFIX}--active`;

@autoinject()
@customElement(PREFIX)
export class SimpleSnackbarElement implements ComponentAttached, ComponentDetached {

	@bindable snackbarRef!: SnackbarRef;

	label: string | undefined;
	action: string | undefined;
	actionColor = snackbarConfig.actionColor;
	actionType = snackbarConfig.actionType;

	private timeoutToken: number | undefined;
	private isAttached = false;

	constructor(
		private element: Element,
		private animator: Animator
	) {
	}

	attached() {
		this.isAttached = true;
		this.handleChange();
	}

	detached() {
		this.isAttached = false;
	}

	snackbarRefChanged() {
		if (this.isAttached) {
			this.handleChange();
		}
	}

	onAction() {
		this.snackbarRef._triggerAction();
	}

	private async handleChange() {
		this.label = this.snackbarRef.message;
		this.action = this.snackbarRef.action;

		this.snackbarRef._onPreDismiss(() => {
			// this.logger.debug("handleChange", "dismissed");
			this.hide();
		});

		await this.animator.enter(this.element as HTMLElement);
		this.element.classList.add(ACTIVE_CLASS);

		this.timeoutToken = setTimeout(() => {
			this.snackbarRef.dismiss();
		}, this.snackbarRef.options.duration);
	}

	private async hide() {
		await this.animator.leave(this.element as HTMLElement);
		this.element.classList.remove(ACTIVE_CLASS);
		this.snackbarRef._triggerDismiss();
		if (this.timeoutToken) {
			clearTimeout(this.timeoutToken);
			this.timeoutToken = undefined;
		}
	}

}