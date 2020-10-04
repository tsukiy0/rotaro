import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/core";
import { Day, dayFromString, DayList } from "@rotaro/core";
import { isArrayEqual } from "@tsukiy0/tscore";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const DayListInput: React.FC<BaseProps<{
  value?: DayList;
  onChange: (value: DayList) => void;
}>> = ({ className, value, onChange }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (!value) {
      return setDays([]);
    }

    if (isArrayEqual(value.items, days, (a, b) => a === b)) {
      return;
    }

    setDays([...value.items]);
  }, [value, days]);

  useEffect(() => {
    try {
      setError(undefined);
      onChange(new DayList(days));
    } catch (e) {
      setError(e);
    }
  }, [days, onChange]);

  return (
    <FormControl className={className}>
      <FormLabel htmlFor="dayList">Day List</FormLabel>
      <CheckboxGroup
        name="dayList"
        value={days}
        onChange={(values) => {
          setDays(values.map((_) => dayFromString(_ as string)));
        }}
      >
        {Object.values(Day).map((_) => {
          return (
            <Checkbox key={_} value={_}>
              {_}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
