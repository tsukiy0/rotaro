import { Box, Heading, Stack } from "@chakra-ui/core";
import { DayList, Hour, Schedule } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { DayListInput } from "./DayListInput";
import { FullWidthButton } from "./FullWidthButton";
import { HourInput } from "./HourInput";

export const ScheduleForm: React.FC<BaseProps<{
  value?: Schedule;
  onChange: (value: Schedule) => void;
}>> = ({ className, value, onChange }) => {
  const { onError } = useAlert();
  const [dayList, setDayList] = useState<DayList | undefined>();
  const [hour, setHour] = useState<Hour | undefined>();

  useEffect(() => {
    if (value) {
      setDayList(value.dayList);
      setHour(value.hour);
    } else {
      setDayList(undefined);
      setHour(undefined);
    }
  }, [value]);

  const onSubmit = () => {
    try {
      if (dayList && hour) {
        onChange(new Schedule(dayList, hour));
      }
    } catch (err) {
      onError(err);
    }
  };

  return (
    <Card
      className={className}
      header={<Heading>Schedule</Heading>}
      footer={
        <FullWidthButton onClick={onSubmit} colorScheme="green">
          Submit
        </FullWidthButton>
      }
    >
      <Stack spacing={4}>
        <Box>
          <HourInput value={hour} onChange={setHour} />
        </Box>
        <Box>
          <DayListInput value={dayList} onChange={setDayList} />
        </Box>
      </Stack>
    </Card>
  );
};
