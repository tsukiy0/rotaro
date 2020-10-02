import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { PersonIdRandomizer, PersonRandomizer } from "./Person";
import { DuplicatePersonError, PersonList } from "./PersonList";

describe("PersonList", () => {
  testComparable(
    () =>
      new PersonList([PersonRandomizer.random(), PersonRandomizer.random()]),
  );

  it("throws when has person with duplicate id", () => {
    expect(() => {
      const id = PersonIdRandomizer.random();
      new PersonList([
        PersonRandomizer.random({
          id,
        }),
        PersonRandomizer.random({
          id,
        }),
      ]);
    }).toThrowError(DuplicatePersonError);
  });
});
