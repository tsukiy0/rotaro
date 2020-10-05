import { useToast } from "@chakra-ui/core";
import React, { useContext } from "react";

type AlertValue = {
  onSuccess: (message: string) => void;
  onError: (e: Error) => void;
};

const AlertContext = React.createContext<AlertValue>({} as any);

export const AlertContextProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const onSuccess = (message: string) => {
    toast({
      title: message,
      status: "success",
    });
  };

  const onError = (error: Error) => {
    toast({
      title: error.message,
      status: "error",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        onSuccess,
        onError,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertValue => {
  const alert = useContext(AlertContext);
  return alert;
};
