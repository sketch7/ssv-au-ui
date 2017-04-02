import {
	getFlagAsBoolean,
	generateBemStyleModifiers,
	setAsFlag,
	changeBemModifier
} from "./attribute.util";

describe("AttributeUtil", () => {

	describe(getFlagAsBoolean.name, () => {
		describe("given possible truthy values", () => {
			const truthyValues = [
				true,
				"true",
				""
			];
			it("should return true", () => {
				for (const value of truthyValues) {
					const result = getFlagAsBoolean(value);
					expect(result).toBe(true);
				}
			});
		});

		describe("given possible falsy values", () => {
			const falsyValues = [
				null,
				"false",
				false,
				undefined
			];
			it("should return false", () => {
				for (const value of falsyValues) {
					const result = getFlagAsBoolean(value);
					expect(result).toBe(false);
				}
			});
		});
	});

	describe(generateBemStyleModifiers.name, () => {
		describe("given values are passed", () => {
			it("should return prefixed modifiers", () => {
				const result = generateBemStyleModifiers("awesome big", "ssv-au");
				expect(result).toBe("ssv-au--awesome ssv-au--big");
			});
		});
	});

	describe(setAsFlag.name, () => {
		let element: Element;

		beforeEach(() => element = document.createElement("button"));

		describe("given element without attribute", () => {
			describe("when the attribute value is empty string", () => {
				it("should be added", () => {
					setAsFlag(element, "disabled", "");
					expect(element).toBeDisabled();
				});
			});
		});

		describe("given element with attribute", () => {

			beforeEach(() => element.setAttribute("checked", ""));

			describe("when the attribute value is empty string", () => {
				it("should have attribute", () => {
					setAsFlag(element, "checked", "");
					expect(element).toHaveAttr("checked");
				});

				it("should not be added twice", () => {
					const attrLength = element.attributes.length;
					setAsFlag(element, "checked", "");
					expect(element).toHaveAttr("checked");
					expect(attrLength).toBe(element.attributes.length);
				});
			});

			describe("when the attribute value is falsy", () => {
				const falsyValues = [
					null,
					"false",
					false,
					undefined
				];
				it("should not have attribute", () => {
					for (const value of falsyValues) {
						setAsFlag(element, "checked", value);
						expect(element).not.toHaveAttr("checked");
					}
				});
			});

		});

	});

	describe(changeBemModifier.name, () => {
		let element: Element;

		beforeEach(() => element = document.createElement("button"));

		describe("given previous value does not exists", () => {
			it("should have new class added", () => {
				changeBemModifier("ssv-test", "focused", "gazed", element);
				expect(element).toHaveClass("ssv-test--focused");
				expect(element).not.toHaveClass("ssv-test--gazed");
			});
		});
		describe("given previous value exists", () => {
			beforeEach(() => element.classList.add("ssv-test--gazed"));

			it("should remove previous class", () => {
				changeBemModifier("ssv-test", "focused", "gazed", element);
				expect(element).not.toHaveClass("ssv-test--gazed");
			});
		});
	});

});
