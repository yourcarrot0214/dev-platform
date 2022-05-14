import { createWrapper, HYDRATE, Context } from "next-redux-wrapper";
import rootReducer, { IState } from "./reducer";
import { Reducer, AnyAction, createStore } from "redux";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const isDevMode = process.env.NODE_ENV === "development";

const makeStore = (context: Context) =>
  createStore(rootReducer as Reducer<IState, AnyAction>, composeWithDevTools());

export const useSelector: TypedUseSelectorHook<IState> = useReduxSelector;

const wrapper = createWrapper(makeStore, { debug: false });

export default wrapper;
