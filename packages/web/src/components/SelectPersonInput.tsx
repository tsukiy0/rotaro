import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/core";
import { PersonId, PersonList } from "@rotaro/core";
import { GuidRandomizer } from "@tsukiy0/tscore";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const SelectPersonInput: React.FC<BaseProps<{
  personList: PersonList;
  value?: PersonId;
  onChange: (value: PersonId) => void;
}>> = ({ className, personList, value, onChange }) => {
  const id = GuidRandomizer.random().toString();
  const [error, setError] = useState<Error | undefined>();

  return (
    <FormControl isInvalid={Boolean(error)} className={className}>
      <FormLabel htmlFor={id}>Person</FormLabel>
      <Select
        id={id}
        placeholder="Select a person"
        value={value?.toString()}
        onChange={(e) => {
          try {
            onChange(PersonId.fromString(e.target.value));
          } catch (err) {
            setError(err);
          }
        }}
      >
        {personList.items.map((person) => {
          return (
            <option key={person.id.toString()} value={person.id.toString()}>
              {person.name}
            </option>
          );
        })}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
