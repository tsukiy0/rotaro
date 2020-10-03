import { Box, CircularProgress } from "@chakra-ui/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const LoadingPage: React.FC<BaseProps> = ({ className }) => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate />
    </Box>
  );
};
