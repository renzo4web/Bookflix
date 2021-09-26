import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth/loginActions";

import LoginScreen from "../components/auth/LoginScreen";
import BookScreen from "../components/book/BookScreen";
import HomeScreen from "../components/book/HomeScreen";
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
                        path='/login'
                        component={LoginScreen}
                        isAuthenticated={Boolean(uid)}
                    />

                    <PrivateRoute
                        exact
                        path='/'
                        component={HomeScreen}
                        isAuthenticated={Boolean(uid)}
                    />

                    <PrivateRoute
                        exact
                        path='/book/:id'
                        component={BookScreen}
                        isAuthenticated={Boolean(uid)}
                    />

                    <Redirect to='/' />
                </Switch>
            </Router>
        </>
    );
};

export default AppRouter;
