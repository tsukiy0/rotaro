import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/core";
import { Day, dayFromString, DayList } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const DayListInput: React.FC<BaseProps<{
  value?: DayList;
  onChange: (value: DayList) => void;
}>> = ({ className, value, onChange }) => {
  const [error, setError] = useState<Error | undefined>();

  const items = value ? [...value.items] : [];

  return (
    <FormControl className={className} isInvalid={Boolean(error)}>
      <FormLabel>Days</FormLabel>
      <CheckboxGroup
        value={items}
        onChange={(values) => {
          try {
            onChange(
              new DayList(values.map((_) => dayFromString(_ as string))),
            );
          } catch (e) {
            setError(e);
          }
        }}
      >
        {Object.values(Day).map((value) => {
          return (
            <Checkbox key={value} value={value}>
              {value}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
