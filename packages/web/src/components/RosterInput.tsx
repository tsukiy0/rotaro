import { Box } from "@chakra-ui/core";
import { Day, DayList, Hour, PersonList, Roster, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonListInput } from "./PersonListInput";
import { ScheduleInput } from "./ScheduleInput";

export const RosterInput: React.FC<BaseProps<{
  //   value?: Roster;
  //   onChange: (value?: Roster) => Roster;
}>> = () => {
  const [personList, setPersonList] = useState<PersonList>(new PersonList([]));
  const [schedule, setSchedule] = useState<Schedule | undefined>();

  return (
    <Box>
      <PersonListInput value={personList} onChange={setPersonList} />
      <ScheduleInput value={schedule} onChange={setSchedule} />
    </Box>
  );
};
