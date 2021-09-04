/* eslint-disable */
import React from "react";
import { render } from "@testing-library/react";
import CovidMap from "../components/CovidMap";

describe("CovidMap", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<CovidMap />);

    expect(asFragment()).toMatchSnapshot();
  });
});
