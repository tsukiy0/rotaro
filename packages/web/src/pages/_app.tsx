import React from "react";
import { AppProps } from "next/app";
import { Chakra } from "../contexts/Chakra";
import { ConfigContextProvider } from "../contexts/ConfigContext/ConfigContext";
import { ServicesContextProvider } from "../contexts/ServicesContext/ServicesContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <ConfigContextProvider>
        <ServicesContextProvider>
          <Component {...pageProps} />
        </ServicesContextProvider>
      </ConfigContextProvider>
    </Chakra>
  );
};

export default App;
