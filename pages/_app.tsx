import App, { AppContext, AppProps } from "next/app";
import "../styles/globals.css";

function app({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default app;
