/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/NavBar.css";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";
import appLogo from "../images/appLogo.png";
import countryNames from "../data/countryNames";

const NavBar = () => {
  const logout = async () => {
    await firebase.auth().signOut();
  };

  // function randomiseCountry() {

  const history = useHistory();

  function handleClick() {
    const randomCountry =
      countryNames[Math.floor(Math.random() * countryNames.length)];
    history.push(`/country-info/${randomCountry}`);
  }

  return (
    <div className="navbar">
      <ul className="navbar-links">
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            if (isSignedIn) {
              return (
                <>
                  <li className="navbar-links-item-1">
                    <Link to="/homepage">HOME</Link>
                  </li>
                  <li className="navbar-links-item">
                    <Link to="/covid-map">COVID-19 MAP</Link>
                  </li>
                  <li className="navbar-links-item">
                    <button className="btn" type="button" onClick={handleClick}>
                      COUNTRY INFO
                    </button>
                  </li>
                  <li className="navbar-links-item">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => logout()}
                    >
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
      <div className="navbar-right">
        {/* <p className="navbar-title">roamSafe</p> */}
        <img id="navbar-logo" src={appLogo} alt="" />
      </div>
    </div>
  );
};

export default NavBar;
