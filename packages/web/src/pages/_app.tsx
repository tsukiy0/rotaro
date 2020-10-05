import React from "react";
import { AppProps } from "next/app";
import { Chakra } from "../contexts/Chakra";
import { ConfigContextProvider } from "../contexts/ConfigContext/ConfigContext";
import { ServicesContextProvider } from "../contexts/ServicesContext/ServicesContext";
import { AlertContextProvider } from "../contexts/AlertContext/AlertContext";
import { Width } from "../contexts/Width";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <AlertContextProvider>
        <ConfigContextProvider>
          <ServicesContextProvider>
            <Width>
              <Component {...pageProps} />
            </Width>
          </ServicesContextProvider>
        </ConfigContextProvider>
      </AlertContextProvider>
    </Chakra>
  );
};

export default App;
