import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user, { UserReducerState } from "./user";
import auth, { AuthReducerState } from "./auth";
import common, { CommonReducerState } from "./common";

export interface IState {
  user: UserReducerState;
  auth: AuthReducerState;
  common: CommonReducerState;
}

const rootReducer = (
  state: IState,
  action: AnyAction
): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: user.reducer,
        auth: auth.reducer,
        common: common.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
