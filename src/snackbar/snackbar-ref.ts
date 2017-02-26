import { EventAggregator, Subscription } from "aurelia-event-aggregator";

export interface SnackbarOptions {

}

const ACTION_EVENT = "action";
const DISMISS_EVENT = "dismiss";

export class SnackbarRef {

	private eventAggregator = new EventAggregator();

	constructor(
		public readonly message: string,
		public readonly action?: string,
		public readonly options?: SnackbarOptions,
	) {
		this.onAction(this.dismiss.bind(this));
	}

	onAction(callback: () => void): Subscription {
		return this.eventAggregator.subscribe(ACTION_EVENT, callback);
	}

	onDismiss(callback: () => void) {
		return this.eventAggregator.subscribe(DISMISS_EVENT, callback);
	}

	/* @internal */
	_triggerAction() {
		this.eventAggregator.publish(ACTION_EVENT, this);
	}

	dismiss() {
		this.eventAggregator.publish(DISMISS_EVENT, this);
	}

}