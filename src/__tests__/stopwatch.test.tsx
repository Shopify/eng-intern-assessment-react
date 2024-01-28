import React from "react";

import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import StopWatch from "../StopWatch";

test("should render stopwatch component", () => {
  render(<StopWatch />);
  expect(screen.getByTestId("stopwatch")).toBeInTheDocument();
});
