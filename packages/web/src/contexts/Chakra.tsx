import React from "react";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";

export const Chakra: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <DarkMode>
        <CSSReset />
        {children}
      </DarkMode>
    </ThemeProvider>
  );
};
