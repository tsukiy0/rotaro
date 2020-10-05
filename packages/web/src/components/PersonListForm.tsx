import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonInput } from "./PersonInput";
import { PersonListView } from "./PersonListView";

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
    <Stack className={className} spacing={4}>
      <Box>
        <Card className={className} header={<Heading>People</Heading>}>
          <Stack spacing={4}>
            <Box>
              <PersonInput value={person} onChange={setPerson} />
            </Box>
            <Box>
              <Button onClick={onAddPerson}>Add</Button>
            </Box>
            {personListItems.length > 0 && (
              <Box>
                <PersonListView personList={new PersonList(personListItems)} />
              </Box>
            )}
          </Stack>
        </Card>
      </Box>
      <Box>
        <Card>
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
        </Card>
      </Box>
    </Stack>
  );
};
