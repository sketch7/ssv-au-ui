import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { attach } from "node-waves";

const PREFIX = "ssv-waves";

@autoinject()
@customAttribute(PREFIX)
export class WavesAttribute {

	@bindable({
		primaryProperty: true,
	}) type: string | undefined;

	constructor(
		private element: Element,
	) {
	}

	attached() {
		attach(this.element, this.type);
	}

	typeChanged(newValue: string, previousValue: string) {
		this.element.classList.remove(previousValue);
		if (newValue) {
			this.element.classList.add(newValue);
		}
	}

}