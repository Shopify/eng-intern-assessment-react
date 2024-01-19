// tests for stopwatch functilnality in App.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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
