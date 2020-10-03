import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/core";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, AlertType } from "../../models/Alert";
import { BaseProps } from "../../models/BaseProps";

type AlertValue = {
  onSuccess: (message: string) => void;
  onError: (e: Error) => void;
  onClose: () => void;
};

const AlertContext = React.createContext<AlertValue>({} as any);

const alertTypeToChakra = (type: AlertType): AlertProps["status"] => {
  switch (type) {
    case AlertType.ERROR:
      return "error";
    case AlertType.SUCCESS:
      return "success";
  }
};

export const AlertContextProvider: React.FC<BaseProps> = ({
  className,
  children,
}) => {
  const [alert, setAlert] = useState<Alert | undefined>();
  const timeout = useRef<NodeJS.Timeout>();

  const onSuccess = useCallback((message: string) => {
    setAlert(new Alert(AlertType.SUCCESS, message));
  }, []);

  const onError = useCallback((error: Error) => {
    setAlert(new Alert(AlertType.ERROR, error.message));
  }, []);

  const onClose = useCallback(() => {
    setAlert(undefined);
  }, []);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }

    if (alert) {
      timeout.current = setTimeout(() => {
        setAlert(undefined);
      }, 10000);
    }
  }, [alert]);

  const alertView = alert ? (
    <ChakraAlert
      status={alertTypeToChakra(alert.type)}
      position="absolute"
      top="10px"
      right="10px"
      width="30vw"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <AlertIcon />
      <AlertTitle>{alert.message}</AlertTitle>
      <CloseButton onClick={onClose} />
    </ChakraAlert>
  ) : null;

  return (
    <Box className={className} position="relative" width="100vw" height="100vh">
      <AlertContext.Provider
        value={{
          onSuccess,
          onError,
          onClose,
        }}
      >
        {alertView}
        {children}
      </AlertContext.Provider>
    </Box>
  );
};

export const useAlert = (): AlertValue => {
  const alert = useContext(AlertContext);
  return alert;
};
