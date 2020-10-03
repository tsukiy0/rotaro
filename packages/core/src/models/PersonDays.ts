import { Comparable, Serializer } from "@tsukiy0/tscore";
import { Days } from "./Days";
import { PersonId } from "./Person";

export class PersonDays implements Comparable {
  constructor(public readonly personId: PersonId, public readonly days: Days) {}

  public readonly equals = (input: this): boolean => {
    return this.personId.equals(input.personId) && this.days.equals(input.days);
  };
}

export type PersonDaysJson = {
  personId: string;
  days: number;
};

export const PersonDaysSerializer: Serializer<PersonDays, PersonDaysJson> = {
  serialize: (input) => {
    return {
      personId: input.personId.toString(),
      days: input.days.toNumber(),
    };
  },
  deserialize: (input) => {
    return new PersonDays(
      PersonId.fromString(input.personId),
      new Days(input.days),
    );
  },
};
