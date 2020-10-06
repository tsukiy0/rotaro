import { Box, Button, Heading, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { BaseProps } from "../models/BaseProps";

export const HomePage: React.FC<BaseProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Box
      className={className}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={8} alignItems="center">
        <Box>
          <Heading textAlign="center">Build simple rotating rosters.</Heading>
        </Box>
        <Box>
          <Button
            onClick={() => router.push("/roster/new")}
            colorScheme="green"
          >
            Create
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
