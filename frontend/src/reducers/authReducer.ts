export interface AuthState {
  uid: string | null;
  name: string | null;
  checking: boolean;
}

export interface IPayload {
  uid: string | null;
  name?: string | null;
}

export type AuthAction =
  | { type: "Start Login"; payload: IPayload }
  | { type: "Checking Login state"; payload: IPayload }
  | { type: "Login"; payload: IPayload }
  | { type: "Checking finish" };

const initialState: AuthState = {
  checking: true,
  uid: null,
  name: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        checking: false,
        ...action.payload,
      };

    case "Checking finish":
      return { ...state, checking: false };

    default:
      return state;
  }
};
