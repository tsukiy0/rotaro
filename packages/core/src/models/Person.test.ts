import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import {
  PersonIdRandomizer,
  PersonRandomizer,
  PersonNameTooLongError,
  PersonDaysMustBeGreaterThanZeroError,
} from "./Person";

describe("PersonId", () => {
  testComparable(() => PersonIdRandomizer.random());
});

describe("Person", () => {
  testComparable(() => PersonRandomizer.random());

  it("throws when name too long", () => {
    expect(() => {
      PersonRandomizer.random({
        name: "111111111111111111111",
      });
    }).toThrowError(PersonNameTooLongError);
  });

  it("throws when 0 days", () => {
    expect(() => {
      PersonRandomizer.random({
        days: 0,
      });
    }).toThrowError(PersonDaysMustBeGreaterThanZeroError);
  });

  it("throws when negative days", () => {
    expect(() => {
      PersonRandomizer.random({
        days: -1,
      });
    }).toThrowError(PersonDaysMustBeGreaterThanZeroError);
  });
});
