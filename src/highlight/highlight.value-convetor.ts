export class HighlightValueConverter {

	toView(value: string, phrase: string, className = "highlighted") {
		if (value && phrase) {
			value = value.replace(new RegExp(`(${phrase})`, "gi"),
				`<span class="${className}">$1</span>`);
		}
		return value;
	}

}