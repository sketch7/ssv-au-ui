import { customElement, ViewResources, bindable } from "aurelia-templating";
import { inject } from "aurelia-dependency-injection";

@inject(ViewResources)
@customElement("ssv-input")
export class Input {

	@bindable id: string;
	@bindable label: string;
	@bindable placeholder: string | null = null;
	@bindable disabled = false;

}