import React from "react";
import dynamic from "next/dynamic";
import { theme, ChakraProvider } from "@chakra-ui/core";
const DarkMode = dynamic(() => import("./DarkMode"), {
  ssr: false,
});

export const Chakra: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>{children}</DarkMode>
    </ChakraProvider>
  );
};
