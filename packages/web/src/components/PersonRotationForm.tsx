import { Box, Heading, IconButton, Stack, Badge } from "@chakra-ui/core";
import {
  Days,
  PersonDays,
  PersonId,
  PersonList,
  PersonRotation,
} from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card, CardHeader } from "./Card";
import { DaysInput } from "./DaysInput";
import { SelectPersonInput } from "./SelectPersonInput";
import { FullWidthButton } from "./FullWidthButton";

export const PersonRotationForm: React.FC<BaseProps<{
  personList: PersonList;
  value?: PersonRotation;
  onChange: (value: PersonRotation) => void;
}>> = ({ className, value, onChange, personList }) => {
  const { onError } = useAlert();
  const [personRotationItems, setPersonRotationItems] = useState<
    readonly PersonDays[]
  >([]);
  const [days, setDays] = useState<Days | undefined>();
  const [personId, setPersonId] = useState<PersonId | undefined>();

  useEffect(() => {
    if (value) {
      setPersonRotationItems(value.rotation);
    } else {
      setPersonRotationItems([]);
    }
  }, [value]);

  const onAddPersonDay = () => {
    try {
      if (!days || !personId) {
        return;
      }

      setPersonRotationItems([
        ...personRotationItems,
        new PersonDays(personId, days),
      ]);
    } catch (err) {
      onError(err);
    }
  };

  const onRemovePersonDay = (i1: number) => {
    setPersonRotationItems(
      personRotationItems.filter((_, i2) => {
        return i2 !== i1;
      }),
    );
  };

  const onSubmit = () => {
    try {
      onChange(
        new PersonRotation(personList, personRotationItems, new Days(1)),
      );
    } catch (err) {
      onError(err);
    }
  };

  const addPersonDayView = (
    <Stack spacing={4}>
      <Box>
        <SelectPersonInput
          personList={personList}
          value={personId}
          onChange={setPersonId}
        />
      </Box>
      <Box>
        <DaysInput label="Days" value={days} onChange={setDays} />
      </Box>
      <Box>
        <FullWidthButton onClick={onAddPersonDay}>Add</FullWidthButton>
      </Box>
    </Stack>
  );

  const personRotationItemsView = (
    <Stack spacing={4}>
      {personRotationItems.map((_, i) => {
        const person = personList.items.find((person) =>
          person.id.equals(_.personId),
        );

        if (!person) {
          return null;
        }

        return (
          <Box key={i}>
            <Card
              header={
                <CardHeader
                  left={
                    <Stack direction="row">
                      <Heading size="sm">{person.name}</Heading>
                      <Badge>{_.days.toNumber()}</Badge>
                    </Stack>
                  }
                  right={
                    <IconButton
                      aria-label="remove person day"
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => onRemovePersonDay(i)}
                    />
                  }
                />
              }
            />
          </Box>
        );
      })}
    </Stack>
  );

  return (
    <Card
      className={className}
      header={<Heading>Rotation</Heading>}
      footer={
        <FullWidthButton onClick={onSubmit} colorScheme="green">
          Submit
        </FullWidthButton>
      }
    >
      <Stack spacing={4}>
        <Box>{addPersonDayView}</Box>
        <Box>{personRotationItemsView}</Box>
      </Stack>
    </Card>
  );
};
