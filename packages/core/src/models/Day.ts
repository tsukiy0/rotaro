import { BaseError } from "@tsukiy0/tscore";

export enum Day {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export class BadDayStringError extends BaseError {
  constructor(public readonly input: string) {
    super();
  }
}

export const dayFromString = (input: string): Day => {
  for (const value of Object.values(Day)) {
    if (value === input) {
      return value;
    }
  }

  throw new BadDayStringError(input);
};
