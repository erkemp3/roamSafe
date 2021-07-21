/* eslint-disable quotes */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const Signup = () => {
  // eslint-disable-next-line object-curly-newline
  const [{ userName, email, password, passwordConfirm }, setInput] = useForm({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = { email, password };
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      try {
        setError("");
        setLoading(true);
        await signup(email, password);
        history.push("/");
      } catch (e) {
        setError("Failed to create account");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <input
            id="name"
            name="name"
            type="text"
            value={userName}
            placeholder="Name"
            onChange={setInput}
          />
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            placeholder="E-mail"
            onChange={setInput}
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={setInput}
          />
        </div>
        <div>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            placeholder="Confirm Password"
            onChange={setInput}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </>
  );
};

export default Signup;
