import React, { ComponentProps } from "react";
import { Button } from "@chakra-ui/core";

export const FullWidthButton: React.FC<ComponentProps<typeof Button>> = (
  props,
) => {
  return <Button width="100%" {...props} />;
};
