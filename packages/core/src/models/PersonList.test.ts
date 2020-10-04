import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Person, PersonIdRandomizer } from "./Person";
import {
  DuplicatePersonError,
  EmptyPersonListError,
  PersonList,
  PersonListSerializer,
} from "./PersonList";

describe("PersonList", () => {
  testComparable(
    () =>
      new PersonList([
        new Person(PersonIdRandomizer.random(), "bob"),
        new Person(PersonIdRandomizer.random(), "jim"),
      ]),
  );
  testSerializer(
    PersonListSerializer,
    () =>
      new PersonList([
        new Person(PersonIdRandomizer.random(), "bob"),
        new Person(PersonIdRandomizer.random(), "jim"),
      ]),
  );

  it("throws when has person with duplicate id", () => {
    expect(() => {
      const id = PersonIdRandomizer.random();
      new PersonList([new Person(id, "bob"), new Person(id, "jim")]);
    }).toThrowError(DuplicatePersonError);
  });

  it("throws when empty", () => {
    expect(() => {
      new PersonList([]);
    }).toThrowError(EmptyPersonListError);
  });
});
