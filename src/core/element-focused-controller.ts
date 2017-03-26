import { EventAggregator, Subscription } from "aurelia-event-aggregator";

const FOCUS_EVENT = "focus";
const BLUR_EVENT = "blur";

/**
 * Manages focus on an element.
 * This is needed due to fixes focus bug - https://marcysutton.com/button-focus-hell/
 *
 */
export class ElementFocusedController {

	private isMouseDown = false;
	private focusedClass: string;

	private eventAggregator = new EventAggregator();

	constructor(
		prefix: string,
		private element: Element
	) {
		this.focusedClass = `${prefix}--focused`;
	}

	init() {
		this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.element.addEventListener("focus", this.onFocused.bind(this));
		this.element.addEventListener("blur", this.onBlurred.bind(this));
	}

	destroy() {
		this.element.removeEventListener("mousedown", this.onMouseDown);
		this.element.removeEventListener("focus", this.onFocused);
		this.element.removeEventListener("blur", this.onBlurred);
	}

	/**
	 * Subscribe on focus callback.
	 *
	 * @param callback function to invoke when focused.
	 * @returns {Subscription} subscription to be able to dispose the listener.
	 */
	onFocus(callback: (e: FocusEvent) => void): Subscription {
		return this.eventAggregator.subscribe(FOCUS_EVENT, callback);
	}

	/**
	 * Subscribe on blur callback.
	 *
	 * @param callback function to invoke when blur.
	 * @returns {Subscription} subscription to be able to dispose the listener.
 */
	onBlur(callback: (e: FocusEvent) => void): Subscription {
		return this.eventAggregator.subscribe(BLUR_EVENT, callback);
	}

	private onMouseDown() {
		this.isMouseDown = true;
		setTimeout(() => this.isMouseDown = false, 100);
	}

	private onFocused(e: FocusEvent) {
		if (!this.isMouseDown) {
			this.element.classList.add(this.focusedClass);
			this.eventAggregator.publish(FOCUS_EVENT, e);
		}
	}

	private onBlurred(e: FocusEvent) {
		this.element.classList.remove(this.focusedClass);
		this.eventAggregator.publish(BLUR_EVENT, e);
	}

}