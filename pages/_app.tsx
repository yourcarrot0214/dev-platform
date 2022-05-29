import { AppContext, AppProps } from "next/app";
import wrapper from "../store";
import Header from "../components/header/Header";
import axios from "../lib/api";
import { cookieStringToObject } from "../utils";
import { Store } from "redux";
import { authAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import styled from "styled-components";
import "./app.css";

const MainContainer = styled.div``;

interface SystemError {
  code: string;
  message: string;
}

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MainContainer>
        <Header />
        <Component {...pageProps} />
      </MainContainer>
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialPageProps(
  (store: Store) => async ({ Component, ctx }: AppContext) => {
    const { isLogged } = store.getState().user;
    const cookieObject = cookieStringToObject(ctx.req?.headers.cookie);

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.common["cookie"] = cookieObject.access_token;
        const { data } = await authAPI();
        const userdataWithoutPassword = data;

        store.dispatch(userActions.setLoggedUser(userdataWithoutPassword));
      }
    } catch (error) {
      const err = error as SystemError;
      console.log(">> app.getInitialProps error :: ", err.message);
    }

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        AppProps: ctx.pathname,
      },
    };
  }
);

export default wrapper.withRedux(app);
