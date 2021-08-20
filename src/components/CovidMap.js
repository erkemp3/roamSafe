/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import axios from "axios";

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

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
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

                    setTooltipContent(
                      `${NAME} — Risk Factor: ${riskFactor.data[ISO_A2].advisory.score}/5`
                    );
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
                      fill: "#F53",
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
    </>
  );
};

export default memo(CovidMap);
