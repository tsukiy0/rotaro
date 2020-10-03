import React, { useContext, useEffect, useState } from "react";
import { FrontendRosterService } from "@rotaro/frontend";
import { RosterService } from "@rotaro/core";
import { LoadingPage } from "../../components/LoadingPage";
import { BaseProps } from "../../models/BaseProps";
import { useConfig } from "../ConfigContext/ConfigContext";

export type Services = {
  rosterService: RosterService;
};

const ServicesContext = React.createContext<Services>({} as any);

export const ServicesContextProvider: React.FC<BaseProps> = ({
  className,
  children,
}) => {
  const config = useConfig();
  const [services, setServices] = useState<Services | undefined>();

  useEffect(() => {
    const fn = async () => {
      const apiUrl = config.get("API_URL");
      const rosterService = FrontendRosterService.default(apiUrl);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      setServices({
        rosterService,
      });
    };

    fn();
  }, []);

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
