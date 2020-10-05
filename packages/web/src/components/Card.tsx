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
      {header && <Box padding={theme.space[4]}>{header}</Box>}
      {header && children && <Box borderBottomWidth="1px" />}
      {children && <Box padding={theme.space[4]}>{children}</Box>}
      {footer && children && <Box borderTopWidth="1px" />}
      {footer && <Box padding={theme.space[4]}>{footer}</Box>}
    </Box>
  );
};

export const CardHeader: React.FC<BaseProps<{
  left?: React.ReactNode;
  right?: React.ReactNode;
}>> = ({ className, left, right }) => {
  return (
    <Box
      className={className}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>{left}</Box>
      <Box>{right}</Box>
    </Box>
  );
};
