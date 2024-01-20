import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import StopWatchButton from "./Components/StopWatchButton";

describe("StopWatch", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.resetAllMocks();
  });

  // check if values on display is formatted correctly but formatTimer Function
  it("initial value is 00:00.00", () => {
    render(<App />);
    const paragraphElement = screen.getByText(/\d{2}:\d{2}.\d{2}/);
    expect(paragraphElement).toBeInTheDocument();
  });

  it("should start the timer on button click", () => {
    render(<App />);

    // Find and click the Start button
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Advance timer so that the StopWatch runs
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Assert that the timer has started
    expect(screen.getByText("00:01.00")).toBeInTheDocument();

    // check if the label changes to stop
    expect(startButton).toHaveTextContent("Stop");
  });

  // Testing if the stop button stops the timer
  it("should stop the timer on button click", () => {
    render(<App />);

    // Find and click the Start button
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Advance timer so that the StopWatch runs
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Assert that the timer has started
    expect(screen.getByText("00:01.00")).toBeInTheDocument();

    // Fire the Newly labelled "Stop" startButton to stop timer
    fireEvent.click(startButton);

    // Advance timer so that the StopWatch runs
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Assert that the timer remains at 1 even after time progresses.
    expect(screen.getByText("00:01.00")).toBeInTheDocument();
  });

  // Testing if the reset button changes the display back to 00:00.00
  it("should reset button reset on timer ", () => {
    render(<App />);

    // Find and click the Start button
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Advance timer so that the StopWatch runs
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Assert that the timer has started
    expect(screen.getByText("00:01.00")).toBeInTheDocument();

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    // Assert that the timer resets back to 00:00.00
    expect(screen.getByTestId("digits-section")).toHaveTextContent("00:00.00");
  });

  // Testing if the lap button records the time to the lap display
  it("should reset button reset on timer ", () => {
    render(<App />);

    // Find and click the Start button
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Advance timer so that the StopWatch runs
    act(() => {
      jest.advanceTimersByTime(1000); // Advance by 1 second
    });

    // Assert that the timer has started
    expect(screen.getByText("00:01.00")).toBeInTheDocument();

    const lapButton = screen.getByText("Lap");
    fireEvent.click(lapButton);

    // Assert that the timer records lap time in lap section
    expect(screen.getByTestId("laps-section")).toHaveTextContent(
      "Lap 1: 00:01.00"
    );
  });
});
