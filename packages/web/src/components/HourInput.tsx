import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/core";
import { Hour, hourFromString } from "@rotaro/core";
import { GuidRandomizer } from "@tsukiy0/tscore";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const HourInput: React.FC<BaseProps<{
  value?: Hour;
  onChange: (value: Hour) => void;
}>> = ({ className, value, onChange }) => {
  const id = GuidRandomizer.random().toString();
  const [error, setError] = useState<Error | undefined>();

  return (
    <FormControl className={className} isInvalid={Boolean(error)}>
      <FormLabel htmlFor={id}>Hour</FormLabel>
      <Select
        id={id}
        placeholder="Select an hour"
        value={value}
        onChange={(e) => {
          try {
            onChange(hourFromString(e.target.value));
          } catch (err) {
            setError(err);
          }
        }}
      >
        {Object.values(Hour).map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
