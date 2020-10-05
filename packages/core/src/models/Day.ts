import { BaseError, DateTime } from "@tsukiy0/tscore";

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

export class BadDayDateTimeError extends BaseError {
  constructor(public readonly input: DateTime) {
    super();
  }
}

export const dayFromDateTime = (input: DateTime): Day => {
  switch (input.toDate().getDay()) {
    case 0:
      return Day.MONDAY;
    case 1:
      return Day.TUESDAY;
    case 2:
      return Day.WEDNESDAY;
    case 3:
      return Day.THURSDAY;
    case 4:
      return Day.FRIDAY;
    case 5:
      return Day.SATURDAY;
    case 6:
      return Day.SUNDAY;
    default:
      throw new BadDayDateTimeError(input);
  }
};
