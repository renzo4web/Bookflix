import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth/loginActions";

import LoginScreen from "../components/auth/LoginScreen";
import BookScreen from "../components/book/BookScreen";
import HomeScreen from "../components/book/HomeScreen";
import Loading from "../components/ui/Loading";
import { RootState } from "../reducers/rootReducer";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid, checking } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={Boolean(uid)}
          />

          <PrivateRoute
            exact
            path="/"
            component={HomeScreen}
            isAuthenticated={Boolean(uid)}
          />

          <PrivateRoute
            path="/book/:id"
            component={BookScreen}
            isAuthenticated={Boolean(uid)}
          />
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
