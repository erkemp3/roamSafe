/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable quotes */

import React, { useState } from "react";
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
import ReactTooltip from "react-tooltip";

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
  const [content, setContent] = useState("");
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <div className="App">
        <Router>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute path="/homepage">
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path="/country-info/:country">
                <CountryInfo countries={countries} />
              </PrivateRoute>
              <PrivateRoute path="/covid-map">
                <CovidMap setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </PrivateRoute>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </FirebaseAuthProvider>
  );
}

App.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      vaccinated: PropTypes.string.isRequired,
      unvaccinated: PropTypes.string.isRequired,
      quarantine: PropTypes.string.isRequired,
      masks: PropTypes.string.isRequired,
      restaurants: PropTypes.string.isRequired,
      bars: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default App;
