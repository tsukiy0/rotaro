import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonInput } from "./PersonInput";

export const PersonListForm: React.FC<BaseProps<{
  value?: PersonList;
  onChange: (value: PersonList) => void;
}>> = ({ className, value, onChange }) => {
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
              onChange(personList);
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
          <PersonInput value={person} onChange={setPerson} />
        </Box>
        <Box>
          <Button onClick={onAddPerson}>Add</Button>
        </Box>
        {personListItems.map((_) => {
          return (
            <Box key={_.id.toString()}>
              <Card>{_.name}</Card>
            </Box>
          );
        })}
      </Stack>
    </Card>
  );
};
