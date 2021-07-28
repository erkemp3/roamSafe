/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { IfFirebaseAuthedAnd } from "@react-firebase/auth";
import "../styles/Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const login = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const handleWithPopUp = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login();
      history.push("/");
    } catch (e) {
      setError("Failed to Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <IfFirebaseAuthedAnd
        filter={({ user }) => {
          if (!user.email) {
            return false;
          }
          return true;
        }}
      >
        {() => <p>welcome! </p>}
      </IfFirebaseAuthedAnd>

      <form className="signup-form" onSubmit={handleWithPopUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      <div>
        Need an account?
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
