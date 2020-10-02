import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import {
  PersonIdRandomizer,
  PersonRandomizer,
  PersonNameTooLongError,
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
});
