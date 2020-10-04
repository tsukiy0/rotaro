import { hourFromString, Hour, BadHourStringError } from "./Hour";

describe("Hour", () => {
  describe("hourFromString", () => {
    it("does it", () => {
      const actual = hourFromString("24");

      expect(actual).toEqual(Hour._24);
    });

    it("throws when not match", () => {
      expect(() => {
        hourFromString("25");
      }).toThrowError(BadHourStringError);
    });
  });
});
