import { BaseError, Comparable, isArrayEqual } from "@tsukiy0/tscore";
import { Person } from "./Person";

export class DuplicatePersonError extends BaseError {}

export class PersonList implements Comparable {
  constructor(public readonly items: readonly Person[]) {
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
