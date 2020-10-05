import { Box, Heading, Stack } from "@chakra-ui/core";
import { Day, DayList, Hour, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { DayListInput } from "./DayListInput";
import { HourInput } from "./HourInput";

export const ScheduleForm: React.FC<BaseProps<{
  value?: Schedule;
  onChange: (value: Schedule) => void;
}>> = ({ className, value, onChange }) => {
  const { onError } = useAlert();

  const defaultDayList = new DayList([
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
  ]);

  const defaultHour = Hour._09;

  return (
    <Card className={className} header={<Heading>Schedule</Heading>}>
      <Stack spacing={4}>
        <Box>
          <HourInput
            value={value?.hour}
            onChange={(hour) => {
              try {
                onChange(
                  new Schedule(value ? value.dayList : defaultDayList, hour),
                );
              } catch (err) {
                onError(err);
              }
            }}
          />
        </Box>
        <Box>
          <DayListInput
            value={value?.dayList}
            onChange={(dayList) => {
              try {
                onChange(
                  new Schedule(dayList, value ? value.hour : defaultHour),
                );
              } catch (err) {
                onError(err);
              }
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
};
