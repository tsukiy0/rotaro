import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Person, PersonIdRandomizer } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const PersonInput: React.FC<BaseProps<{
  value?: Person;
  onChange: (value: Person) => void;
}>> = ({ className, value, onChange }) => {
  const id = "name";
  const [error, setError] = useState<Error | undefined>();

  const name = value ? value.name : "";

  return (
    <FormControl isInvalid={Boolean(error)} className={className}>
      <FormLabel htmlFor={id}>Name</FormLabel>
      <Input
        id="name"
        placeholder="Enter a name"
        value={name}
        onChange={(e: any) => {
          try {
            const person = new Person(
              PersonIdRandomizer.random(),
              e.target.value,
            );
            onChange(person);
          } catch (err) {
            setError(err);
          }
        }}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
