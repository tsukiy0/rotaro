import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
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
        <Stack spacing={2}>
          {Object.values(Day).map((value) => {
            return (
              <Box key={value}>
                <Checkbox value={value}>{value}</Checkbox>
              </Box>
            );
          })}
        </Stack>
      </CheckboxGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
