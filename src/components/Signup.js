/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { IfFirebaseAuthedAnd } from "@react-firebase/auth";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      try {
        setError("");
        setLoading(true);
        await signup();
        // history.push("/");
      } catch (e) {
        setError("Failed to create account");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <IfFirebaseAuthedAnd
        filter={({ user }) => {
          console.log(user);
          if (!user.email) {
            return false;
          }
          return true;
        }}
      >
        {() => <p>you are logged in </p>}
      </IfFirebaseAuthedAnd>

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
        <button type="submit">Sign Up</button>
      </form>
      <div>
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </>
  );
};

export default Signup;
