import { Box, Button, List, ListItem } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonInput } from "./PersonInput";

export const PersonListInput: React.FC<BaseProps<{
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
    <Box className={className} marginBottom="2rem">
      <PersonInput value={person} onChange={setPerson} />
      <Button onClick={onAddPerson}>Add</Button>
      <List>
        {existingItems.map((_) => {
          return <ListItem key={_.id.toString()}>{_.name}</ListItem>;
        })}
      </List>
    </Box>
  );
};
