/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

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
        url: "https://www.travel-advisory.info/api",
      })
      .then((response) => {
        setRiskFactor(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);
  console.log(riskFactor);
  let data;

  console.log(covidResult);

  if (covidResult) {
    data = countries.filter((x) => x.name === covidResult[0].country);
  }

  let countryRiskFactor;

  if (covidResult && riskFactor) {
    countryRiskFactor = riskFactor.data[covidResult[0].code];
    console.log(countryRiskFactor);
  }

  return covidResult && riskFactor ? (
    <main>
      <section id="grid">
        <div className="box">
          <div className="bigbox-content">
            <p>{`Country: ${covidResult[0].country}`}</p>
            <img
              id="flag"
              src={`https://www.countryflags.io/${covidResult[0].code}/shiny/64.png`}
              alt=""
            />
            <p>{`Risk Factor: ${countryRiskFactor.advisory.score}/5`}</p>
            <p>{countryRiskFactor.advisory.message}</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <p>{`Confirmed Cases: ${covidResult[0].confirmed}`}</p>
            <p>{`Deaths: ${covidResult[0].deaths}`}</p>
            <p>{`Recovered: ${covidResult[0].recovered}`}</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <p>{data[0].quarantine}</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <p>{data[0].test}</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <p>{data[0].masks}</p>
            <p>{data[0].restaurants}</p>
            <p>{data[0].bars}</p>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <div className="country"> </div>
  );
};

export default CountryInfo;
