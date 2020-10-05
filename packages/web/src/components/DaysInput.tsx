import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/core";
import { Days } from "@rotaro/core";
import { GuidRandomizer } from "@tsukiy0/tscore";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";

export const DaysInput: React.FC<BaseProps<{
  label: string;
  value?: Days;
  onChange: (value: Days) => void;
}>> = ({ className, value, onChange, label }) => {
  const id = GuidRandomizer.random().toString();
  const [error, setError] = useState<Error | undefined>();

  return (
    <FormControl isInvalid={Boolean(error)} className={className}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <NumberInput
        step={1}
        id={id}
        value={value?.toNumber()}
        onChange={(e) => {
          setError(undefined);
          try {
            onChange(new Days(parseInt(e)));
          } catch (err) {
            setError(err);
          }
        }}
      >
        {/* @TODO bug with value not syncing with display */}
        <NumberInputField value={value?.toNumber()} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
