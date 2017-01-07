import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, ViewResources, bindable, View, processAttributes } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { Themable, StyleEngine, processDesignAttributes } from "../ux/index";

@autoinject()
@customElement("ssv-input")
@processAttributes(processDesignAttributes)
export class Input implements Themable {

	@bindable id: string;
	@bindable label: string;
	@bindable placeholder: string | null = null;
	@bindable disabled = false;
	@bindable theme: string | null = null;

	view: View;

	private logger: ILog;

	constructor(
		public resources: ViewResources,
		private styleEngine: StyleEngine,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("input");
	}

	created(_: any, myView: View) {
		this.view = myView;
		this.logger.debug("created");
	}

	bind() {
		this.logger.debug("bind");
		if (this.theme) {
			this.styleEngine.applyTheme(this, this.theme);
		}
	}

	themeChanged(newValue: string | null) {
		this.logger.debug("themeChanged");
		this.styleEngine.applyTheme(this, newValue);
	}

}