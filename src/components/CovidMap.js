/* eslint-disable */
import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import axios from "axios";
import "../styles/CovidMap.scss";
import { useHistory } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CovidMap = ({ setTooltipContent }) => {
  const [riskFactor, setRiskFactor] = useState(undefined);
  const [countryName, setCountryName] = useState("");

  const history = useHistory();

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

  const getHoverColor = (geo) => {
    const { ISO_A2 } = geo.properties;
    if (!riskFactor) {
      return "#D6D6DA";
    }
    const riskFactorData = riskFactor.data[ISO_A2];
    if (riskFactorData) {
      const { score } = riskFactorData.advisory;
      if (score >= 4.5) {
        return "#F53";
      }
      if (score >= 3.5) {
        return "#ffa442";
      }
      if (score < 3.5) {
        return "#3f5";
      }
    }
    return "#D6D6DA";
  };

  return (
    <div className="covidMap-page">
      <p className="covidMap-title">COVID-19 ZOOMABLE MAP</p>
      <p className="covidMap-info">
        Click and drag to pan map ⬩ Hover over country to see risk factor ⬩
        Click on country for further COVID-19 info
      </p>
      <div className="covidMap-BigContainer">
        <div className="covidMapContainer">
          <ComposableMap
            className="Map"
            data-tip=""
            projectionConfig={{ scale: 210 }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      className="info-message"
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (countryName === "Dem. Rep. Congo") {
                          history.push(`/country-info/DRC`);
                        } else if (countryName === "Central African Rep.") {
                          history.push(`/country-info/CAR`);
                        } else if (countryName) {
                          history.push(`/country-info/${countryName}`);
                        }
                      }}
                      onMouseEnter={() => {
                        const { NAME, ISO_A2 } = geo.properties;
                        const message = riskFactor.data[ISO_A2]
                          ? `Risk Factor: ${riskFactor.data[ISO_A2].advisory.score}/5`
                          : "Data unavailable";
                        setTooltipContent(`${NAME} - ${message}`);
                        setCountryName(NAME);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                        setCountryName("");
                      }}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: getHoverColor(geo),
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default memo(CovidMap);
