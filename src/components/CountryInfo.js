/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryInfo = () => {
  const { country } = useParams();
  const [covidResult, setCovidResult] = useState(undefined);
  const [countryName, setCountryName] = useState(undefined);
  const [countryCode, setCountryCode] = useState(undefined);
  const [confirmedCases, setConfirmedCases] = useState(undefined);
  const [numberDeaths, setNumberDeaths] = useState(undefined);
  const [numberRecovered, setNumberRecovered] = useState(undefined);

  useEffect(() => {
    if (!country) return;

    axios
      .request({
        method: "GET",
        url: "https://covid-19-data.p.rapidapi.com/country",
        params: { name: country },
        headers: {
          "x-rapidapi-key":
            "b90edbf277msh8e0bfd7fa82d38ep1c26abjsna979fb239da0",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        },
      })
      .then((response) => {
        setCovidResult(response.data);
        setCountryCode(response.data[0].code);
        setCountryName(response.data[0].country);
        setConfirmedCases(response.data[0].confirmed);
        setNumberDeaths(response.data[0].deaths);
        setNumberRecovered(response.data[0].recovered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  const domainName = `https://www.countryflags.io/${countryCode}/shiny/64.png`;

  return covidResult ? (
    <div>
      <p>{`Country: ${countryName}`}</p>
      <p>{`Confirmed Cases: ${confirmedCases}`}</p>
      <p>{`Deaths: ${numberDeaths}`}</p>
      <p>{`Recovered: ${numberRecovered}`}</p>
      <img id="flag" src={domainName} alt="" />
    </div>
  ) : (
    <div className="country"> </div>
  );
};

export default CountryInfo;
