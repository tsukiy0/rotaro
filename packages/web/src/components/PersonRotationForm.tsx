import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { Days, PersonDays, PersonList, PersonRotation } from "@rotaro/core";
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
  const [personDays, setPersonDays] = useState<PersonDays | undefined>();

  useEffect(() => {
    if (value) {
      setPersonRotationItems(value.rotation);
    } else {
      setPersonRotationItems([]);
    }
  }, [value]);

  const defaultPersonId = personList.items[0].id;
  const defaultDays = new Days(7);

  return (
    <Card
      className={className}
      header={<Heading>Rotation</Heading>}
      footer={
        <Button
          onClick={() => {
            try {
              onChange(
                new PersonRotation(
                  personList,
                  personRotationItems,
                  new Days(1),
                ),
              );
            } catch (err) {
              onError(err);
            }
          }}
        >
          Submit
        </Button>
      }
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
              if (!personDays) {
                return;
              }

              setPersonRotationItems([...personRotationItems, personDays]);
            }}
          >
            Add
          </Button>
        </Box>
        <Box>
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
        </Box>
      </Stack>
    </Card>
  );
};
