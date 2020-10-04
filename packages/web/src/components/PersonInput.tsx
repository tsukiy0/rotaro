import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Person, PersonIdRandomizer } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const PersonInput: React.FC<BaseProps<{
  value?: Person;
  onChange: (value: Person) => void;
}>> = ({ className, value, onChange }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setName(value?.name ?? "");
  }, [value]);

  useEffect(() => {
    try {
      setError(undefined);
      if (name) {
        const person = new Person(PersonIdRandomizer.random(), name);
        onChange(person);
      }
    } catch (e) {
      setError(e);
    }
  }, [name, onChange]);

  return (
    <FormControl isInvalid={Boolean(error)} className={className}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input
        name="name"
        placeholder="name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
