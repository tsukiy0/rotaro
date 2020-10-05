import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import {
  Days,
  PersonDays,
  PersonId,
  PersonList,
  PersonRotation,
} from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { DaysInput } from "./DaysInput";
import { SelectPersonInput } from "./SelectPersonInput";

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

  const onSubmit = () => {
    try {
      onChange(
        new PersonRotation(personList, personRotationItems, new Days(1)),
      );
    } catch (err) {
      onError(err);
    }
  };

  const personRotationItemsView = (
    <Stack spacing={4}>
      {personRotationItems.map((_, i) => {
        return (
          <Box key={i}>
            <Card>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading as="h1" size="md">
                  {
                    personList.items.find((person) =>
                      person.id.equals(_.personId),
                    )?.name
                  }
                </Heading>
                <Heading as="h2" size="sm">
                  {_.days.toNumber()}
                </Heading>
              </Box>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );

  return (
    <Card
      className={className}
      header={<Heading>Rotation</Heading>}
      footer={<Button onClick={onSubmit}>Submit</Button>}
    >
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
          <Button onClick={onAddPersonDay}>Add</Button>
        </Box>
        <Box>{personRotationItemsView}</Box>
      </Stack>
    </Card>
  );
};
