import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { startChecking } from "../actions/auth";
import LoginScreen from "../components/auth/LoginScreen";
import BookScreen from "../components/book/BookScreen";
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
    return <h1>LOADING</h1>;
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
            component={BookScreen}
            isAuthenticated={Boolean(uid)}
          />
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;