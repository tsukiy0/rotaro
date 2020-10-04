import { FormControl, FormLabel } from "@chakra-ui/core";
import { Day, DayList, Hour, Schedule } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { DayListInput } from "./DayListInput";
import { HourInput } from "./HourInput";

export const ScheduleInput: React.FC<BaseProps<{
  value?: Schedule;
  onChange: (value: Schedule) => void;
}>> = ({ className, value, onChange }) => {
  const [hour, setHour] = useState<Hour>(Hour._14);
  const [dayList, setDayList] = useState<DayList>(
    new DayList([
      Day.MONDAY,
      Day.TUESDAY,
      Day.WEDNESDAY,
      Day.THURSDAY,
      Day.FRIDAY,
    ]),
  );

  useEffect(() => {
    if (!value) {
      setHour(Hour._14);
      setDayList(
        new DayList([
          Day.MONDAY,
          Day.TUESDAY,
          Day.WEDNESDAY,
          Day.THURSDAY,
          Day.FRIDAY,
        ]),
      );
    } else {
      if (value.hour !== hour) {
        setHour(value.hour);
      }

      if (!value.dayList.equals(dayList)) {
        setDayList(value.dayList);
      }
    }
  }, [value, hour, dayList]);

  useEffect(() => {
    onChange(new Schedule(dayList, hour));
  }, [hour, dayList, onChange]);

  return (
    <FormControl className={className}>
      <FormLabel>Schedule</FormLabel>
      <HourInput value={hour} onChange={setHour} />
      <DayListInput value={dayList} onChange={setDayList} />
    </FormControl>
  );
};
