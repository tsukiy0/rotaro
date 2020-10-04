import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Day } from "./Day";
import {
  DayList,
  DayListSerializer,
  DuplicateDayError,
  EmptyDayListError,
} from "./DayList";

describe("DayList", () => {
  testComparable(() => new DayList([Day.MONDAY, Day.TUESDAY]));
  testSerializer(
    DayListSerializer,
    () => new DayList([Day.MONDAY, Day.TUESDAY]),
  );

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

  describe("hasDay", () => {
    it("true when has given day", () => {
      const dayList = new DayList([Day.MONDAY, Day.WEDNESDAY]);

      const actual = dayList.hasDay(Day.MONDAY);

      expect(actual).toBeTruthy();
    });

    it("false when does not have given day", () => {
      const dayList = new DayList([Day.MONDAY, Day.WEDNESDAY]);

      const actual = dayList.hasDay(Day.TUESDAY);

      expect(actual).toBeFalsy();
    });
  });
});
