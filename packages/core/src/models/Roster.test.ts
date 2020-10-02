import { testComparable } from "@tsukiy0/tscore/dist/models/Comparable.testTemplate";
import { CursorRandomizer } from "./Cursor";
import { Days } from "./Days";
import { PersonIdRandomizer, PersonRandomizer } from "./Person";
import { PersonList } from "./PersonList";
import { BadCursorError, Roster, RosterRandomizer } from "./Roster";

describe("Roster", () => {
  testComparable(() => RosterRandomizer.random());

  it("throws when cursor not match person in list", () => {
    expect(() =>
      RosterRandomizer.random({
        personList: new PersonList([PersonRandomizer.random()]),
        cursor: CursorRandomizer.random({
          personId: PersonIdRandomizer.random(),
        }),
      }),
    ).toThrowError(BadCursorError);
  });

  it("throws when cursor days greater than person in list", () => {
    expect(() => {
      const person = PersonRandomizer.random();

      RosterRandomizer.random({
        personList: new PersonList([person]),
        cursor: CursorRandomizer.random({
          personId: person.id,
          daysDone: new Days(person.days.toNumber() + 1),
        }),
      });
    }).toThrowError(BadCursorError);
  });
});
