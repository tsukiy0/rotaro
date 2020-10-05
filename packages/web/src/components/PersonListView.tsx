import { Box, Stack } from "@chakra-ui/core";
import { PersonList } from "@rotaro/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";

export const PersonListView: React.FC<BaseProps<{
  personList: PersonList;
}>> = ({ className, personList }) => {
  return (
    <Stack spacing={4} className={className}>
      {personList.items.map((_) => {
        return (
          <Box key={_.id.toString()}>
            <Card>{_.name}</Card>
          </Box>
        );
      })}
    </Stack>
  );
};
