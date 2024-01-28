/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Stopwatch from "../components/StopWatch";

test("should render stopwatch component", () => {
  render(<Stopwatch />);
  expect(screen.getByTestId("stopwatch")).toBeInTheDocument();
});
