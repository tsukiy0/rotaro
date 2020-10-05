import React from "react";
import { useColorMode } from "@chakra-ui/core";

const DarkMode: React.FC = ({ children }) => {
  const { setColorMode } = useColorMode();
  setColorMode("dark");
  return <>{children}</>;
};

export default DarkMode;
