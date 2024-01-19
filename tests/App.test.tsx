// tests for stopwatch functionality in App.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom"; // imported to enable toBeInTheDocument() to be used in tests

import App from "../src/App";

// Use mock timers for tests
jest.useFakeTimers();

// Reset timers after each test
afterEach(() => {
  jest.clearAllTimers();
});

// Test: Clicking the "Start" button increments the timer correctly
test("clicking Start button increments timer correctly", () => {
  // Arrange: Render the App component
  render(<App />);

  // Get components for testing
  const timerDisplay = screen.getByText("00:00.00");
  const startButton = screen.getByText("Start");

  // Act: Click the "Start" button
  act(() => {
    fireEvent.click(startButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Assert: Verify the timer display shows "00:01.00"
  expect(timerDisplay.textContent).toContain("00:01.00");
});

// Test: Clicking the "Stop" button stops the timer correctly
test("clicking Stop button stops timer correctly", () => {
  // Arrange: Render the App component
  render(<App />);

  // Get components for testing
  const timerDisplay = screen.getByText("00:00.00");
  const startButton = screen.getByText("Start");
  const stopButton = screen.getByText("Stop");

  // Act: Click the "Start" button
  act(() => {
    fireEvent.click(startButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Act: Click the "Stop" button
  act(() => {
    fireEvent.click(stopButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Assert: Verify the timer display shows "00:01.00"
  expect(timerDisplay.textContent).toContain("00:01.00");
});

// Test: Clicking the "Lap" button records and displays laps correctly
test("clicking Lap button records and displays laps correctly", () => {
  // Arrange: Render the App component
  render(<App />);

  // Get components for testing
  const timerDisplay = screen.getByText("00:00.00");
  const startButton = screen.getByText("Start");
  const lapButton = screen.getByText("Lap");

  // Act: Click the "Start" button
  act(() => {
    fireEvent.click(startButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Act: Click the "Lap" button
  act(() => {
    fireEvent.click(lapButton);
  });

  // Act: Advance timers by 0.5 second
  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Act: Click the "Lap" button
  act(() => {
    fireEvent.click(lapButton);
  });

  // Assert: Verify the first lap is shown correctly
  const firstLap = screen.getByText("Lap 1: 00:01.00");
  expect(firstLap).toBeInTheDocument();

  // Assert: Verify the second lap is shown correctly
  const secondLap = screen.getByText("Lap 2: 00:00.50");
  expect(secondLap).toBeInTheDocument();

  // Assert: Verify the timer displays total elapsed time correctly
  expect(timerDisplay.textContent).toContain("00:01.50");
});

// Test: Clicking the "Reset" button resets timer to 0 and clears laps correctly
test("clicking Reset button records and displays laps correctly", () => {
  // Arrange: Render the App component
  render(<App />);

  // Get components for testing
  const timerDisplay = screen.getByText("00:00.00");
  const startButton = screen.getByText("Start");
  const lapButton = screen.getByText("Lap");
  const resetButton = screen.getByText("Reset");

  // Act: Click the "Start" button
  act(() => {
    fireEvent.click(startButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Act: Click the "Lap" button
  act(() => {
    fireEvent.click(lapButton);
  });

  // Act: Advance timers by 0.5 second
  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Act: Click the "Lap" button
  act(() => {
    fireEvent.click(lapButton);
  });

  // Find first and second lap elements
  const firstLap = screen.getByText(/Lap 1/);
  const secondLap = screen.getByText(/Lap 2/);

  // Act: Click the "Reset" button
  act(() => {
    fireEvent.click(resetButton);
  });

  // Act: Advance timers by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Assert: Verify the timer is reset to "00:00.00"
  expect(timerDisplay.textContent).toContain("00:00.00");

  // Assert: Verify first lap is not in document
  expect(firstLap).not.toBeInTheDocument();

  // Assert: Verify second lap is not in document
  expect(secondLap).not.toBeInTheDocument();
});
