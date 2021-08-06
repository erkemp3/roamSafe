/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const [input, setInput] = useState("");

  const history = useHistory();

  const search = (event) => {
    event.preventDefault();
    history.push(`/country-info/${input}`);
  };

  return (
    <div className="search-wrapper">
      <div className="search-info">
        <h2>Search a country below!</h2>

        <form className="search-box" onSubmit={search}>
          <button className="search-button" type="submit">
            Search
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="search-input"
            type="text"
            placeholder="e.g. Portugal"
          />
        </form>
      </div>
    </div>
  );
}
