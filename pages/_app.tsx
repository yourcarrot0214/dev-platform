import App, { AppProps } from "next/app";
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

app.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async (context) => {
    const { isLogged } = store.getState().user;
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.Cookie = "";
        axios.defaults.headers.Cookie = cookieObject.access_token;
        const { data } = await authAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (error) {
      const err = error as SystemError;
      console.log(">> app.getInitialProps error :: ", err.message);
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
        AppProps: {},
      },
    };
  }
);

export default wrapper.withRedux(app);
