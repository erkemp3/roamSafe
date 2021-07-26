/* eslint-disable quotes */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const PrivateRoute = ({ children, ...rest }) => {
  <FirebaseAuthConsumer>
    {({ isSignedIn }) => {
      if (isSignedIn) {
        return <Route {...rest}>{children}</Route>;
      }
      return <Redirect to="/" />;
    }}
  </FirebaseAuthConsumer>;
};

export default PrivateRoute;
