import { BaseError, Comparable, Guid, GuidRandomizer } from "@tsukiy0/tscore";
import { Cursor } from "./Cursor";
import { PersonRandomizer } from "./Person";
import { PersonList } from "./PersonList";

export class RosterId extends Guid {}

export const RosterIdRandomizer = {
  random: (): RosterId => {
    return RosterId.fromString(GuidRandomizer.random().toString());
  },
};

export class BadCursorError extends BaseError {
  constructor(public readonly cursor: Cursor) {
    super();
  }
}

export class Roster implements Comparable {
  constructor(
    public readonly id: RosterId,
    public readonly personList: PersonList,
    public readonly cursor: Cursor,
  ) {
    const person = personList.items.find((_) => _.id.equals(cursor.personId));

    if (!person) {
      throw new BadCursorError(cursor);
    }

    if (cursor.daysDone.toNumber() > person.days.toNumber()) {
      throw new BadCursorError(cursor);
    }
  }

  public readonly equals = (input: this): boolean => {
    return (
      this.id.equals(input.id) &&
      this.personList.equals(input.personList) &&
      this.cursor.equals(input.cursor)
    );
  };
}

export const RosterRandomizer = {
  random: (partial?: Partial<Roster>): Roster => {
    const person = PersonRandomizer.random();

    return new Roster(
      partial?.id ?? RosterIdRandomizer.random(),
      partial?.personList ?? new PersonList([person]),
      partial?.cursor ?? new Cursor(person.id, person.days),
    );
  },
};
