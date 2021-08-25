/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import firebase from "firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const login = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {});
    return unsubscribe;
  }, []);

  const handleWithPopUp = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login();
      history.push("/homepage");
    } catch (e) {
      setError("Log in failed - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (isSignedIn) {
          return <Redirect to="/" />;
        }
        return (
          <>
            {loading && <p>Loading...</p>}
<<<<<<< HEAD
            <div className="login-section">
              <div className="container">
                <form className="form" id="login" onSubmit={handleWithPopUp}>
                  <h1 className="form__title">Login</h1>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      placeholder="E-mail"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  {error && <div>{error}</div>}
                  <button className="login-button" type="submit">
                    Login
                  </button>
                  <div className="Account">
                    Need an account?
                    <Link className="signup-link" to="/signup">
                      Sign Up
                    </Link>
                  </div>
                </form>
=======

            <div className="container">
              <h1 className="app-title">roamFree</h1>
              <div className="login-section">
                <div className="login-section_small">
                  <form className="form" id="login" onSubmit={handleWithPopUp}>
                    <h2 className="form__title">SIGN IN</h2>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        placeholder="Email address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    {error && <div>{error}</div>}
                    <button className="blue-login-button" type="submit">
                      LOG IN
                    </button>
                    <div className="register-div">
                      Need an account?
                      <Link className="register-link" to="/signup">
                        REGISTER
                      </Link>
                    </div>
                  </form>
                </div>
>>>>>>> 9243f482b54425bb8d4dff21e32de946fc269ed5
              </div>
            </div>
          </>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default Login;
