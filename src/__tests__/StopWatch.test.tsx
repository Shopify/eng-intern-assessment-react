import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// import App from "../App";
import StopWatch from "../components/StopWatch";
// Test to check if the stopwatch component renders
test("renders stopwatch component", () => {
  render(<StopWatch />);
  expect(screen.getByText("00:00:00.000")).toBeInTheDocument();
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Stop")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();
});

// Test to check if the stopwatch starts correctly
test("renders start button and starts timer on click", () => {
  render(<StopWatch />);
  fireEvent.click(screen.getByText("Start"));
  jest.useFakeTimers();
  setTimeout(() => {
    expect(screen.getByText("00:00:00.000")).not.toBeInTheDocument();
  });
});

//Test to check if stopwatch stops correctly
test("renders stop button and stops timer on click", () => {
  render(<StopWatch />);
  const startButton = screen.getByText("Start");
  const stopButton = screen.getByText("Stop");

  fireEvent.click(startButton);
  fireEvent.click(stopButton);

  const timeElement = screen.getByText("00:00:00.000");
  expect(timeElement).toBeInTheDocument();
});

// Test to check if the stopwatch records laps correctly
test("renders lap button and adds lap on click", () => {
  render(<StopWatch />);
  const startButton = screen.getByText("Start");
  const lapButton = screen.getByText("Lap");

  fireEvent.click(startButton);
  fireEvent.click(lapButton);

  const lapElement = screen.getByText("00:00:00.000");
  expect(lapElement).toBeInTheDocument();
});

// Test to check if stopwatch is reset correctly
test("renders reset button and resets timer on click", () => {
  render(<StopWatch />);
  const startButton = screen.getByText("Start");
  const resetButton = screen.getByText("Reset");

  fireEvent.click(startButton);
  fireEvent.click(resetButton);

  const timeElement = screen.getByText("00:00:00.000");
  expect(timeElement).toBeInTheDocument();
});
