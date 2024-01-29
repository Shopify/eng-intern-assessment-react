/**
 * @jest-environment jest-environment-jsdom
 */

import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import StopWatch from "../StopWatch";

jest.mock("../../styles/stopwatch.css", () => ({}));

describe("StopWatch component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<StopWatch />);
    expect(getByText("0:00: 00: 00")).toBeInTheDocument(); // Before starting stopwatch, time displayed is 00:00:00
    expect(getByText("Start")).toBeInTheDocument(); // The left button text is 'Start'
    expect(getByText("Reset")).toBeInTheDocument(); // The right button text is 'Reset'
  });

  it("starts and stops the stopwatch correctly", () => {
    const { getByText } = render(<StopWatch />);
    const startStopButton = getByText("Start"); // 'Start' is the initial left button text
    fireEvent.click(startStopButton);
    expect(getByText("Stop")).toBeInTheDocument(); // The left button text changes to 'Stop' after starting
    expect(getByText("Lap")).toBeInTheDocument(); // The right button text changes to 'Lap' after starting
    fireEvent.click(startStopButton);
    expect(getByText("Start")).toBeInTheDocument(); // The left button text changes back to 'Start' after stopping
    expect(getByText("Reset")).toBeInTheDocument(); // The right button text changes back to 'Reset' after stopping
  });

  it("resets the stopwatch correctly", () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText("Start")); // Start the stopwatch
    fireEvent.click(getByText("Stop")); // Stop the stopwatch
    fireEvent.click(getByText("Reset")); // Reset the stopwatch
    expect(getByText("0:00: 00: 00")).toBeInTheDocument(); // The time resets to 0
  });

  it("records laps correctly", () => {
    const { getByText, getByTestId } = render(<StopWatch />);
    fireEvent.click(getByText("Start")); // Start the stopwatch
    fireEvent.click(getByText("Lap")); // Record a lap
    expect(getByTestId(0)).toBeInTheDocument(); // The first lap has a test ID of 0
  });
});
