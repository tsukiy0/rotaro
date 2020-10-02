import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
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
});
