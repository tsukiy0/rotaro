import {
  Box,
  Button,
  CircularProgress,
  Stack,
  useTheme,
} from "@chakra-ui/core";
import {
  PersonList,
  PersonRotation,
  Roster,
  RosterIdRandomizer,
  Schedule,
} from "@rotaro/core";
import React, { useCallback, useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { useServices } from "../contexts/ServicesContext/ServicesContext";
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
  const { onError } = useAlert();
  const { rosterService } = useServices();
  const [step, setStep] = useState<Step>(Step.PERSON_LIST);
  const [personList, setPersonList] = useState<PersonList | undefined>();
  const [schedule, setSchedule] = useState<Schedule | undefined>();
  const [personRotation, setPersonRotation] = useState<
    PersonRotation | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onCreate = useCallback(async () => {
    try {
      console.log(personRotation, schedule);
      if (personRotation && schedule) {
        setIsLoading(true);
        await rosterService.createRoster(
          new Roster(RosterIdRandomizer.random(), personRotation, schedule),
        );
      }
    } catch (err) {
      onError(err);
    } finally {
      setIsLoading(false);
    }
  }, [rosterService, personRotation, schedule, onError]);

  useEffect(() => {
    if (step === Step.DONE) {
      onCreate();
    }
  }, [step, onCreate]);

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
      <ScheduleForm
        value={schedule}
        onChange={(value) => {
          setSchedule(value);
          setStep(Step.DONE);
        }}
      />
    ),
    [Step.DONE]: isLoading ? (
      <Card>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress isIndeterminate />
        </Box>
      </Card>
    ) : (
      <Card>Done</Card>
    ),
  }[step];

  return <Box padding={theme.space[4]}>{stepView}</Box>;
};
