import { Box, Heading, Stack } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { PersonInput } from "./PersonInput";

export const PersonListForm: React.FC<BaseProps<{
  value?: PersonList;
  onChange: (value: PersonList) => void;
}>> = ({ className, value, onChange }) => {
  const existingItems = value ? value.items : [];

  const [person, setPerson] = useState<Person | undefined>();
  const onAddPerson = () => {
    if (person) {
      setPerson(undefined);
      onChange(new PersonList([...existingItems, person]));
    }
  };

  return (
    <Card className={className} header={<Heading>People</Heading>}>
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
            {existingItems.map((_) => {
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
