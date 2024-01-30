import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import App from "../src/App";
import React from "react";

describe("App Component Tests", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Start")).toBeInTheDocument();
  });
});
