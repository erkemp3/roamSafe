/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryInfo = (props) => {
  const { country } = useParams();
  const [covidResult, setCovidResult] = useState(undefined);
  const [riskFactor, setRiskFactor] = useState(undefined);

  const { countries } = props;

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://www.travel-advisory.info/api/name",
        params: { name: country },
      })
      .then((response) => {
        setRiskFactor(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [riskFactor]);
  console.log(riskFactor);

  let data;
  if (covidResult) {
    data = countries.filter((x) => x.name === covidResult[0].country);
  }

  return covidResult ? (
    <div>
      <p>{`Country: ${covidResult[0].country}`}</p>
      <p>{`Confirmed Cases: ${covidResult[0].confirmed}`}</p>
      <p>{`Deaths: ${covidResult[0].deaths}`}</p>
      <p>{`Recovered: ${covidResult[0].recovered}`}</p>
      <p>{data[0].unvaccinated}</p>
      <p>{data[0].vaccinated}</p>
      <p>{data[0].quarantine}</p>
      <p>{data[0].masks}</p>
      <p>{data[0].restaurants}</p>
      <p>{data[0].bars}</p>
      <img
        id="flag"
        src={`https://www.countryflags.io/${covidResult[0].code}/shiny/64.png`}
        alt=""
      />
    </div>
  ) : (
    <div className="country"> </div>
  );
};

export default CountryInfo;
