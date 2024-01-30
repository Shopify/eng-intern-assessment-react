import StopWatch from "./StopWatch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

describe("StopWatch component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("timer starts when Start is clicked", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    const { container } = render(<StopWatch />);
    //const stopWatchDom = render(<StopWatch />);
    const startButton = screen.getByText("Start");

    fireEvent.click(startButton);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy after the test
    setIntervalSpy.mockRestore();
  });

  test("timer stops when Stop is clicked", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { container } = render(<StopWatch />);
    const startButton = screen.getByText("Start");
    const stopButton = screen.getByText("Stop");

    fireEvent.click(startButton);
    fireEvent.click(stopButton);

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy after the test
    clearIntervalSpy.mockRestore();
  });

  test("timer resets when Reset is clicked", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { container } = render(<StopWatch />);
    const startButton = screen.getByText("Start");
    const resetButton = screen.getByText("Reset");

    fireEvent.click(startButton);
    jest.advanceTimersByTime(5000); // Advance time to simulate running timer
    fireEvent.click(resetButton);

    // Additional assertions based on your implementation
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy after the test
    clearIntervalSpy.mockRestore();
  });

  test("Record a lap when Lap button is clicked", async () => {
    render(<StopWatch />);
    jest.useFakeTimers();

    fireEvent.click(screen.getByText("Start"));

    jest.advanceTimersByTime(1000);

    fireEvent.click(screen.getByText("Lap"));

    fireEvent.click(screen.getByText("Stop"));

    await waitFor(() => {
      const lapElement = screen.queryByText(/Lap 1/);
    });
  });
});
