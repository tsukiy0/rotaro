import { BaseError, Comparable, isArrayEqual } from "@tsukiy0/tscore";
import { Day } from "./Day";

export class DuplicateDayError extends BaseError {}
export class EmptyDayListError extends BaseError {}

export class DayList implements Comparable {
  constructor(public readonly items: readonly Day[]) {
    if (items.length === 0) {
      throw new EmptyDayListError();
    }

    const duplicates = items.filter((item, index) => {
      const duplicateIndex = items.findIndex((_) => item === _);
      return duplicateIndex !== index;
    });

    if (duplicates.length !== 0) {
      throw new DuplicateDayError();
    }
  }

  public readonly equals = (input: this): boolean => {
    return isArrayEqual(this.items, input.items, (a, b) => a === b);
  };
}
