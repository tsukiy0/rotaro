import React, { useContext, useEffect, useState } from "react";
import { FrontendRosterService } from "@rotaro/frontend";
import { RosterService } from "@rotaro/core";
import { LoadingPage } from "../../components/LoadingPage";
import { BaseProps } from "../../models/BaseProps";
import { useConfig } from "../ConfigContext/ConfigContext";
import { useAlert } from "../AlertContext/AlertContext";

export type Services = {
  rosterService: RosterService;
};

const ServicesContext = React.createContext<Services>({} as any);

export const ServicesContextProvider: React.FC<BaseProps> = ({
  className,
  children,
}) => {
  const { onError } = useAlert();
  const config = useConfig();
  const [services, setServices] = useState<Services | undefined>();

  useEffect(() => {
    const fn = async () => {
      try {
        const apiUrl = config.get("API_URL");
        const rosterService = FrontendRosterService.default(apiUrl);

        setServices({
          rosterService,
        });
      } catch (e) {
        onError(e);
      }
    };

    fn();
  }, [config, onError]);

  if (!services) {
    return <LoadingPage className={className} />;
  }

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): Services => {
  const services = useContext(ServicesContext);
  return services;
};
