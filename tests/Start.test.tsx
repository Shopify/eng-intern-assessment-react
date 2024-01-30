import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";

import App from "../src/App";
import React from "react";

describe("Start Timer Test", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("starts timer when start button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.getByText("Lap")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  test("timer displays 1 second correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const timerDisplay = screen.getByTestId("timer-display").textContent;
    expect(timerDisplay).toBe("00:00:01:00");
  });

  test("timer displays 10 seconds correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    const timerDisplay = screen.getByTestId("timer-display").textContent;
    expect(timerDisplay).toBe("00:00:10:00");
  });

  test("timer displays 123456789ms correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(12345678);
    });
    const timerDisplay = screen.getByTestId("timer-display").textContent;
    expect(timerDisplay).toBe("03:25:45:67");
  });
});
