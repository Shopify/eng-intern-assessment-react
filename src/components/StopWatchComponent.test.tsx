import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchComponent from "./StopWatchComponent";

describe("StopWatchComponent", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should start and stop the timer", () => {
    render(<StopWatchComponent />);
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/00:00:01:000/)).toBeInTheDocument();

    const stopButton = screen.getByText("Pause");
    fireEvent.click(stopButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Timer should remain at 1 second
    expect(screen.getByText(/00:00:01:000/)).toBeInTheDocument();
  });

  test("should reset the timer", () => {
    render(<StopWatchComponent />);
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(screen.getByText(/00:00:00:000/)).toBeInTheDocument();
  });

  test("should record a lap", () => {
    render(<StopWatchComponent />);
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const lapButton = screen.getByText("Lap");
    fireEvent.click(lapButton);

    expect(screen.getByText("Lap 1")).toBeInTheDocument();
    expect(screen.getByText(/00:00:01:500/)).toBeInTheDocument();
  });
});
