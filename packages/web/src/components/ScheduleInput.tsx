import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/core";
import { DayList, Hour, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { DayListInput } from "./DayListInput";
import { HourInput } from "./HourInput";

export const ScheduleInput: React.FC<BaseProps<{
  value?: Schedule;
  onChange: (value: Schedule) => void;
}>> = ({ className, value, onChange }) => {
  const [error, setError] = useState<Error | undefined>();

  return (
    <FormControl className={className}>
      <FormLabel>Schedule</FormLabel>
      <HourInput
        value={value?.hour}
        onChange={(hour) => {
          try {
            onChange(
              new Schedule(value ? value.dayList : new DayList([]), hour),
            );
          } catch (err) {
            setError(err);
          }
        }}
      />
      <DayListInput
        value={value?.dayList}
        onChange={(dayList) => {
          try {
            onChange(new Schedule(dayList, value ? value.hour : Hour._01));
          } catch (err) {
            setError(err);
          }
        }}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
