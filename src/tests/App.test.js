/* eslint-disable */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import "@testing-library/jest-dom";

test("renders App", () => {
  render(
    <Router>
      <App countries={[]} />
    </Router>
  );
  const linkElement = screen.getByText(/roamSafe/i);
  expect(linkElement).toBeInTheDocument();
});
