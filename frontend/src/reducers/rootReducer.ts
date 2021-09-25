import { combineReducers } from "redux";
import { authReducer, AuthState } from "./authReducer";
import { booksReducer, BookState } from "./booksReducer";

export interface RootState {
  auth: AuthState;
  books: BookState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});
