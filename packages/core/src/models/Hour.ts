import { BaseError } from "@tsukiy0/tscore";

export enum Hour {
  _01 = "01",
  _02 = "02",
  _03 = "03",
  _04 = "04",
  _05 = "05",
  _06 = "06",
  _07 = "07",
  _08 = "08",
  _09 = "09",
  _10 = "10",
  _11 = "11",
  _12 = "12",
  _13 = "13",
  _14 = "14",
  _15 = "15",
  _16 = "16",
  _17 = "17",
  _18 = "18",
  _19 = "19",
  _20 = "20",
  _21 = "21",
  _22 = "22",
  _23 = "23",
  _24 = "24",
}

export class BadHourStringError extends BaseError {
  constructor(public readonly input: string) {
    super({
      input,
    });
  }
}

export const hourFromString = (input: string): Hour => {
  for (const value of Object.values(Hour)) {
    if (value === input) {
      return value;
    }
  }

  throw new BadHourStringError(input);
};
