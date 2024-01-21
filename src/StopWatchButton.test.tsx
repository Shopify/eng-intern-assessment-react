import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import StopWatch from "./StopWatch";
import "@testing-library/jest-dom";

describe("StopWatch", () => {
  jest.useFakeTimers();

  test("starts timer when start button is clicked, and pause at 3s", async () => {
    render(<StopWatch />);
    const start_pauseButton = screen.getByTestId("toggle-timer-button");
    fireEvent.click(start_pauseButton);

    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer by 1 second
    });

    const timeDisplayContainer = screen.getByTestId("time-display");
    expect(timeDisplayContainer.textContent).toMatch(/00:01:00/); //  regex to match time after 1s

    act(() => {
      jest.advanceTimersByTime(2000); // Advance the timer by 1 second
    });

    fireEvent.click(start_pauseButton);
    expect(timeDisplayContainer.textContent).toMatch(/00:03:00/); //  regex to match time after 1s
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
