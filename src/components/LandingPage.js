/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.scss";
import appLogo from "../images/appLogo.png";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-message">
        <div className="landing-header">
          <h2>roamSafe</h2>
          <img id="landing-app-logo" src={appLogo} alt="" />
        </div>
        <div className="tag-line">
          <h3>Travel internationally, covid secure 🌎</h3>

          <div className="landing-links">
            <div>
              <Link className="signup-link-landing" to="/signup">
                SIGN UP
              </Link>
            </div>
            <div>
              <Link className="login-link-landing" to="/login">
                LOG IN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
