/* eslint-disable quotes */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";

const NavBar = () => {
  const logout = async () => {
    await firebase.auth().signOut();
  };
  return (
    <div className="navbar">
      <ul className="navbar-links">
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            if (isSignedIn) {
              return (
                <>
                  <li className="navbar-links-item">
                    <Link to="/homepage">HOME</Link>
                  </li>
                  <li className="navbar-links-item">
                    <Link to="/covid-map">COVID-19 MAP</Link>
                  </li>
                  <li className="navbar-links-item">
                    <Link to="/country-info/Spain">COUNTRY INFO</Link>
                  </li>
                  <li className="navbar-links-item">
                    <button type="button" onClick={() => logout()}>
                      LOG OUT
                    </button>
                  </li>
                </>
              );
            }
            return undefined;
          }}
        </FirebaseAuthConsumer>
      </ul>
    </div>
  );
};

export default NavBar;
