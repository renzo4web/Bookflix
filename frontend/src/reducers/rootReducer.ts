import { combineReducers } from "redux";
import { authReducer, AuthState } from "./authReducer";

export interface RootState {
  auth: AuthState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
});
