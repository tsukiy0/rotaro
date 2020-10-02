import { Comparable } from "@tsukiy0/tscore";
import { Days } from "./Days";
import { PersonId } from "./Person";

export class PersonDays implements Comparable {
  constructor(public readonly personId: PersonId, public readonly days: Days) {}

  public readonly equals = (input: this): boolean => {
    return this.personId.equals(input.personId) && this.days.equals(input.days);
  };
}
