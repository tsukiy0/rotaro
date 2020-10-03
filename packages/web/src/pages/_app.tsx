import React from "react";
import { AppProps } from "next/app";
import { Chakra } from "../contexts/Chakra";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
};

export default App;
