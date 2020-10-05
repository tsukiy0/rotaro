import { Box } from "@chakra-ui/core";
import { PersonList, PersonRotation, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonListForm } from "./PersonListForm";
import { PersonRotationInput } from "./PersonRotationInput";
import { ScheduleForm } from "./ScheduleForm";

export const RosterInput: React.FC<BaseProps<{
  //   value?: Roster;
  //   onChange: (value?: Roster) => Roster;
}>> = () => {
  const [personList, setPersonList] = useState<PersonList | undefined>();
  const [schedule, setSchedule] = useState<Schedule | undefined>();
  const [rotation, setRotation] = useState<PersonRotation | undefined>();

  console.log(schedule);

  return (
    <Box>
      <PersonListForm value={personList} onChange={setPersonList} />
      <ScheduleForm value={schedule} onChange={setSchedule} />
      {personList && (
        <PersonRotationInput
          personList={personList}
          value={rotation}
          onChange={setRotation}
        />
      )}
    </Box>
  );
};
