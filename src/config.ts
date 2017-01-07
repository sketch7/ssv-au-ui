import { FrameworkConfiguration } from "aurelia-framework";

export function configure(aurelia: FrameworkConfiguration, config: any): Promise<void> {
	console.log(">>> au-ui configure!", config);
	aurelia.globalResources([
		"./input/input"
	]);

	// let ux = <AureliaUX>config.container.get(AureliaUX);
	return Promise.resolve();
}