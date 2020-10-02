import {
  BaseError,
  Comparable,
  Guid,
  GuidRandomizer,
  NumberRandomizer,
  Randomizer,
  StringRandomizer,
} from "@tsukiy0/tscore";

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

export class PersonDaysMustBeGreaterThanZeroError extends BaseError {
  constructor(days: number) {
    super({
      days,
    });
  }
}

export class Person implements Comparable {
  constructor(
    public readonly id: PersonId,
    public readonly name: string,
    public readonly days: number,
  ) {
    if (name.length > 20) {
      throw new PersonNameTooLongError(name);
    }

    if (days <= 0) {
      throw new PersonDaysMustBeGreaterThanZeroError(days);
    }
  }

  public readonly equals = (input: this): boolean => {
    return (
      this.id.equals(input.id) &&
      this.name === input.name &&
      this.days === input.days
    );
  };
}

export const PersonRandomizer = {
  random: (partial?: Partial<Person>): Person => {
    return new Person(
      partial?.id ?? PersonIdRandomizer.random(),
      partial?.name ?? StringRandomizer.random(),
      partial?.days ?? NumberRandomizer.random(),
    );
  },
};
