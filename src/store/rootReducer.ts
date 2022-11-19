import { AnyAction, combineReducers } from "redux";
import { reducers } from "./ducks";

const appReducer = combineReducers(reducers);

type RootReducerState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: RootReducerState | undefined,
  action: AnyAction
) => {
  // TODO: Functionality for reset state when user sign out
  return appReducer(state, action);
};

export default rootReducer;
