import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { Days } from "./Days";
import { Person, PersonIdRandomizer } from "./Person";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";
import { PersonRotation } from "./PersonRotation";
import { Roster, RosterIdRandomizer } from "./Roster";

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
    );
  });
});
