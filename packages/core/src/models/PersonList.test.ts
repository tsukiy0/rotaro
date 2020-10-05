import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Person, PersonId, PersonIdRandomizer } from "./Person";
import {
  DuplicatePersonError,
  EmptyPersonListError,
  PersonList,
  PersonListSerializer,
  PersonNotFoundError,
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

  describe("getPersonById", () => {
    it("get existing", () => {
      const id = PersonIdRandomizer.random();
      const list = new PersonList([
        new Person(id, "bob"),
        new Person(PersonIdRandomizer.random(), "jim"),
      ]);

      const actual = list.getPersonById(id);

      expect(actual.equals(list.items[0])).toBeTruthy();
    });

    it("throws when get non existant", () => {
      const id = PersonIdRandomizer.random();
      const list = new PersonList([
        new Person(id, "bob"),
        new Person(PersonIdRandomizer.random(), "jim"),
      ]);

      expect(() => {
        const list = new PersonList([
          new Person(
            PersonId.fromString("3a303c56-2999-4262-8e51-a3f951ab988b"),
            "bob",
          ),
        ]);

        list.getPersonById(
          PersonId.fromString("9821a0f9-c546-49ef-8202-61d82ede7861"),
        );
      }).toThrowError(PersonNotFoundError);
      const actual = list.getPersonById(id);

      expect(actual.equals(list.items[0])).toBeTruthy();
    });
  });
});
