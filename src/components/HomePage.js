/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/homepage.css";
import planepic from "../images/planepic.png";
import searchicon from "../images/search.png";
import countryList from "../data/countryNames";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const search = (event) => {
    event.preventDefault();
    if (!countryList.includes(input)) {
      setError(true);
    } else {
      history.push(`/country-info/${input}`);
    }
  };

  return (
    <div className="container">
      <div className="search-section">
        <div className="search-section_small">
          <form className="search-box" onSubmit={search}>
            <h2 className="search-title">Welcome </h2>
            <img id="planepic" src={planepic} alt="" />
            <p className="search-question">Where are you headed?</p>
            <div className="blue-search-bar">
              <div className="white-search-bar">
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError(false);
                  }}
                  className="search-input"
                  type="text"
                  placeholder="e.g. Portugal"
                />
                <button className="search-button" type="submit">
                  <img id="search-icon" src={searchicon} alt="" />
                </button>
              </div>
            </div>
            {error && (
              <p className="homepage-error">
                Country does not exist - please check spelling
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
