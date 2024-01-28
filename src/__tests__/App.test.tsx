import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

jest.useFakeTimers();

test("stopwatch starts, stops, resets, and records laps correctly", () => {
  const { getByText } = render(<App />);

  // Start the stopwatch
  fireEvent.click(getByText("Start"));
  act(() => {
    jest.advanceTimersByTime(1000); // Advance timers by 1 second
  });
  expect(getByText(/0.01/)).toBeInTheDocument(); // Check if the stopwatch displays 0.01

  // Record a lap
  fireEvent.click(getByText("Lap"));
  expect(getByText(/Lap 1: 1s/)).toBeInTheDocument(); // Check if the first lap is recorded correctly

  // Stop the stopwatch
  fireEvent.click(getByText("Stop"));
  act(() => {
    jest.advanceTimersByTime(1000); // Advance timers by 1 second
  });
  expect(getByText(/0.01/)).toBeInTheDocument(); // Check if the stopwatch is stopped

  // Reset the stopwatch
  fireEvent.click(getByText("Reset"));
  expect(getByText(/0.00/)).toBeInTheDocument(); // Check if the stopwatch is reset
});
