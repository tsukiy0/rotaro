import { Box, Button, Heading, Stack, useTheme } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const HomePage: React.FC<BaseProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Box
      className={className}
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={4} alignItems="center">
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
