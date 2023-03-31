import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { StateContextProvider } from "../context";
import { Sepolia } from "@thirdweb-dev/chains";
import React from "react";
import { useEffect, useState } from "react";

import { Layout } from "../components";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
import { BrowserRouter as Router } from "react-router-dom";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  return render ? (
    <React.StrictMode>
      <ThirdwebProvider activeChain={Sepolia}>
        <Router>
          <StateContextProvider>
            <Layout>
              <div suppressHydrationWarning>
                {typeof window === "undefined" ? null : (
                  <AnyComponent {...pageProps} />
                )}
              </div>
            </Layout>
          </StateContextProvider>
        </Router>
      </ThirdwebProvider>
    </React.StrictMode>
  ) : null;
}

export default App;
