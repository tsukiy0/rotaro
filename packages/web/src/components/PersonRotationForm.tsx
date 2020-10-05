import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { Days, PersonDays, PersonList, PersonRotation } from "@rotaro/core";
import React, { useState } from "react";
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
  const [personDays, setPersonDays] = useState<PersonDays | undefined>();

  const defaultPersonId = personList.items[0].id;
  const defaultDays = new Days(7);

  const existingItem = value ? value.rotation : [];

  return (
    <Card
      className={className}
      header={<Heading>Rotation</Heading>}
      footer={<Button>Submit</Button>}
    >
      <Stack spacing={4}>
        <Box>
          <SelectPersonInput
            personList={personList}
            value={personDays?.personId}
            onChange={(personId) => {
              try {
                setPersonDays(
                  new PersonDays(
                    personId,
                    personDays ? personDays.days : defaultDays,
                  ),
                );
              } catch (err) {
                onError(err);
              }
            }}
          />
        </Box>
        <Box>
          <DaysInput
            label="Days"
            value={personDays?.days}
            onChange={(days) => {
              try {
                setPersonDays(
                  new PersonDays(
                    personDays ? personDays.personId : defaultPersonId,
                    days,
                  ),
                );
              } catch (err) {
                onError(err);
              }
            }}
          />
        </Box>
        <Box>
          <Button
            onClick={() => {
              try {
                if (!personDays) {
                  return;
                }

                onChange(
                  new PersonRotation(
                    personList,
                    [...(value ? value.rotation : []), personDays],
                    new Days(1),
                  ),
                );
              } catch (err) {
                onError(err);
              }
            }}
          >
            Add
          </Button>
        </Box>
        <Box>
          <Stack spacing={4}>
            {existingItem.map((_, i) => {
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
        </Box>
      </Stack>
    </Card>
  );
};
