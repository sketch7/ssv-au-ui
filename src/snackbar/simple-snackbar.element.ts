import { DOM } from "aurelia-pal";
import { customElement, bindable, Animator } from "aurelia-templating";
import { autoinject } from "aurelia-dependency-injection";
import { LoggerFactory, ILog } from "@ssv/au-core";

const PREFIX = "ssv-simple-snackbar";
const ACTIVE_CLASS = `${PREFIX}--active`;

@autoinject()
@customElement(PREFIX)
export class SimpleSnackbarElement {

	@bindable label: string;
	@bindable action: string;

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private element: Element,
		private animator: Animator
	) {
		this.logger = loggerFactory.get("simpleSnackbarElement");
	}

	onAction() {
		this.logger.debug("onAction");
		const event = DOM.createCustomEvent("action", {});
		this.element.dispatchEvent(event);
	}

	async attached() {
		this.logger.debug("attached", "animate...");

		// update state - initial
		await this.animator.enter(this.element as HTMLElement);
		this.element.classList.add(ACTIVE_CLASS);
		this.logger.debug("attached", "animate enter complete!");

		// todo: clear timeout on dimiss?
		setTimeout(async () => {
			this.logger.debug("attached", "timeout triggered! leave animation...");
			await this.animator.leave(this.element as HTMLElement);
			this.element.classList.remove(ACTIVE_CLASS);
			this.logger.debug("attached", "leave animation finished!");
		}, 3000); // todo: time configuration
		// update state - visible
		// wait duration
		// leave
		// update state - complete

		// todo: handle dimiss
	}



}