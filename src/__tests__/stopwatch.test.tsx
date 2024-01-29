/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Stopwatch from "../components/StopWatch";

afterEach(() => {
  cleanup();
});

test("should render stopwatch component with all vals = 00", () => {
  render(<Stopwatch />);

  // check that all components are displayed as expected
  expect(screen.getByTestId("stopwatch")).toBeInTheDocument();
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();

  // check that the initial state is displayed correctly
  expect(screen.getByTestId("minutes")).toHaveTextContent("00");
  expect(screen.getByTestId("seconds")).toHaveTextContent("00");
  expect(screen.getByTestId("ms")).toHaveTextContent("00");

  expect(screen.queryByText("Pause")).toBeNull();
  expect(screen.queryByText("Lap")).toBeNull();
  expect(screen.queryByText("Laps")).toBeNull();
  expect(screen.queryByText("Relative Time")).toBeNull();
  expect(screen.queryByText("Absolute Time")).toBeNull();
});
