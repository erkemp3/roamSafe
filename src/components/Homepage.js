/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [covidResult, setCovidResult] = useState(undefined);

  const search = (event) => {
    event.preventDefault();
    setQuery(input);
  };

  useEffect(() => {
    if (!query) return;

    axios
      .request({
        method: "GET",
        url: "https://covid-19-data.p.rapidapi.com/country",
        params: { name: query },
        headers: {
          "x-rapidapi-key":
            "b90edbf277msh8e0bfd7fa82d38ep1c26abjsna979fb239da0",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        },
      })
      .then((response) => {
        setCovidResult(response.data);
        setInput("");
        setQuery("");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return covidResult ? (
    <pre>{JSON.stringify(covidResult)}</pre>
  ) : (
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
