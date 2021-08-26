/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import firebase from "firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import "../styles/Signup.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const signup = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {});
    return unsubscribe;
  }, []);

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      try {
        setError("");
        setLoading(true);
        await signup();
        history.push("/");
      } catch (e) {
        setError("Failed to create account");
      } finally {
        setLoading(false);
      }
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
            {() => <p>Welcome! </p>}
            <h1 className="app-title">roamFree</h1>
            <div className="signup-section">
              <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmitClick}>
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userName}
                      placeholder="Name"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>
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
                  <div>
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={passwordConfirm}
                      placeholder="Confirm Password"
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                    />
                  </div>
                  {error && <div>{error}</div>}
                  <button className="signup-button" type="submit">
                    SIGN UP
                  </button>
                  <div className="message-login-link">
                    Already a member?
                    <Link className="login-link" to="/login">
                      LOG IN
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default Signup;
