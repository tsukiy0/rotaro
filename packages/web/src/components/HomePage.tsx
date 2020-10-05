import { Box, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { BaseProps } from "../models/BaseProps";
import { FullWidthButton } from "./FullWidthButton";
import { Logo } from "./Logo";

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
          <Logo large />
        </Box>
        <Box>
          <FullWidthButton
            onClick={() => router.push("/new")}
            colorScheme="green"
          >
            Create
          </FullWidthButton>
        </Box>
      </Stack>
    </Box>
  );
};
