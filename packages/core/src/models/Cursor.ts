import { BaseError, Comparable } from "@tsukiy0/tscore";
import { Days, DaysRandomizer } from "./Days";
import { PersonId, PersonIdRandomizer } from "./Person";

export class Cursor implements Comparable {
  constructor(
    public readonly personId: PersonId,
    public readonly daysDone: Days,
  ) {}

  public readonly equals = (input: this): boolean => {
    return (
      this.personId.equals(input.personId) &&
      this.daysDone.equals(input.daysDone)
    );
  };
}

export const CursorRandomizer = {
  random: (partial?: Partial<Cursor>): Cursor => {
    return new Cursor(
      partial?.personId ?? PersonIdRandomizer.random(),
      partial?.daysDone ?? DaysRandomizer.random(),
    );
  },
};
