import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import App from "../src/App";

describe("Pause Functionality Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("pauses timer when pause button is clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const timeBeforePause = screen.getByTestId("timer-display").textContent;
    fireEvent.click(screen.getByText("Pause"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const timeAfterPause = screen.getByTestId("timer-display").textContent;
    expect(timeAfterPause).toBe(timeBeforePause);
  });

  test("button switches to start when stopwatch is paused", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Pause"));
    expect(screen.queryByText("Pause")).not.toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Lap")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });
});
