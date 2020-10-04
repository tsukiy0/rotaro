import {
  BaseError,
  Comparable,
  isArrayEqual,
  Serializer,
} from "@tsukiy0/tscore";
import { Person, PersonJson, PersonSerializer } from "./Person";

// @TODO abtract into NonEmptySet<T>
// duplicate with DayList
export class DuplicatePersonError extends BaseError {}
export class EmptyPersonListError extends BaseError {}

export class PersonList implements Comparable {
  constructor(public readonly items: readonly Person[]) {
    if (items.length === 0) {
      throw new EmptyPersonListError();
    }

    const duplicates = items.filter((item, index) => {
      const duplicateIndex = items.findIndex((_) => item.id.equals(_.id));
      return duplicateIndex !== index;
    });

    if (duplicates.length !== 0) {
      throw new DuplicatePersonError();
    }
  }

  public readonly equals = (input: this): boolean => {
    return isArrayEqual(this.items, input.items, (a, b) => a.equals(b));
  };
}

export type PersonListJson = {
  items: readonly PersonJson[];
};

export const PersonListSerializer: Serializer<PersonList, PersonListJson> = {
  serialize: (input) => {
    return {
      items: input.items.map(PersonSerializer.serialize),
    };
  },
  deserialize: (input) => {
    return new PersonList(input.items.map(PersonSerializer.deserialize));
  },
};
