/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React, { memo, useEffect, useState } from "react";
import {
  // ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import axios from "axios";
import "../styles/CovidMap.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CovidMap = ({ setTooltipContent }) => {
  const [riskFactor, setRiskFactor] = useState(undefined);

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
        return "#FFBF00";
      }
      if (score < 3.5) {
        return "#3f5";
      }
    }
    return "#D6D6DA";
  };

  return (
    <div className="covidMapContainer">
      <ComposableMap
        className="Map"
        data-tip=""
        projectionConfig={{ scale: 180 }}
      >
        {/* <ZoomableGroup> */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME, ISO_A2 } = geo.properties;
                  // console.log(riskFactor.data[ISO_A2]);
                  // // eslint-disable-next-line no-console
                  // // console.log(NAME);
                  const message = riskFactor.data[ISO_A2]
                    ? `${NAME} Risk Factor: ${riskFactor.data[ISO_A2].advisory.score}/5`
                    : "There is no information for this country";
                  setTooltipContent(`${NAME} - ${message}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
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
        {/* </ZoomableGroup> */}
      </ComposableMap>
    </div>
  );
};

export default memo(CovidMap);
