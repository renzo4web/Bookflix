import { ThunkDispatch } from "redux-thunk";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { saveTokenLocal } from "../helpers/saveTokenLocal";
import { AuthAction } from "../reducers/authReducer";

export const startChecking = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await fetchWithToken("renew");
      const body = await res.json();
      if (body.ok) {
        saveTokenLocal(body.token);

        dispatch(login(body.name, body.uid));
      } else {
        dispatch(checkingFinish());
      }
    } catch (error) {
      console.log(error);
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = (): AuthAction => ({
  type: "Checking finish",
});

export const startLogin = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await fetchWithoutToken(
        "signin",
        {
          email,
          password,
        },
        "POST"
      );

      const body = await res.json();

      console.log(body);

      if (body.ok) {
        saveTokenLocal(body.token);
        dispatch(login(body.name, body.uid));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const login = (name: string = "user", uid: string): AuthAction => ({
  type: "Login",
  payload: {
    uid,
    name,
  },
});
