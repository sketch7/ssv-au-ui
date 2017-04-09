export class HighlightValueConverter {

	/**
	 * Converts string with matched `phrase`'s wrapped with span.
	 *
	 * @param value text value to evaluate.
	 * @param phrase text phrase to compare.
	 * @param [className="highlighted"] cssClass to be added.
	 * @returns value with matched highlights wrapped with additional class.
	 */
	toView(value: string, phrase: string, className = "highlighted") {
		if (value && phrase) {
			value = value.replace(new RegExp(`(${phrase})`, "gi"),
				`<span class="${className}">$1</span>`);
		}
		return value;
	}

}