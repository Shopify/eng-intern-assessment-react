import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import StopWatch from "../src/StopWatch";

// Mocking timers using jest fake timers
jest.useFakeTimers();

// Describe block for testing the StopWatch component
describe("StopWatch component", () => {
  // Test case: Renders the component
  test("renders the component", () => {
    render(<StopWatch />);
    // Expect the text "Stopwatch" to be defined in the rendered component
    expect(screen.queryByText("Stopwatch")).toBeDefined();
  });

  // Test case: Initially, the stopwatch is not running
  test("initially, the stopwatch is not running", () => {
    render(<StopWatch />);
    // Expect the "Start" button to be present and "Stop" button to be absent
    expect(screen.getByText("Start")).toBeTruthy();
    expect(screen.queryByText("Stop")).toBeNull();
  });

  // Test case: Starts and stops the stopwatch
  test("starts and stops the stopwatch", () => {
    render(<StopWatch />);

    // Simulate clicking the "Start" button and advance timers by 1000 milliseconds
    act(() => {
      fireEvent.click(screen.getByText("Start"));
      jest.advanceTimersByTime(1000);
    });

    // Expect the displayed time to be "00:00:01"
    expect(screen.queryByText(/00:00:01/)).toBeTruthy();

    // Simulate clicking the "Stop" button and advance timers by an additional 2000 milliseconds
    act(() => {
      fireEvent.click(screen.getByText("Stop"));
      jest.advanceTimersByTime(2000);
    });

    // Expect the displayed time to still be "00:00:01"
    expect(screen.queryByText(/00:00:01/)).toBeTruthy();
  });

  // Test case: Resets the stopwatch
  test("resets the stopwatch", () => {
    render(<StopWatch />);

    // Simulate clicking the "Start" button, advance timers by 3000 milliseconds, and then click "Reset"
    act(() => {
      fireEvent.click(screen.getByText("Start"));
      jest.advanceTimersByTime(3000);
      fireEvent.click(screen.getByText("Reset"));
    });

    // Expect the displayed time to be reset to "00:00:00"
    expect(screen.queryByText(/00:00:00/)).toBeTruthy();
  });
});
