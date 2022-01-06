import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer, { IState } from "./reducer";
import { Reducer, AnyAction } from "redux";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

const isDevMode = process.env.NODE_ENV === "development";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    devTools: isDevMode,
  });
  return store;
};

export const useSelector: TypedUseSelectorHook<IState> = useReduxSelector;

const wrapper = createWrapper(createStore);

export default wrapper;
