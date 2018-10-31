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

	private _onBlurred = this.onBlurred.bind(this);
	private _onFocused = this.onFocused.bind(this);
	private _onMouseDown = this.onMouseDown.bind(this);

	constructor(
		prefix: string,
		private element: Element
	) {
		this.focusedClass = `${prefix}--focused`;
	}

	init() {
		this.element.addEventListener("blur", this._onBlurred);
		this.element.addEventListener("focus", this._onFocused);
		this.element.addEventListener("mousedown", this._onMouseDown);
	}

	destroy() {
		this.element.removeEventListener("blur", this._onBlurred);
		this.element.removeEventListener("focus", this._onFocused);
		this.element.removeEventListener("mousedown", this._onMouseDown);
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