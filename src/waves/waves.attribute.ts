import _ from "lodash";
import { customAttribute, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { attach } from "node-waves";

import { WavesConfig, wavesConfig } from "./waves.config";

const PREFIX = "ssv-waves";

@autoinject()
@customAttribute(PREFIX)
export class WavesAttribute {

	@bindable({
		primaryProperty: true,
	}) type: string | undefined;

	private config!: WavesConfig;

	constructor(
		private element: HTMLElement, // todo: test!!!! previous value was: Element
	) {
		this.element.classList.add(PREFIX);
	}

	attached() {
		this.setDefaults();
		attach(this.element, this.config.type);
	}

	typeChanged(newValue: string, previousValue: string) {
		this.element.classList.remove(previousValue);
		if (newValue) {
			this.element.classList.add(newValue);
		}
	}

	private setDefaults(): void {
		this.config = _.defaults({
			type: this.type,
		}, wavesConfig);
	}

}