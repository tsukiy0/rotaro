import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { testSerializer } from "@tsukiy0/tscore/dist/models/Serializer.testTemplate";
import { Days } from "./Days";
import { Person, PersonIdRandomizer } from "./Person";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";
import { PersonRotation } from "./PersonRotation";
import {
  Roster,
  RosterIdRandomizer,
  RosterIdSerializer,
  RosterSerializer,
} from "./Roster";
import { Schedule, Hour } from "./Schedule";

describe("RosterId", () => {
  testComparable(() => RosterIdRandomizer.random());
  testSerializer(RosterIdSerializer, () => RosterIdRandomizer.random());
});

describe("Roster", () => {
  testComparable(() => {
    const personId = PersonIdRandomizer.random();
    return new Roster(
      RosterIdRandomizer.random(),
      new PersonRotation(
        new PersonList([new Person(personId, "bob")]),
        [new PersonDays(personId, new Days(2))],
        new Days(1),
      ),
      new Schedule(true, true, true, true, true, false, false, Hour._14),
    );
  });

  testSerializer(RosterSerializer, () => {
    const personId = PersonIdRandomizer.random();
    return new Roster(
      RosterIdRandomizer.random(),
      new PersonRotation(
        new PersonList([new Person(personId, "bob")]),
        [new PersonDays(personId, new Days(2))],
        new Days(1),
      ),
      new Schedule(true, true, true, true, true, false, false, Hour._14),
    );
  });
});
