import url from "url";
import {
  Box,
  CircularProgress,
  Heading,
  Stack,
  useClipboard,
  useTheme,
} from "@chakra-ui/core";
import {
  PersonList,
  PersonRotation,
  Roster,
  RosterId,
  RosterIdRandomizer,
  Schedule,
} from "@rotaro/core";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { useServices } from "../contexts/ServicesContext/ServicesContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonListForm } from "./PersonListForm";
import { PersonRotationForm } from "./PersonRotationForm";
import { ScheduleForm } from "./ScheduleForm";
import { FullWidthButton } from "./FullWidthButton";

enum Step {
  PERSON_LIST,
  PERSON_ROTATION,
  SCHEDULE,
  CREATING,
  DONE,
}

export const NewRosterPage: React.FC<BaseProps> = ({ className }) => {
  const theme = useTheme();
  const router = useRouter();
  const { onError } = useAlert();
  const { rosterService } = useServices();
  const [step, setStep] = useState<Step>(Step.PERSON_LIST);
  const [personList, setPersonList] = useState<PersonList | undefined>();
  const [schedule, setSchedule] = useState<Schedule | undefined>();
  const [personRotation, setPersonRotation] = useState<
    PersonRotation | undefined
  >();
  const [rosterId, setRosterId] = useState<RosterId | undefined>();
  const pathUrl = `/roster/${rosterId?.toString()}`;
  const fullUrl = url.resolve(window.location.href, pathUrl);
  const { onCopy } = useClipboard(fullUrl);

  const onCreate = useCallback(async () => {
    try {
      if (personRotation && schedule) {
        const rosterId = RosterIdRandomizer.random();
        await rosterService.createRoster(
          new Roster(rosterId, personRotation, schedule),
        );
        setRosterId(rosterId);
      }
    } catch (err) {
      onError(err);
    } finally {
      setStep(Step.DONE);
    }
  }, [rosterService, personRotation, schedule, onError]);

  useEffect(() => {
    if (step === Step.CREATING) {
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
          setStep(Step.CREATING);
        }}
      />
    ),
    [Step.CREATING]: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress isIndeterminate />
      </Box>
    ),
    [Step.DONE]: rosterId && (
      <Card header={<Heading>Done</Heading>}>
        <Stack spacing={4}>
          <Box>
            <FullWidthButton onClick={onCopy}>Copy URL</FullWidthButton>
          </Box>
          <Box>
            <FullWidthButton
              onClick={() => router.push(pathUrl)}
              colorScheme="green"
            >
              View
            </FullWidthButton>
          </Box>
        </Stack>
      </Card>
    ),
  }[step];

  return <Box className={className}>{stepView}</Box>;
};
