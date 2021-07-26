/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable quotes */

import React from "react";
import "../styles/App.css";
import axios from "axios";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import NavBar from "./NavBar";
import Logout from "./Logout";
import CovidMap from "./CovidMap";
import Homepage from "./Homepage";

const config = {
  apiKey: "AIzaSyCksXWCl4y5g7yPE9tUD8Mv5PqktSVkADs",
  authDomain: "roamfree-dad3a.firebaseapp.com",
  projectId: "roamfree-dad3a",
  storageBucket: "roamfree-dad3a.appspot.com",
  messagingSenderId: "87295273544",
  appId: "1:87295273544:web:53aa041e58966f6a98c67d",
  measurementId: "G-H7C0CK2SNZ",
};

const options = {
  method: "GET",
  url: "https://covid-19-data.p.rapidapi.com/report/country/name",
  params: { name: "Italy", date: "2020-04-01" },
  headers: {
    "x-rapidapi-key": "b90edbf277msh8e0bfd7fa82d38ep1c26abjsna979fb239da0",
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <div className="App">
        <Router>
          <NavBar />
          <header className="App-header">
            <h1>Covid App</h1>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/covid-map" component={CovidMap} />
              <Route exact path="/log-out" component={Logout} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </header>
        </Router>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
