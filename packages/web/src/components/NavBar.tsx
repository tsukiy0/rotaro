import { Box, Button, Stack, useTheme } from "@chakra-ui/core";
import React from "react";
import { useRouter } from "next/router";
import { BaseProps } from "../models/BaseProps";
import { Logo } from "./Logo";

export const NavBar = React.forwardRef<HTMLDivElement, BaseProps>(
  ({ className }, ref) => {
    const router = useRouter();
    const theme = useTheme();

    return (
      <Box
        ref={ref}
        className={className}
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={theme.space[4]}
      >
        <Box onClick={() => router.push("/")} cursor="pointer">
          <Logo />
        </Box>
        <Box>
          <Button colorScheme="green" onClick={() => router.push("/new")}>
            Create
          </Button>
        </Box>
      </Box>
    );
  },
);

NavBar.displayName = "NavBar";
