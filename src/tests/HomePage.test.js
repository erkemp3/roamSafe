/* eslint-disable */
import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../components/HomePage";

describe("HomePage", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<HomePage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
