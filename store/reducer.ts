import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import userSlice, { UserReducerState } from "./user";

export interface IState {
  user: UserReducerState;
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
        user: userSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
