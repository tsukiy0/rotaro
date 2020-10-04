import { Box, Button, List, ListItem } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonInput } from "./PersonInput";

export const PersonListInput: React.FC<BaseProps<{
  value: PersonList;
  onChange: (value: PersonList) => void;
}>> = ({ className, value, onChange }) => {
  const [person, setPerson] = useState<Person | undefined>();
  const onAddPerson = () => {
    if (person) {
      onChange(new PersonList([...value.items, person]));
      setPerson(undefined);
    }
  };

  return (
    <Box className={className}>
      <PersonInput value={person} onChange={setPerson} />
      <Button onClick={onAddPerson}>Add</Button>
      <List>
        {value.items.map((_) => {
          return <ListItem key={_.id.toString()}>{_.name}</ListItem>;
        })}
      </List>
    </Box>
  );
};
