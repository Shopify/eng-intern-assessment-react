import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Stopwatch from "../StopWatch";

describe("Stopwatch", () => {
  test("Renders stopwatch component", () => {
    render(<Stopwatch />);
    const stopwatchElement = screen.getByTestId("stopwatch");
    expect(stopwatchElement).toBeInTheDocument();
  });

  test("Starts and stops the stopwatch", () => {
    render(<Stopwatch />);
    const startButton = screen.getByText("Start");
    const timerElement = screen.getByTestId("stopwatch");
    fireEvent.click(startButton);
    const stopButton = screen.getByText("Stop");
    //wait to stop the timer
    setTimeout(() => {
      fireEvent.click(stopButton);
      expect(timerElement.textContent).toBe("00:00:01:00");
    }, 1000);
  });

  test("resets the stopwatch", () => {
    render(<Stopwatch />);
    const startButton = screen.getByText("Start");
    const resetButton = screen.getByText("Reset");
    const timerElement = screen.getByTestId("stopwatch");

    fireEvent.click(startButton);
    fireEvent.click(resetButton);
    expect(timerElement.textContent).toBe("00:00:00:00");
  });
  test("Clicks lap button", () => {
    render(<Stopwatch />);
    const startButton = screen.getByText("Start");
    const lapButton = screen.getByText("Lap");
    fireEvent.click(startButton);
    fireEvent.click(lapButton);
    const lapElement = screen.getByTestId("lap-list");
    expect(lapElement).toBeInTheDocument();
  });
});
