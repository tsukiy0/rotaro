import { Box } from "@chakra-ui/core";
import { PersonList, Roster } from "@rotaro/core";
import React, { useState } from "react";
import { BaseProps } from "../models/BaseProps";
import { PersonListInput } from "./PersonListInput";

export const RosterInput: React.FC<BaseProps<{
  //   value?: Roster;
  //   onChange: (value?: Roster) => Roster;
}>> = () => {
  const [personList, setPersonList] = useState<PersonList>(new PersonList([]));

  return (
    <Box>
      <PersonListInput value={personList} onChange={setPersonList} />
    </Box>
  );
};
