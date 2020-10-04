import { Comparable, Serializer } from "@tsukiy0/tscore";
import { Hour, hourFromString } from "./Hour";

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

export type ScheduleJson = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  hour: string;
};

export const ScheduleSerializer: Serializer<Schedule, ScheduleJson> = {
  serialize: (input) => {
    return {
      monday: input.monday,
      tuesday: input.tuesday,
      wednesday: input.wednesday,
      thursday: input.thursday,
      friday: input.friday,
      saturday: input.saturday,
      sunday: input.sunday,
      hour: input.hour,
    };
  },
  deserialize: (input) => {
    return new Schedule(
      input.monday,
      input.tuesday,
      input.wednesday,
      input.thursday,
      input.friday,
      input.saturday,
      input.sunday,
      hourFromString(input.hour),
    );
  },
};
