import { Box } from "@chakra-ui/core";
import { Person, PersonList } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonInput } from "./PersonInput";

export const PersonListInput: React.FC<BaseProps<{
  value: PersonList;
  onChange: (value: PersonList) => void;
}>> = ({ className, value, onChange }) => {
  const [person, setPerson] = useState<Person | undefined>();

  return (
    <Box className={className}>
      <PersonInput value={person} onChange={setPerson} />
    </Box>
  );
};
