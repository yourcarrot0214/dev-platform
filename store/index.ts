import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer, { IState } from "./reducer";
import { Reducer, AnyAction } from "redux";

const isDevMode = process.env.NODE_ENV === "development";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    devTools: isDevMode,
  });
  return store;
};

const wrapper = createWrapper(createStore);

export default wrapper;
