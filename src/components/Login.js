/* eslint-disable quotes */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  // eslint-disable-next-line object-curly-newline
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const { login, loginWithGoogle } = { input.email, input.password };
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(input.email, input.password);
      history.push("/");
    } catch (e) {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleWithPopUp = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await loginWithGoogle();
      history.push("/");
    } catch (e) {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <input
            id="name"
            name="name"
            type="text"
            value={input.userName}
            placeholder="Name"
            onChange={setInput}
          />
          <input
            id="email"
            name="email"
            type="text"
            value={input.email}
            placeholder="E-mail"
            onChange={setInput}
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            value={input.password}
            placeholder="Password"
            onChange={setInput}
          />
        </div>
        {error && <div>{error}</div>}
        <button className="login-button" type="submit" disabled={loading}>
          Log In
        </button>
        <br />
        <button
          className="google-button"
          type="button"
          onClick={handleWithPopUp}
        >
          Sign in with Google
        </button>
      </form>
      <div>
        Need an account?
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
