import App, { AppContext, AppProps } from "next/app";
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
    axios.defaults.headers.cookie = "";

    let authData = {};
    let isTry = false;

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;
        const { data } = await authAPI();
        store.dispatch(userActions.setLoggedUser(data));
        authData = data;
        isTry = true;
      }
    } catch (error) {
      const err = error as SystemError;
      console.log(">> app.getInitialProps error :: ", err.message);
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
        AppProps: {
          isLogged: isLogged,
          cookieObject: cookieObject,
          authData: authData,
          isTry: isTry,
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

  try block가 실행이 됨 -> isTry: true
  store.dispatch가 실행되지 않음 -> redux-devtools에서 검증(action이 없음)
  authAPI()가 호출되는지 확인할 수 있는 방법이 필요함..
*/
