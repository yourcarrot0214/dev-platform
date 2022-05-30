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
    let authData = {};

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;
        const { data } = await authAPI();
        authData = data;
        store.dispatch(userActions.setLoggedUser(data));
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
        AppProps: {
          isLogged: isLogged,
          cookieObject: cookieObject,
          authData: authData,
        },
      },
    };
  }
);

export default wrapper.withRedux(app);

/*
  TODO 1. 새로고침시 리덕스 스토어 유저 정보 초기화
    ? cookie에 token값은 유지되는데, 스토어에 정보가 업데이트 되지 않음.
    ? development 상태에서는 동작, product 상태에서는 동작하지 않음.
      * app.getInitialProps가 동작하는지를 검증
      * 동작 한다면 store 업데이트가 안되는지 확인
    ? vercel project에서 환경변수설정 부분에서 발생하는 문제이지 않을까 추측
      * _app.tsx의 getInitialProps logic이 환경변수에 의존하지는 않음.
*/
