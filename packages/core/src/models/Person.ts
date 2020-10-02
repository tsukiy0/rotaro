import {
  BaseError,
  Comparable,
  Guid,
  GuidRandomizer,
  Randomizer,
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

export class Person implements Comparable {
  constructor(public readonly id: PersonId, public readonly name: string) {
    if (name.length > 20) {
      throw new PersonNameTooLongError(name);
    }
  }

  public readonly equals = (input: this): boolean => {
    return this.id.equals(input.id) && this.name === input.name;
  };
}
