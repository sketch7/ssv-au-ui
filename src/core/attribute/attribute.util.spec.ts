import { getFlagAsBoolean } from "./attribute.util";

describe("AttributeUtil", () => {

	describe(getFlagAsBoolean.name, () => {
		describe("given possible truthy values", () => {
			const truthyValues = [
				true,
				"true"
			];
			it("should return true", () => {
				for (let value of truthyValues) {
					let result = getFlagAsBoolean(value);
					expect(result).toBe(true);
				}
			});
		});
		describe("given possible falsey values", () => {
			const truthyValues = [
				null,
				"false",
				false,
				undefined
			];
			it("should return false", () => {
				for (let value of truthyValues) {
					let result = getFlagAsBoolean(value);
					expect(result).toBe(false);
				}
			});
		});
	});

});
