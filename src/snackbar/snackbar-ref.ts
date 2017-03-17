import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { snackbarConfig } from "./snackbar.config";

export interface SnackbarOptions {

	/**
	 * Duration in millis.
	 */
	duration: number;
}

const ACTION_EVENT = "action";
const DISMISS_EVENT = "dismiss";
const PRE_DISMISS_EVENT = "preDismiss";

export class SnackbarRef {

	readonly options: SnackbarOptions;

	private eventAggregator = new EventAggregator();

	constructor(
		public readonly message: string,
		public readonly action?: string,
		opts?: SnackbarOptions,
	) {
		this.onAction(this.dismiss.bind(this));
		this.options = { duration: snackbarConfig.duration, ...opts };
	}

	/**
	 * Subscribe on action callback.
	 *
	 * @param callback function to invoke when action is triggered.
	 * @returns {Subscription} subscription to be able to dispose the listener.
	 */
	onAction(callback: () => void): Subscription {
		return this.eventAggregator.subscribe(ACTION_EVENT, callback);
	}

	/**
	 * Subscribe on dismiss callback.
	 *
	 * @param callback function to invoke when dismissed.
	 * @returns {Subscription} subscription to be able to dispose the listener.
	 */
	onDismiss(callback: () => void): Subscription {
		return this.eventAggregator.subscribe(DISMISS_EVENT, callback);
	}

	/** Dismisses the snackbar. */
	dismiss() {
		this.eventAggregator.publish(PRE_DISMISS_EVENT, this);
	}

	/* @internal */
	_onPreDismiss(callback: () => void): Subscription {
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