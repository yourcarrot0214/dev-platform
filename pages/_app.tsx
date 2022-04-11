import App, { AppContext, AppProps } from "next/app";
import { NextPageContext } from "next";
import GlobalStyle from "../styles/GlobalStyle";
import wrapper from "../store";
import Header from "../components/header/Header";
import axios from "../lib/api";
import { cookieStringToObject } from "../utils";
import { Store } from "redux";
import { authAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface SystemError {
  code: string;
  message: string;
}

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    const { isLogged } = store.getState().user;
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.common.cookie = cookieObject.access_token;
        const { data } = await authAPI();
        const userdataWithoutPassword = data;

        store.dispatch(userActions.setLoggedUser(userdataWithoutPassword));
      }
    } catch (error) {
      const err = error as SystemError;
      console.log(">> app.getInitialProps error :: ", err.message);
    }

    return { ...appInitialProps };
  }
);

export default wrapper.withRedux(app);
