import { FormControl, FormLabel } from "@chakra-ui/core";
import { PersonList, PersonRotation } from "@rotaro/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const PersonRotationInput: React.FC<BaseProps<{
  personList: PersonList;
  value?: PersonRotation;
  onChange: (value: PersonRotation) => void;
}>> = ({ className, value, onChange, personList }) => {
  return (
    <FormControl marginBottom="2rem">
      <FormLabel>Rotation</FormLabel>
    </FormControl>
  );
};
