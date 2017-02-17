import { DOM } from "aurelia-pal";
import { customElement, bindable } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

const PREFIX = "ssv-simple-snackbar";

@autoinject()
@customElement(PREFIX)
export class SimpleSnackbarElement {

	@bindable label: string;
	@bindable action: string;

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
	) {
		this.logger = loggerFactory.get("simpleSnackbarElement");
	}

	onAction() {
		this.logger.debug("onAction");
		const event = DOM.createCustomEvent("action", {});
		this.element.dispatchEvent(event);
	}

}