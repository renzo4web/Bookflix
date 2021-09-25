import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
