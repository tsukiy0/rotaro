import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { Day } from "./Day";
import { DayList, DuplicateDayError, EmptyDayListError } from "./DayList";

describe("DayList", () => {
  testComparable(() => new DayList([Day.MONDAY, Day.TUESDAY]));

  it("throws when has duplicate day", () => {
    expect(() => {
      new DayList([Day.MONDAY, Day.MONDAY]);
    }).toThrowError(DuplicateDayError);
  });

  it("throws when empty", () => {
    expect(() => {
      new DayList([]);
    }).toThrowError(EmptyDayListError);
  });

  it("throws when has more than all days", () => {
    expect(() => {
      new DayList([
        Day.MONDAY,
        Day.TUESDAY,
        Day.WEDNESDAY,
        Day.THURSDAY,
        Day.FRIDAY,
        Day.SATURDAY,
        Day.SUNDAY,
        Day.SUNDAY,
      ]);
    }).toThrowError(DuplicateDayError);
  });
});
