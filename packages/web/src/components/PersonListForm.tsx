import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonInput } from "./PersonInput";

export const PersonListForm: React.FC<BaseProps<{
  value?: PersonList;
  onSubmit: (value: PersonList) => void;
}>> = ({ className, value, onSubmit }) => {
  const { onError } = useAlert();
  const [personListItems, setPersonListItems] = useState<readonly Person[]>([]);
  const [person, setPerson] = useState<Person | undefined>();

  useEffect(() => {
    if (value) {
      setPersonListItems(value.items);
    } else {
      setPersonListItems([]);
    }
  }, [value]);

  const onAddPerson = () => {
    if (person) {
      setPersonListItems([...personListItems, person]);
      setPerson(undefined);
    }
  };

  return (
    <Card
      className={className}
      header={<Heading>People</Heading>}
      footer={
        <Button
          onClick={() => {
            try {
              const personList = new PersonList(personListItems);
              onSubmit(personList);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddPerson();
            }}
          >
            <PersonInput value={person} onChange={setPerson} />
          </form>
        </Box>
        <Box>
          <Stack spacing={4}>
            {personListItems.map((_) => {
              return (
                <Box key={_.id.toString()}>
                  <Card>{_.name}</Card>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};
