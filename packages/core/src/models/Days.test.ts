import { testComparable } from "@tsukiy0/tscore/dist/index.testTemplate";
import { Days, DaysMustBeGreaterThanZeroError } from "./Days";

describe("Days", () => {
  testComparable(() => new Days(1));

  it("throws when 0", () => {
    expect(() => {
      new Days(0);
    }).toThrowError(DaysMustBeGreaterThanZeroError);
  });

  it("throws when negative", () => {
    expect(() => {
      new Days(-1);
    }).toThrowError(DaysMustBeGreaterThanZeroError);
  });

  describe("greaterThan", () => {
    it("true when greater", () => {
      const actual = new Days(2).greaterThan(new Days(1));

      expect(actual).toBeTruthy();
    });

    it("false when equal", () => {
      const actual = new Days(2).greaterThan(new Days(2));

      expect(actual).toBeFalsy();
    });

    it("false when less", () => {
      const actual = new Days(2).greaterThan(new Days(3));

      expect(actual).toBeFalsy();
    });
  });

  describe("increment", () => {
    it("increments", () => {
      const actual = new Days(1).increment();

      expect(actual.equals(new Days(2))).toBeTruthy();
    });
  });

  describe("reset", () => {
    it("resets", () => {
      const actual = new Days(100).reset();

      expect(actual.equals(new Days(1))).toBeTruthy();
    });
  });
});
