import { DateTime } from "@tsukiy0/tscore";
import { BadDayStringError, Day, dayFromDateTime, dayFromString } from "./Day";

describe("Day", () => {
  describe("dayFromString", () => {
    [
      {
        input: "MONDAY",
        output: Day.MONDAY,
      },
      {
        input: "TUESDAY",
        output: Day.TUESDAY,
      },
      {
        input: "WEDNESDAY",
        output: Day.WEDNESDAY,
      },
      {
        input: "THURSDAY",
        output: Day.THURSDAY,
      },
      {
        input: "FRIDAY",
        output: Day.FRIDAY,
      },
      {
        input: "SATURDAY",
        output: Day.SATURDAY,
      },
      {
        input: "SUNDAY",
        output: Day.SUNDAY,
      },
    ].forEach(() => {
      it("does it", () => {
        const actual = dayFromString("TUESDAY");

        expect(actual).toEqual(Day.TUESDAY);
      });
    });

    it("throws when not match", () => {
      expect(() => {
        dayFromString("RAGNAROS");
      }).toThrowError(BadDayStringError);
    });
  });

  describe("dayFromDateTime", () => {
    [
      {
        input: DateTime.fromISOString("2020-10-04"),
        output: Day.MONDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-05"),
        output: Day.TUESDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-06"),
        output: Day.WEDNESDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-07"),
        output: Day.THURSDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-08"),
        output: Day.FRIDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-09"),
        output: Day.SATURDAY,
      },
      {
        input: DateTime.fromISOString("2020-10-10"),
        output: Day.SUNDAY,
      },
    ].forEach(({ input, output }) => {
      it("does it", () => {
        const actual = dayFromDateTime(input);
        expect(actual).toEqual(output);
      });
    });
  });
});
