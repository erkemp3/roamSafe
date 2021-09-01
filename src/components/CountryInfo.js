/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/CountryInfo.css";
import orangeTriangle from "../images/orange-triangle.png";
import redTriangle from "../images/red-triangle.png";
import greenTick from "../images/green-tick.png";
import policyIcon from "../images/policy-icon.png";
import quarantineIcon from "../images/quarantine-icon.png";
import testIcon from "../images/test-icon.png";
import virusIcon from "../images/virus-icon.png";
import countryNames from "../data/countryNames";
import dice from "../images/ion_dice.png";

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
  }

  const getRiskFactorColor = () => {
    if (!riskFactor) {
      return "#D6D6DA";
    }

    if (countryRiskFactor.advisory.score >= 4.5) {
      return "#FF1A0CCC";
    }
    if (countryRiskFactor.advisory.score >= 3.5) {
      return "#ff8400";
    }
    if (countryRiskFactor.advisory.score < 3.5) {
      return "#3EBBBF";
    }
    return "#D6D6DA";
  };

  const getAdvisoryMessage = () => {
    if (!riskFactor) {
      return "No data available";
    }
    if (countryRiskFactor.advisory.score >= 4.5) {
      return "Reconsider travelling";
    }
    if (countryRiskFactor.advisory.score >= 3.5) {
      return "Travel with caution";
    }
    if (countryRiskFactor.advisory.score < 3.5) {
      return "Safe to travel";
    }
    return "No data available";
  };

  const getAdvisoryIcon = () => {
    if (!riskFactor) {
      return "";
    }
    if (countryRiskFactor.advisory.score >= 4.5) {
      return redTriangle;
    }
    if (countryRiskFactor.advisory.score >= 3.5) {
      return orangeTriangle;
    }
    if (countryRiskFactor.advisory.score < 3.5) {
      return greenTick;
    }
    return "";
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const history = useHistory();

  function handleClick() {
    const randomCountry =
      countryNames[Math.floor(Math.random() * countryNames.length)];
    history.push(`/country-info/${randomCountry}`);
  }

  return covidResult && riskFactor ? (
    <div className="container">
      <div className="country-info-content">
        <section id="grid">
          <div className="box">
            <div className="bigbox-content">
              <p className="country-name">{`${covidResult[0].country}`}</p>
              <img
                id="flag"
                src={`https://www.countryflags.io/${covidResult[0].code}/flat/64.png`}
                alt=""
              />
              <p className="global-risk"> Global Risk Score:</p>
              <div className="global-risk-score">
                <p
                  className="risk-score"
                  style={{ color: getRiskFactorColor() }}
                >
                  {`${countryRiskFactor.advisory.score}`}
                </p>
                <p className="risk-score-end">out of 5</p>
              </div>
              <div className="advisory-section">
                <img id="message-icon" src={getAdvisoryIcon()} alt="" />
                <p
                  className="advisory-message"
                  style={{ color: getRiskFactorColor() }}
                >
                  {getAdvisoryMessage()}
                </p>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-content">
              <img id="icons" src={virusIcon} alt="" />
              <div className="info-box">
                <p className="info-box-header">COVID-19 Status</p>
                <div className="data">
                  <p className="mini-header">Confirmed Cases:</p>
                  <p className="number">
                    {numberWithCommas(covidResult[0].confirmed)}
                  </p>
                </div>
                <div className="data">
                  <p className="mini-header">Deaths:</p>
                  <p className="number">
                    {numberWithCommas(covidResult[0].deaths)}
                  </p>
                </div>
                <div className="data">
                  <p className="mini-header">Recovered:</p>
                  <p className="number">
                    {numberWithCommas(covidResult[0].recovered)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-content">
              <img id="icons" src={quarantineIcon} alt="" />
              <div className="info-box">
                <p className="info-box-header">Quarantine</p>
                {data[0] ? (
                  <p className="quarantine-data">{data[0].quarantine}</p>
                ) : (
                  <p className="data-unavailable-large">
                    Data currently unavailable
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-content">
              <img id="icons" src={testIcon} alt="" />
              <div className="info-box">
                <p className="info-box-header">Testing</p>
                {data[0] ? (
                  <p className="test-data">{data[0].test}</p>
                ) : (
                  <p className="data-unavailable-large">
                    Data currently unavailable
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-content">
              <img id="icons" src={policyIcon} alt="" />
              <div className="info-box">
                <p className="info-box-header">Policy</p>
                <div className="policy-data">
                  <p className="mini-header-1">Masks:</p>
                  {data[0] ? (
                    <p className="data-string-1">{data[0].masks}</p>
                  ) : (
                    <p className="data-unavailable-small">
                      Data currently unavailable
                    </p>
                  )}
                </div>
                <div className="policy-data-2">
                  <p className="mini-header">Restaurants:</p>
                  {data[0] ? (
                    <p className="data-string-2">{data[0].restaurants}</p>
                  ) : (
                    <p className="data-unavailable-small">
                      Data currently unavailable
                    </p>
                  )}
                </div>
                <div className="policy-data-3">
                  <p className="mini-header">Bars:</p>
                  {data[0] ? (
                    <p className="data-string-3">{data[0].bars}</p>
                  ) : (
                    <p className="data-unavailable-small">
                      Data currently unavailable
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <button
          className="randomise-button"
          type="button"
          onClick={handleClick}
        >
          <img id="dice" src={dice} alt="" />
        </button>
      </div>
    </div>
  ) : (
    <div className="country"> </div>
  );
};

export default CountryInfo;
