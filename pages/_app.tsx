import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";

function app({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default app;
