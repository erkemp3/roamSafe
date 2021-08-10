/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { countries } from "./data/countries.json";

ReactDOM.render(
  // <React.StrictMode>
  <App countries={countries} />,
  // </React.StrictMode>,
  // eslint-disable-next-line comma-dangle
  document.getElementById("root")
);
