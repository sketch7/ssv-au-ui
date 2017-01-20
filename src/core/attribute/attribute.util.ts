/**
 * Determine attribute value and convert value to be treated as a boolean (flag).
 *
 * @export
 * @param {(string | boolean)} value
 * @returns {boolean} returns a boolean value from attribute value as flag.
 */
export function getFlagAsBoolean(value: string | boolean): boolean {
	return value === true || value === "true" || value === "";
}

/**
 * Sets attribute as flag, added or removed. e.g. given "disabled" and value is `true` attribute will be added; else it
 * will be removed.
 *
 * @export
 * @param {Element} element element to add/remove attribute from.
 * @param {string} attributeName attribute name to add e.g. disabled
 * @param {(string | boolean)} attributeValue attribute value to be set either true/false.
 */
export function setAsFlag(element: Element, attributeName: string, attributeValue: string | boolean) {
	if (getFlagAsBoolean(attributeValue)) {
		element.setAttribute(attributeName, "");
	} else {
		element.removeAttribute(attributeName);
	}
}


/**
 * Build BEM style modifiers by splitting and combing the modifier with the prefix.
 * e.g. given value is "error focus" and prefix is "ssv-x" => "ssv-x--error ssv-x--focus"
 *
 * @export
 * @param {(string | undefined)} value modifier value to build, which can be separated by space.
 * @param {string} prefix prefix to use for each modifier.
 * @returns {(string | undefined)} returns combined modifiers as a string.
 */
export function generateBemStyleModifiers(value: string | undefined, prefix: string): string | undefined {
	if (!value) {
		return undefined;
	}
	return value.split(" ")
		.map(modifier => `${prefix}--${modifier}`)
		.join(" ");
}