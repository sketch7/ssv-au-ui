/**
 * Manages focus on an element.
 * This is needed due to fixes focus bug - https://marcysutton.com/button-focus-hell/
 *
 */
export class ElementFocusedController {

	private isMouseDown = false;
	private focusedClass: string;

	constructor(
		prefix: string,
		private element: Element
	) {
		this.focusedClass = `${prefix}--focused`;
	}

	init() {
		this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.element.addEventListener("focus", this.onFocus.bind(this));
		this.element.addEventListener("blur", this.onBlur.bind(this));
	}

	destroy() {
		this.element.removeEventListener("mousedown", this.onMouseDown);
		this.element.removeEventListener("focus", this.onFocus);
		this.element.removeEventListener("blur", this.onBlur);
	}

	private onMouseDown() {
		this.isMouseDown = true;
		setTimeout(() => this.isMouseDown = false, 100);
	}

	private onFocus() {
		if (!this.isMouseDown) {
			this.element.classList.add(this.focusedClass);
		}
	}

	private onBlur() {
		this.element.classList.remove(this.focusedClass);
	}

}