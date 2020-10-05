import { Box } from "@chakra-ui/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const Width: React.FC<BaseProps> = ({ className, children }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box className={className} minWidth="320px" maxWidth="768px" width="100%">
        {children}
      </Box>
    </Box>
  );
};
