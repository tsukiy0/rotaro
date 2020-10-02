import { Comparable } from "@tsukiy0/tscore";

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

export class Schedule implements Comparable {
  constructor(
    public readonly monday: boolean,
    public readonly tuesday: boolean,
    public readonly wednesday: boolean,
    public readonly thursday: boolean,
    public readonly friday: boolean,
    public readonly saturday: boolean,
    public readonly sunday: boolean,
    public readonly hour: Hour,
  ) {}

  public readonly equals = (input: this): boolean => {
    return (
      this.monday == input.monday &&
      this.tuesday == input.tuesday &&
      this.wednesday == input.wednesday &&
      this.thursday == input.thursday &&
      this.friday == input.friday &&
      this.saturday == input.saturday &&
      this.sunday == input.sunday &&
      this.hour == input.hour
    );
  };
}
