import { BaseError, DateTime } from "@tsukiy0/tscore";

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

export class BadHourDateTimeError extends BaseError {
  constructor(public readonly input: DateTime) {
    super();
  }
}

export const hourFromDateTime = (input: DateTime): Hour => {
  switch (input.toDate().getHours()) {
    case 1:
      return Hour._01;
    case 2:
      return Hour._02;
    case 3:
      return Hour._03;
    case 4:
      return Hour._04;
    case 5:
      return Hour._05;
    case 6:
      return Hour._06;
    case 7:
      return Hour._07;
    case 8:
      return Hour._08;
    case 9:
      return Hour._09;
    case 10:
      return Hour._10;
    case 11:
      return Hour._11;
    case 12:
      return Hour._12;
    case 13:
      return Hour._13;
    case 14:
      return Hour._14;
    case 15:
      return Hour._15;
    case 16:
      return Hour._16;
    case 17:
      return Hour._17;
    case 18:
      return Hour._18;
    case 19:
      return Hour._19;
    case 20:
      return Hour._20;
    case 21:
      return Hour._21;
    case 22:
      return Hour._22;
    case 23:
      return Hour._23;
    case 0:
      return Hour._24;
    default:
      throw new BadHourDateTimeError(input);
  }
};
