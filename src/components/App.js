/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable quotes */

import React from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import NavBar from "./NavBar";
import CovidMap from "./CovidMap";
import HomePage from "./HomePage";
import Landing from "./LandingPage";
import PrivateRoute from "./PrivateRoute";
import CountryInfo from "./CountryInfo";

const config = {
  apiKey: "AIzaSyCksXWCl4y5g7yPE9tUD8Mv5PqktSVkADs",
  authDomain: "roamfree-dad3a.firebaseapp.com",
  projectId: "roamfree-dad3a",
  storageBucket: "roamfree-dad3a.appspot.com",
  messagingSenderId: "87295273544",
  appId: "1:87295273544:web:53aa041e58966f6a98c67d",
  measurementId: "G-H7C0CK2SNZ",
};

function App({ countries }) {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <div className="App">
        <Router>
          <NavBar />
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute path="/homepage">
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path="/country-info/:country">
                <CountryInfo countries={countries} />
              </PrivateRoute>
              <PrivateRoute path="/covid-map">
                <CovidMap />
              </PrivateRoute>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </header>
        </Router>
      </div>
    </FirebaseAuthProvider>
  );
}

App.propTypes = {
  countries: PropTypes.arrayOf().isRequired,
};

export default App;
