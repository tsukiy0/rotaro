import { Box } from "@chakra-ui/core";
import { PersonList, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonListInput } from "./PersonListInput";
import { ScheduleInput } from "./ScheduleInput";

export const RosterInput: React.FC<BaseProps<{
  //   value?: Roster;
  //   onChange: (value?: Roster) => Roster;
}>> = () => {
  const [personList, setPersonList] = useState<PersonList | undefined>();
  const [schedule, setSchedule] = useState<Schedule | undefined>();

  console.log(schedule);

  return (
    <Box>
      <PersonListInput value={personList} onChange={setPersonList} />
      <ScheduleInput value={schedule} onChange={setSchedule} />
    </Box>
  );
};
