/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import React from "react";
import StopWatch from "../src/StopWatch";

test("stopwatch initially rendered correctly", async () => {
  render(<StopWatch />);
});
