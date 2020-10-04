import { BadDayStringError, Day, dayFromString } from "./Day";

describe("Day", () => {
  describe("hourFromString", () => {
    it("does it", () => {
      const actual = dayFromString("TUESDAY");

      expect(actual).toEqual(Day.TUESDAY);
    });

    it("throws when not match", () => {
      expect(() => {
        dayFromString("RAGNAROS");
      }).toThrowError(BadDayStringError);
    });
  });
});
