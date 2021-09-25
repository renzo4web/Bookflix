import { ThunkDispatch } from "redux-thunk";
import { fetchWithoutToken } from "../../helpers/fetch";
import { saveTokenLocal } from "../../helpers/saveTokenLocal";
import { IResponseSignUp } from "../../types/interfaces";
import { login } from "./loginActions";

export const startRegister = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await fetchWithoutToken(
        "signup",
        {
          name,
          email,
          password,
        },
        "POST"
      );

      const {
        ok,
        token,
        name: nameResp,
        uid,
        msg,
      }: IResponseSignUp = await res.json();

      if (ok) {
        saveTokenLocal(token);
        dispatch(login(nameResp, uid));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
