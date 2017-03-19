import { autoinject, Container } from "aurelia-dependency-injection";
import { TemplatingEngine, ViewResources, ViewSlot, Controller, View } from "aurelia-templating";
import { ILog, LoggerFactory } from "@ssv/au-core";

import { SnackbarHostElement } from "./snackbar-host.element";

@autoinject()
export class SnackbarHostService {

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private templatingEngine: TemplatingEngine,
		private container: Container,
		private viewResources: ViewResources
	) {
		this.logger = loggerFactory.get("SnackbarHostService");
	}

	/** Initialize the snackbar host (container) in order to show snackbars. */
	async init(): Promise<View | Controller> {
		const viewController = await this.templatingEngine.compose({
			host: document.body,
			container: this.container,
			bindingContext: {},
			viewModel: this.container.get(SnackbarHostElement),
			viewResources: this.viewResources,
			viewSlot: new ViewSlot(document.body, true)
		});
		viewController.attached();
		return viewController;
	}

}