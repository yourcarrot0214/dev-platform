import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import wrapper from "../store";
import Header from "../components/header/Header";
import axios from "../lib/api";
import { cookieStringToObject } from "../utils";
import { Store } from "redux";
import { authAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialPageProps(
  (store: Store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    const { isLogged } = store.getState().user;
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;
        const { data } = await authAPI();
        const userdataWithoutPassword = data;
        delete data.password;
        store.dispatch(userActions.setLoggedUser(userdataWithoutPassword));
      }
    } catch (error) {
      console.log(">> app.getInitialProps error :: ", error.message);
    }

    return { ...appInitialProps };
  }
);

export default wrapper.withRedux(app);
