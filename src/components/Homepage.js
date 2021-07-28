/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React from "react";

export default function Homepage() {
  //const { query, setQuery } = useContext(userContext);

  return (
    <div className="search-wrapper">
      <div className="search-info">
        <h2>Search a country below!</h2>

        <form className="search-box">
          <button className="search-button" type="submit">
            Search
          </button>
          <input
            //value={query}
            //onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            type="text"
            placeholder="e.g. Portugal"
          />
        </form>
      </div>
    </div>
  );
}
