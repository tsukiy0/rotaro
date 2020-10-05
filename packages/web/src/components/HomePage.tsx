import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { BaseProps } from "../models/BaseProps";

export const HomePage: React.FC<BaseProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Box
      className={className}
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={4} alignItems="center">
        <Box>
          <RepeatIcon className="spin" boxSize={24} />
          <style jsx global>{`
            .spin {
              animation-name: spin;
              animation-duration: 5000ms;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
            }

            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Box>
        <Box>
          <Heading>Rotaro</Heading>
        </Box>
        <Box>
          <Button onClick={() => router.push("/new")}>Create</Button>
        </Box>
      </Stack>
    </Box>
  );
};
