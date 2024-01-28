import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import StopWatch from "./StopWatch";

// Before each test, use Jest's fake timers to control setTimeout and setInterval
beforeEach(() => {
  jest.useFakeTimers();
});

// After each test, clear any timers set and revert to real timers
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

// Tests for the StopWatch component
describe("StopWatch", () => {
  test("renders with initial state", () => {
    render(<StopWatch />);
    expect(screen.getByText("00:00.00")).toBeInTheDocument(); // Check if the initial time displayed is "00:00.00"
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument(); // Check if the "Start" button is rendered
    expect(screen.getByRole("button", { name: "Lap" })).toBeDisabled(); // Check if the "Lap" button is disabled initially (as the stopwatch hasn't started)
    expect(screen.getByRole("button", { name: "Reset" })).not.toBeDisabled(); // Check if the "Reset" button is enabled initially
  });

  // Test to verify the stopwatch starts when the "Start" button is clicked
  test("starts timer on Start button click", async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" })); // Simulate clicking the "Start" button
    // Use act to ensure all state updates are processed
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:01.00")).toBeInTheDocument(); // Check if the time has advanced to "00:01.00"
    fireEvent.click(screen.getByRole("button", { name: "Pause" })); // Simulate clicking the "Pause" button
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument(); // Check if the "Start" button is visible again for resuming
  });

  // Test to verify the lap functionality
  test("records laps", async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" })); // Start the stopwatch
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Lap" })); // Click the "Lap" button
    expect(screen.getByText("Lap 1: 00:05.00")).toBeInTheDocument(); // Check if the first lap with a time of "00:05.00" is displayed
  });

  // Test to verify the reset functionality
  test("resets the timer", async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" })); // Start the stopwatch
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" })); // Click the "Reset" button
    expect(screen.getByText("00:00.00")).toBeInTheDocument(); // Check if the time resets back to "00:00.00"
  });
});
