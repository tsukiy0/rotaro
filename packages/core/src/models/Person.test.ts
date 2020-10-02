import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { Person, PersonIdRandomizer, PersonNameTooLongError } from "./Person";

describe("PersonId", () => {
  testComparable(() => PersonIdRandomizer.random());
});

describe("Person", () => {
  testComparable(() => new Person(PersonIdRandomizer.random(), "bob"));

  it("throws when name too long", () => {
    expect(() => {
      new Person(PersonIdRandomizer.random(), "111111111111111111111");
    }).toThrowError(PersonNameTooLongError);
  });
});
