/* eslint-disable */
import React from "react";
import { render } from "@testing-library/react";
import CountryInfo from "../components/CountryInfo";
import App from "../components/App";

describe("CountryInfo", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <App countries={[]}>
        <CountryInfo />
      </App>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
