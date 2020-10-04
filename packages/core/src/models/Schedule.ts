import { Comparable, isArrayEqual, Serializer } from "@tsukiy0/tscore";
import { DayList, DayListJson, DayListSerializer } from "./DayList";
import { Hour, hourFromString } from "./Hour";

export class Schedule implements Comparable {
  constructor(public readonly dayList: DayList, public readonly hour: Hour) {}

  public readonly equals = (input: this): boolean => {
    return this.dayList.equals(input.dayList) && this.hour == input.hour;
  };
}

export type ScheduleJson = {
  dayList: DayListJson;
  hour: string;
};

export const ScheduleSerializer: Serializer<Schedule, ScheduleJson> = {
  serialize: (input) => {
    return {
      dayList: DayListSerializer.serialize(input.dayList),
      hour: input.hour,
    };
  },
  deserialize: (input) => {
    return new Schedule(
      DayListSerializer.deserialize(input.dayList),
      hourFromString(input.hour),
    );
  },
};
