import { Box, Heading, IconButton, Stack } from "@chakra-ui/core";
import { Person, PersonId, PersonList } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { BaseProps } from "../models/BaseProps";
import { Card, CardHeader } from "./Card";
import { PersonInput } from "./PersonInput";
import { FullWidthButton } from "./FullWidthButton";

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

  const onRemovePerson = (personId: PersonId) => {
    setPersonListItems(
      personListItems.filter((_) => {
        return !_.id.equals(personId);
      }),
    );
  };

  const addPersonView = (
    <Stack spacing={4}>
      <Box>
        <PersonInput value={person} onChange={setPerson} />
      </Box>
      <Box>
        <FullWidthButton onClick={onAddPerson}>Add</FullWidthButton>
      </Box>
    </Stack>
  );

  const personListItemsView = (
    <Stack spacing={4}>
      {personListItems.map((_) => {
        return (
          <Box key={_.id.toString()}>
            <Card
              header={
                <CardHeader
                  left={<Heading size="sm">{_.name}</Heading>}
                  right={
                    <IconButton
                      aria-label="remove person"
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => onRemovePerson(_.id)}
                    />
                  }
                />
              }
            />
          </Box>
        );
      })}
    </Stack>
  );

  return (
    <Stack className={className} spacing={4}>
      <Box>
        <Card
          header={<Heading>People</Heading>}
          footer={
            <FullWidthButton
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
            </FullWidthButton>
          }
        >
          <Stack spacing={4}>
            <Box>{addPersonView}</Box>
            <Box>{personListItemsView}</Box>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
};
