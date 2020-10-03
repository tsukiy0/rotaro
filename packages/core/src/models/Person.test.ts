import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import {
  Person,
  PersonIdRandomizer,
  PersonIdSerializer,
  PersonNameTooLongError,
  PersonSerializer,
} from "./Person";

describe("PersonId", () => {
  testComparable(() => PersonIdRandomizer.random());
  testSerializer(PersonIdSerializer, () => PersonIdRandomizer.random());
});

describe("Person", () => {
  testComparable(() => new Person(PersonIdRandomizer.random(), "bob"));
  testSerializer(
    PersonSerializer,
    () => new Person(PersonIdRandomizer.random(), "bob"),
  );

  it("throws when name too long", () => {
    expect(() => {
      new Person(PersonIdRandomizer.random(), "111111111111111111111");
    }).toThrowError(PersonNameTooLongError);
  });
});
