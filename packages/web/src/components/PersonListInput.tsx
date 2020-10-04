import { Box, Button, List, ListItem } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import { isArrayEqual } from "@tsukiy0/tscore";
import React, { useEffect, useRef, useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonInput } from "./PersonInput";

export const PersonListInput: React.FC<BaseProps<{
  value?: PersonList;
  onChange: (value: PersonList) => void;
}>> = ({ className, value, onChange }) => {
  const [person, setPerson] = useState<Person | undefined>();
  const [personListItems, setPersonListItems] = useState<Person[]>([]);
  const onAddPerson = () => {
    if (person) {
      setPerson(undefined);
      setPersonListItems([...personListItems, person]);
    }
  };

  useEffect(() => {
    if (!value) {
      // setPersonListItems([]);
    } else {
      if (!isArrayEqual(value.items, personListItems, (a, b) => a.equals(b))) {
        setPersonListItems([...value.items]);
      }
    }
  }, [value, personListItems]);

  useEffect(() => {
    if (personListItems.length !== 0) {
      onChange(new PersonList(personListItems));
    }
  }, [personListItems, onChange]);

  return (
    <Box className={className}>
      <PersonInput value={person} onChange={setPerson} />
      <Button onClick={onAddPerson}>Add</Button>
      <List>
        {personListItems.map((_) => {
          return <ListItem key={_.id.toString()}>{_.name}</ListItem>;
        })}
      </List>
    </Box>
  );
};
