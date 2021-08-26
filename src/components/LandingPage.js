/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="small-container-landing">
          <div className="landing-message">
            <h2>roamFree</h2>
            <h3>
              The first app that helps you travel internationally, covid safe.
            </h3>
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
    </div>
  );
}
