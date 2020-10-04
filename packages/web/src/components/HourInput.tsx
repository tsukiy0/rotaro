import { FormControl, FormLabel, Select } from "@chakra-ui/core";
import { Hour, hourFromString } from "@rotaro/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const HourInput: React.FC<BaseProps<{
  value: Hour;
  onChange: (value: Hour) => void;
}>> = ({ className, value, onChange }) => {
  return (
    <FormControl className={className}>
      <FormLabel htmlFor="hour">Hour</FormLabel>
      <Select
        name="hour"
        placeholder="Select hour"
        value={value}
        onChange={(e) => onChange(hourFromString(e.target.value))}
      >
        {Object.values(Hour).map((_) => {
          return (
            <option key={_} value={_}>
              {_}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
