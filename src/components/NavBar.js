/* eslint-disable quotes */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => (
  <div className="navbar">
    <ul className="navbar-links">
      <li className="navbar-links-item">
        {" "}
        <Link className="a" to="/">
          HOME
        </Link>
      </li>
      <li className="navbar-links-item">
        <Link className="a" to="/covid-map">
          COVID-19 MAP
        </Link>
      </li>
      <li className="navbar-links-item">
        <Link className="a" to="/log-out">
          LOG OUT
        </Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
