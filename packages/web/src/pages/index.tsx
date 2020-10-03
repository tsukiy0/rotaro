import { Button } from "@chakra-ui/core";
import React from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";

const Index: React.FC = () => {
  const { onError } = useAlert();

  return (
    <div>
      hello world!
      <Button onClick={() => onError(new Error("wtf is going on"))}>
        trigger error
      </Button>
    </div>
  );
};

export default Index;
