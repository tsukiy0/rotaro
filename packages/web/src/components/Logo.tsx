import { Box, Heading, useTheme } from "@chakra-ui/core";
import React from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { BaseProps } from "../models/BaseProps";

export const Logo: React.FC<BaseProps<{
  large?: boolean;
}>> = ({ large = false }) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box marginRight={theme.space[2]}>
        <RepeatIcon
          className="spin"
          boxSize={large ? 12 : 8}
          alignItems="center"
        />
        <style jsx global>{`
          .spin {
            animation-name: spin;
            animation-duration: 10000ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </Box>
      <Box>
        <Heading as="h1" size={large ? "2xl" : "lg"}>
          Rotaro
        </Heading>
      </Box>
    </Box>
  );
};
