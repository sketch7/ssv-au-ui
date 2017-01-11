import { LoggerFactory, ILog } from "@ssv/au-core";
import { customElement, ViewResources, bindable, View, processAttributes } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { bindingMode } from "aurelia-binding";
import { Themable, StyleEngine, processDesignAttributes } from "../ux/index";

@autoinject()
@customElement("ssv-input")
@processAttributes(processDesignAttributes)
export class Input implements Themable {
	static id = 0;

	@bindable({
		defaultBindingMode: bindingMode.twoWay
	}) value: string;
	@bindable label: string;
	@bindable placeholder: string | null = null;
	@bindable disabled: boolean | string = false;
	@bindable theme: string | null = null;

	view: View;
	input: HTMLInputElement;
	controlId: string;
	isFocused = false;

	get isActive(): boolean {
		return !!this.value || !!this.placeholder || this.isFocused;
	}

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		public resources: ViewResources,
		private styleEngine: StyleEngine,
	) {
		this.logger = loggerFactory.get("input");
		this.controlId = `ssv-input-${Input.id++}`;
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
		this.disabled = getAttributeFlagAsBoolean(this.disabled);
		this.input.disabled = this.disabled;
	}

	attached() {
		this.logger.debug("attached", "init", { disabled: this.disabled });
		this.input.addEventListener("focus", this.onInputFocus.bind(this));
		this.input.addEventListener("blur", this.onInputBlur.bind(this));
	}

	detached() {
		this.input.removeEventListener("focus", this.onInputFocus);
		this.input.removeEventListener("blur", this.onInputBlur);
	}

	disabledChanged(newValue: boolean) {
		if (this.input) {
			this.input.disabled = !!newValue;
		}
	}

	themeChanged(newValue: string | null) {
		this.logger.debug("themeChanged");
		this.styleEngine.applyTheme(this, newValue);
	}

	private onInputFocus() {
		this.isFocused = true;
	}

	private onInputBlur() {
		this.isFocused = false;
	}

}

// todo: move somewhere reusable.
export function getAttributeFlagAsBoolean(value: string | boolean): boolean {
	return value === true || value === "true" || value === "";
}