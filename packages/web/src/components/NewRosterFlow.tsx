import { Box, Button, Stack, useTheme } from "@chakra-ui/core";
import { PersonList, PersonRotation, Schedule } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonListForm } from "./PersonListForm";
import { PersonRotationForm } from "./PersonRotationForm";
import { ScheduleForm } from "./ScheduleForm";

enum Step {
  PERSON_LIST,
  PERSON_ROTATION,
  SCHEDULE,
  DONE,
}

export const NewRosterFlow: React.FC<BaseProps<{
  //   value?: Roster;
  //   onChange: (value?: Roster) => Roster;
}>> = () => {
  const theme = useTheme();
  const [step, setStep] = useState<Step>(Step.PERSON_LIST);
  const [personList, setPersonList] = useState<PersonList | undefined>();
  const [schedule, setSchedule] = useState<Schedule | undefined>();
  const [personRotation, setPersonRotation] = useState<
    PersonRotation | undefined
  >();

  const onNext = () => {
    switch (step) {
      case Step.PERSON_LIST:
        setStep(Step.PERSON_ROTATION);
        break;
      case Step.PERSON_ROTATION:
        setStep(Step.SCHEDULE);
        break;
      case Step.SCHEDULE:
        setStep(Step.DONE);
        break;
    }
  };

  const nextView = (
    <Box>
      <Card>
        <Button onClick={onNext}>Next</Button>
      </Card>
    </Box>
  );

  const stepView = {
    [Step.PERSON_LIST]: (
      <PersonListForm
        onChange={(value) => {
          setPersonList(value);
          setStep(Step.PERSON_ROTATION);
        }}
      />
    ),
    [Step.PERSON_ROTATION]: personList ? (
      <PersonRotationForm
        personList={personList}
        value={personRotation}
        onChange={(value) => {
          setPersonRotation(value);
          setStep(Step.SCHEDULE);
        }}
      />
    ) : null,
    [Step.SCHEDULE]: (
      <Stack spacing={4}>
        <Box>
          <ScheduleForm value={schedule} onChange={setSchedule} />
        </Box>
        {nextView}
      </Stack>
    ),
    [Step.DONE]: <Card>Done</Card>,
  }[step];

  return <Box padding={theme.space[4]}>{stepView}</Box>;
};
