import { Box, CircularProgress } from "@chakra-ui/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const LoadingPage: React.FC<BaseProps> = ({ className }) => {
  return (
    <Box
      className={className}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate />
    </Box>
  );
};
