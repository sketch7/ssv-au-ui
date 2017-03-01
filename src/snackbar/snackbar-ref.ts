import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { snackbarConfig } from "./snackbar.config";

export interface SnackbarOptions {

	/**
	 * Duration in millis.
	 */
	duration: number;
}

// todo: remove state?
export type SnackbarState = "initial" | "visible" | "complete";
export const snackbarState = {
	initial: "initial" as SnackbarState,
	visible: "visible" as SnackbarState,
	complete: "complete" as SnackbarState,
};

const ACTION_EVENT = "action";
const DISMISS_EVENT = "dismiss";
const PRE_DISMISS_EVENT = "preDismiss";

export class SnackbarRef {

	state: SnackbarState = snackbarState.initial;
	readonly options: SnackbarOptions;

	private eventAggregator = new EventAggregator();

	constructor(
		public readonly message: string,
		public readonly action?: string,
		readonly opts?: SnackbarOptions,
	) {
		this.onAction(this.dismiss.bind(this));
		this.options = { duration: snackbarConfig.duration, ...opts };
	}

	onAction(callback: () => void): Subscription {
		return this.eventAggregator.subscribe(ACTION_EVENT, callback);
	}

	onDismiss(callback: () => void) {
		return this.eventAggregator.subscribe(DISMISS_EVENT, callback);
	}

	dismiss() {
		this.eventAggregator.publish(PRE_DISMISS_EVENT, this);
	}

	/* @internal */
	_onPreDismiss(callback: () => void) {
		return this.eventAggregator.subscribe(PRE_DISMISS_EVENT, callback);
	}

	/* @internal */
	_triggerAction() {
		this.eventAggregator.publish(ACTION_EVENT, this);
	}

	/* @internal */
	_triggerDismiss() {
		this.eventAggregator.publish(DISMISS_EVENT, this);
	}

}