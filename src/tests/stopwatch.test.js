import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Stopwatch from "../StopWatch";

describe("Stopwatch", () => {
  test("Renders stopwatch component", () => {
    render(<Stopwatch />);
    const stopwatchElement = screen.getByTestId("stopwatch");
    expect(stopwatchElement).toBeInTheDocument();
  });

  test("starts and stops the stopwatch", () => {
    render(<Stopwatch />);
    const startButton = screen.getByText("start");
    const stopButton = screen.getByText("stop-button");
    const timerElement = screen.getByTestId("stopwatch");

    fireEvent.click(startButton);
    expect(timerElement.textContent).not.toBe("00:00:00");

    fireEvent.click(stopButton);
    expect(timerElement.textContent).toBe("00:00:00");
  });

  test("resets the stopwatch", () => {
    render(<Stopwatch />);
    const startButton = screen.getByText("start");
    const resetButton = screen.getByText("reset");
    const timerElement = screen.getByTestId("stopwatch");

    fireEvent.click(startButton);
    fireEvent.click(resetButton);
    expect(timerElement.textContent).toBe("00:00:00");
  });
});
