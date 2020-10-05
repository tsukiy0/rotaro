import { Box, Stack, useTheme } from "@chakra-ui/core";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const Card: React.FC<BaseProps<{
  header?: React.ReactNode;
  footer?: React.ReactNode;
}>> = ({ className, children, header, footer }) => {
  const theme = useTheme();

  return (
    <Box className={className} borderWidth="1px">
      {header && (
        <Box borderBottomWidth="1px" padding={theme.space[4]}>
          {header}
        </Box>
      )}
      <Box padding={theme.space[4]}>{children}</Box>
      {footer && (
        <Box borderTopWidth="1px" padding={theme.space[4]}>
          {footer}
        </Box>
      )}
    </Box>
  );
};
