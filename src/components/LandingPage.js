/* eslint-disable quotes */
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="col s12 center-align">
        <h2>Hi! Welcome to Roam Free</h2>
        <b>The first app that helps you travel internationally, covid safe.</b>

        <br />
        <br />
        <div>
          <Link
            to="/signup"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="signup-button"
          >
            SignUp
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="login-button"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
