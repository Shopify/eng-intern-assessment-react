/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import App from "../src/App";
import StopWatch from "../src/StopWatch";

test("stopwatch initially rendered correctly", async () => {
  render(<StopWatch />);
});

test("Start and Lap button visible prior to timer running", async () => {
  render(<StopWatch />);
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();
});

test("Start button converts to a pause button when timer is running", async () => {
  render(<StopWatch />);
  fireEvent.click(screen.getByText("Start"));
  await expect(screen.getByText("Pause")).toBeInTheDocument();
});

test("When start button is clicked timer is rendering", async () => {
  render(<StopWatch />);
  fireEvent.click(screen.getByText("Start"));
  expect(screen.getByText(/(\d{2}:){2}\d{2}:\d{2}/)).toBeInTheDocument();
});
