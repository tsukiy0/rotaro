import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { Days } from "./Days";
import { Person, PersonIdRandomizer } from "./Person";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";
import {
  CursorGreaterThanTotalRotationDaysError,
  PersonNotFoundError,
  PersonRotation,
} from "./PersonRotation";

describe("PersonRotation", () => {
  testComparable(() => {
    const personId = PersonIdRandomizer.random();

    return new PersonRotation(
      new PersonList([new Person(personId, "bob")]),
      [new PersonDays(personId, new Days(2))],
      new Days(1),
    );
  });

  it("throws when rotation person not found", () => {
    expect(() => {
      const personId1 = PersonIdRandomizer.random();
      const personId2 = PersonIdRandomizer.random();
      const personId3 = PersonIdRandomizer.random();

      return new PersonRotation(
        new PersonList([
          new Person(personId1, "bob"),
          new Person(personId2, "jim"),
        ]),
        [new PersonDays(personId3, new Days(2))],
        new Days(1),
      );
    }).toThrowError(PersonNotFoundError);
  });

  it("throws when cursor is greater than total rotation days", () => {
    expect(() => {
      const personId1 = PersonIdRandomizer.random();
      const personId2 = PersonIdRandomizer.random();

      return new PersonRotation(
        new PersonList([
          new Person(personId1, "bob"),
          new Person(personId2, "jim"),
        ]),
        [
          new PersonDays(personId1, new Days(2)),
          new PersonDays(personId2, new Days(3)),
        ],
        new Days(6),
      );
    }).toThrowError(CursorGreaterThanTotalRotationDaysError);
  });
});
