import * as _ from "lodash";
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

	private config: WavesConfig;

	constructor(
		private element: Element,
	) {
	}

	attached() {
		this.setDefaults();
		attach(this.element, this.type);
	}

	typeChanged(newValue: string, previousValue: string) {
		this.element.classList.remove(previousValue);
		if (newValue) {
			this.element.classList.add(newValue);
		}
	}

	private setDefaults(): void {
		this.config = _.defaults<WavesConfig>({
			type: this.type,
		}, wavesConfig);
	}

}