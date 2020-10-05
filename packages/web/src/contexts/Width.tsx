import { Box } from "@chakra-ui/core";
import React, { useCallback, useRef, useState } from "react";
import { NavBar } from "../components/NavBar";
import { BaseProps } from "../models/BaseProps";

export const Width: React.FC<BaseProps> = ({ className, children }) => {
  const [navHeight, setNavHeight] = useState<number>(0);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      setNavHeight(node.clientHeight);
    }
  }, []);

  return (
    <Box className={className}>
      <NavBar ref={ref} />
      <Box
        overflow="auto"
        height={`calc(100vh - ${navHeight}px)`}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          minWidth="320px"
          maxWidth="768px"
          width="100%"
          height={`calc(100vh - ${navHeight}px)`}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
