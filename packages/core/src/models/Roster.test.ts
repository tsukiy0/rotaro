import {
  testComparable,
  testSerializer,
} from "@tsukiy0/tscore/dist/index.testTemplate";
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
import { Schedule } from "./Schedule";
import { Hour } from "./Hour";
import { Day } from "./Day";
import { DayList } from "./DayList";

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
      new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._14),
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
      new Schedule(new DayList([Day.MONDAY, Day.WEDNESDAY]), Hour._14),
    );
  });
});
