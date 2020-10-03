import React, { useContext, useEffect, useState } from "react";
import { Config } from "@tsukiy0/tscore";
import { BaseProps } from "../../models/BaseProps";
import { LoadingPage } from "../../components/LoadingPage";
import { DevConfig } from "./DevConfig";
import { ProdConfig } from "./ProdConfig";

const ConfigContext = React.createContext<Config>({} as any);

export const ConfigContextProvider: React.FC<BaseProps> = ({
  className,
  children,
}) => {
  const [config, setConfig] = useState<Config | undefined>();

  const getConfig = async (): Promise<Config> => {
    if (process.env.NODE_ENV === "development") {
      const config = new DevConfig();
      return config;
    } else {
      const config = await ProdConfig.default();
      return config;
    }
  };

  useEffect(() => {
    const fn = async () => {
      setConfig(await getConfig());
    };

    fn();
  }, []);

  if (!config) {
    return <LoadingPage className={className} />;
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = (): Config => {
  const config = useContext(ConfigContext);
  return config;
};
