import {
  BaseError,
  Comparable,
  isArrayEqual,
  Serializer,
} from "@tsukiy0/tscore";
import { Day, dayFromString } from "./Day";

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

  public readonly hasDay = (day: Day): boolean => {
    return this.items.indexOf(day) !== -1;
  };

  public readonly equals = (input: this): boolean => {
    return isArrayEqual(this.items, input.items, (a, b) => a === b);
  };
}

export type DayListJson = {
  items: readonly string[];
};

export const DayListSerializer: Serializer<DayList, DayListJson> = {
  serialize: (input) => {
    return {
      items: input.items,
    };
  },
  deserialize: (input) => {
    return new DayList(input.items.map(dayFromString));
  },
};
