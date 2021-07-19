/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable quotes */

import React from "react";
import "../styles/App.css";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://covid-19-data.p.rapidapi.com/report/country/name",
  params: { name: "Italy", date: "2020-04-01" },
  headers: {
    "x-rapidapi-key": "b90edbf277msh8e0bfd7fa82d38ep1c26abjsna979fb239da0",
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid App</h1>
      </header>
    </div>
  );
}

export default App;
