import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const NotFoundPage: React.FC<BaseProps> = ({ className }) => {
  return (
    <Box
      className={className}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Not Found</Heading>
    </Box>
  );
};
