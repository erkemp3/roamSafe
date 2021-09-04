/* eslint-disable */
import React from "react";
import { render } from "@testing-library/react";
import firebase from "firebase";
import Signup from "../components/Signup";
import App from "../components/App";

jest.mock("firebase", () => {
  return {
    auth: jest.fn(),
    initializeApp: jest.fn(),
    app: jest.fn(),
  };
});

describe("Signup", () => {
  it("renders correctly", () => {
    firebase.auth.mockReturnValueOnce({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });
    const { asFragment } = render(
      <App countries={[]}>
        <Signup />
      </App>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
