import toast from "react-hot-toast";
import { ThunkDispatch } from "redux-thunk";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
import { saveTokenLocal } from "../../helpers/saveTokenLocal";
import { AuthAction } from "../../reducers/authReducer";
import { IResponseSignUp } from "../../types/interfaces";
import { clearBooksState } from "../books/booksActions";

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

            const { ok, name, uid, msg, token }: IResponseSignUp =
                await res.json();

            if (ok) {
                saveTokenLocal(token);
                dispatch(login(name, uid));
                toast.success("Perfect now you are part of Bookflix");
            } else {
                msg && toast.error(msg);
                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const startLogout = () => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(clearBooksState());
        dispatch(logout());
    };
};

export const logout = (): AuthAction => ({
    type: "Logout",
});


export const login = (name: string = "user", uid: string): AuthAction => ({
  type: "Login",
  payload: {
    uid,
    name,
  },
});
