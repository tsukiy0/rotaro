import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Days } from "./Days";
import { Person, PersonIdRandomizer } from "./Person";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";
import {
  CursorGreaterThanTotalDaysError,
  PersonNotFoundError,
  PersonRotation,
  PersonRotationSerializer,
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

  testSerializer(PersonRotationSerializer, () => {
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
    }).toThrowError(CursorGreaterThanTotalDaysError);
  });

  describe("getTotalDays", () => {
    it("calculates total days in rotation", () => {
      const personId1 = PersonIdRandomizer.random();
      const personId2 = PersonIdRandomizer.random();
      const rotation = new PersonRotation(
        new PersonList([
          new Person(personId1, "bob"),
          new Person(personId2, "jim"),
        ]),
        [
          new PersonDays(personId1, new Days(2)),
          new PersonDays(personId2, new Days(3)),
        ],
        new Days(5),
      );

      const actual = rotation.getTotalDays();

      expect(actual.equals(new Days(5))).toBeTruthy();
    });
  });

  describe("tick", () => {
    it("reset when at end of rotation", () => {
      const personId1 = PersonIdRandomizer.random();
      const personId2 = PersonIdRandomizer.random();
      const rotation = new PersonRotation(
        new PersonList([
          new Person(personId1, "bob"),
          new Person(personId2, "jim"),
        ]),
        [
          new PersonDays(personId1, new Days(2)),
          new PersonDays(personId2, new Days(3)),
        ],
        new Days(5),
      );

      const actual = rotation.tick();

      expect(actual.cursor.equals(new Days(1))).toBeTruthy();
    });

    it("increment when within rotation", () => {
      const personId1 = PersonIdRandomizer.random();
      const personId2 = PersonIdRandomizer.random();
      const rotation = new PersonRotation(
        new PersonList([
          new Person(personId1, "bob"),
          new Person(personId2, "jim"),
        ]),
        [
          new PersonDays(personId1, new Days(2)),
          new PersonDays(personId2, new Days(3)),
        ],
        new Days(2),
      );

      const actual = rotation.tick();

      expect(actual.cursor.equals(new Days(3))).toBeTruthy();
    });
  });
});
