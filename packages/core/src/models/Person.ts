import {
  BaseError,
  Comparable,
  Guid,
  GuidRandomizer,
  Randomizer,
  StringRandomizer,
} from "@tsukiy0/tscore";
import { Days, DaysRandomizer } from "./Days";

export class PersonId extends Guid {}

export const PersonIdRandomizer: Randomizer<PersonId> = {
  random: (): PersonId => {
    return PersonId.fromString(GuidRandomizer.random().toString());
  },
};

export class PersonNameTooLongError extends BaseError {
  constructor(name: string) {
    super({
      name,
    });
  }
}

export class Person implements Comparable {
  constructor(
    public readonly id: PersonId,
    public readonly days: Days,
    public readonly name: string,
  ) {
    if (name.length > 20) {
      throw new PersonNameTooLongError(name);
    }
  }

  public readonly equals = (input: this): boolean => {
    return (
      this.id.equals(input.id) &&
      this.days === input.days &&
      this.name === input.name
    );
  };
}

export const PersonRandomizer = {
  random: (partial?: Partial<Person>): Person => {
    return new Person(
      partial?.id ?? PersonIdRandomizer.random(),
      partial?.days ?? DaysRandomizer.random(),
      partial?.name ?? StringRandomizer.random(),
    );
  },
};
