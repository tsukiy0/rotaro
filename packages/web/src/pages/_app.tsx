import React from "react";
import { AppProps } from "next/app";
import { Chakra } from "../contexts/Chakra";
import { ConfigContextProvider } from "../contexts/ConfigContext/ConfigContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <ConfigContextProvider>
        <Component {...pageProps} />
      </ConfigContextProvider>
    </Chakra>
  );
};

export default App;
