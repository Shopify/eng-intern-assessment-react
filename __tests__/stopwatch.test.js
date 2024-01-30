import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import App from "../src/App";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Test for stopwatch start
test("start button starts stopwatch", () => {
  jest.useFakeTimers();

  const result = render(<App />);
  const elapsedTime = result.container.querySelector("#elapsed-time");
  const startButton = screen.getByRole("button", { name: /start/i });

  expect(elapsedTime.textContent).toBe("00:00:00:00");

  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(5000);
  });

  expect(elapsedTime.textContent).toBe("00:00:05:00");
});

// test for stopwatch stop
test("stop button stops stopwatch", () => {
  jest.useFakeTimers();

  const result = render(<App />);
  const elapsedTime = result.container.querySelector("#elapsed-time");

  // start the stopwatch
  const startButton = screen.getByRole("button", { name: /start/i });
  fireEvent.click(startButton);

  // Stop the stopwatch
  const stopButton = screen.getByRole("button", { name: /stop/i });
  fireEvent.click(stopButton);

  // Record the time after stopping the stopwatch
  const timeAfterStop = elapsedTime.textContent;

  // Wait for 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // Record the time after 5 seconds
  const timeAfter5Seconds = elapsedTime.textContent;

  expect(timeAfterStop).toBe(timeAfter5Seconds);
});

// test for stopwatch reset
test("reset button resets stopwatch", () => {
  jest.useFakeTimers();

  const result = render(<App />);
  const elapsedTime = result.container.querySelector("#elapsed-time");

  // start the stopwatch
  const startButton = screen.getByRole("button", { name: /start/i });
  fireEvent.click(startButton);

  // Wait for 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // Stop the stopwatch
  const stopButton = screen.getByRole("button", { name: /stop/i });
  fireEvent.click(stopButton);

  // Reset the stopwatch
  const resetButton = screen.getByRole("button", { name: /reset/i });
  fireEvent.click(resetButton);

  expect(elapsedTime.textContent).toBe("00:00:00:00");
});

// test for stopwatch lap
test("lap button adds lap to completed laps", () => {
  jest.useFakeTimers();

  const result = render(<App />);

  // start the stopwatch
  const startButton = screen.getByRole("button", { name: /start/i });
  fireEvent.click(startButton);

  // Wait for 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // Record a lap
  const lapButton = screen.getByRole("button", { name: /lap/i });
  fireEvent.click(lapButton);

  // Get lap entry
  const lap = result.container.querySelector("#lap-1");

  expect(lap).toBeInTheDocument();
});
