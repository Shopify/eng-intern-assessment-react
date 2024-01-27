/**
 * @jest-environment jsdom
 */

/**
 * 1. Static tests were created buttons Start, Stop, Reset. To test differencet scenarios, change the advanceTimersByTime value and expected outcome values.
 * 2. Dynamic test was created for the Record Lap button. To test different scenarios, change the lapsToTest, oneSecondMili, and secondsMultiplier values.
 */

import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from "react";
import { formatTime } from "./utils/timeFormatter";

// Setup fake timesr
beforeEach(() => {
  jest.useFakeTimers();
});

// Reset fake timers after each test is run. This is necessary because the fake timers are not reset automatically. This ensures that the fake timers are reset after each test.
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("checks that start button starts time", async () => {
  render(<App />);
  const startButton = screen.getByTestId("start-button");
  fireEvent.click(startButton);

  // Advance 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Checks if the time is updated correctly to 1 second.
  expect(screen.getByTestId("stopwatch-time")).toHaveTextContent("00:00:01:00");
});

test("checks that stop button stops the time", async () => {
  render(<App />);
  const startButton = screen.getByTestId("start-button");
  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(90000); //1 min and 30 seconds
  });

  const stopButton = screen.getByTestId("stop-button");
  fireEvent.click(stopButton);

  expect(screen.getByTestId("stopwatch-time")).toHaveTextContent("00:01:30:00"); // 1 min 30 seconds
});

// Created a dynamic test. This checks that user clicks the record button every 90 seconds, and ensures that the lap time is recorded correctly.
test("checks that record button records a lap time each time it is clicked", async () => {
  render(<App />);
  // Update lapsToTest, oneSecondMili, and secondsMultiplier to test more laps.
  const lapsToTest = 10;
  const oneSecondMili = 1000; //miliseconds
  const secondsMultiplier = 90; //seconds
  const timeToAdvance = oneSecondMili * secondsMultiplier; //1 min 30 seconds to advance

  const startButton = screen.getByTestId("start-button");
  fireEvent.click(startButton);

  const recordLapButton = screen.getByTestId("record-button");
  // Advance 90 seconds each lap, and record lap time.
  for (let i = 0; i < lapsToTest; i++) {
    act(() => {
      jest.advanceTimersByTime(timeToAdvance);
    });

    fireEvent.click(recordLapButton);
  }

  const lapTimeContainer = screen.getByTestId("lap-time-container").children;

  // Check each lap time recorded by looping through the recorded times to ensure that it is correct.
  for (let i = 0; i < lapTimeContainer.length; i++) {
    const currentLapTime = lapTimeContainer[i];
    const expectedLapTime = formatTime((i + 1) * timeToAdvance); // Calculate expected lap time

    expect(currentLapTime).toHaveTextContent(
      `Lap ${i + 1}: ${expectedLapTime}`
    );
  }
});

test("checks that reset button resets the time and removes recorded lap times", async () => {
  render(<App />);
  const startButton = screen.getByTestId("start-button");
  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  const stopButton = screen.getByTestId("reset-button");
  fireEvent.click(stopButton);

  const lapTimeContainer =
    screen.getByTestId("lap-time-container").children.length;

  expect(screen.getByTestId("stopwatch-time")).toHaveTextContent("00:00:00:00");
  expect(lapTimeContainer).toBe(0);
});
