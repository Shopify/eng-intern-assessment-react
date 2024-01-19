import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/components/StopWatch";

describe("StopWatch", () => {
  test("initial state of stopwatch", () => {
    render(<StopWatch />);

    const elementStopWatch = screen.getByText("00:00:00.000");
    expect(elementStopWatch).toBeInTheDocument();

    const lapList = screen.getByTestId("laps-list");
    expect(lapList).toBeEmptyDOMElement();
  });

  test("toggling start and stop buttons", () => {
    render(<StopWatch />);

    const startButton = screen.getByText("Start");
    expect(startButton).toBeInTheDocument();

    // Check if the Start button is not in the document after running the stopwatch
    fireEvent.click(startButton);
    expect(screen.queryByText("Start")).not.toBeInTheDocument();

    // Check if the Stop button is in the document after running the stopwatch
    expect(screen.getByText("Stop")).toBeInTheDocument();

    const stopButton = screen.getByText("Stop");
    fireEvent.click(stopButton);

    // Check if the Stop button is not in the document after stopping the stopwatch
    expect(screen.queryByText("Stop")).not.toBeInTheDocument();

    // Check if the Start button is back in the document
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  test("stopwatch updates time when started and stopped", async () => {
    render(<StopWatch />);

    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Wait for some time
    await waitFor(() => {
      const timeElement = screen.getByText(/(\d{2}:){2}\d{2}.\d{3}/);
      expect(timeElement).not.toHaveTextContent("00:00:00.000");
    });

    // Click the Stop button
    const stopButton = screen.getByText("Stop");
    fireEvent.click(stopButton);

    // Ensure that the time has stopped changing
    const timeElementAfterStop = screen.getByText(/(\d{2}:){2}\d{2}.\d{3}/);
    const initialTime = timeElementAfterStop.textContent;

    // Wait for some time to ensure the time does not change
    await waitFor(() => {
      expect(timeElementAfterStop.textContent).toEqual(initialTime);
    });
  });

  test("reset functionality", async () => {
    render(<StopWatch />);

    const startButton = screen.getByText("Start");
    const resetButton = screen.getByText("Reset");

    // Ensure reset button is disable when stopwatch is not running
    expect(resetButton).toBeDisabled();

    fireEvent.click(startButton);

    // Let stopwatch run for some time
    await waitFor(() => {
      const timeElement = screen.getByText(/(\d{2}:){2}\d{2}.\d{3}/);
      expect(timeElement).not.toHaveTextContent("00:00:00.000");
    });

    // Reset the stopwatch
    fireEvent.click(resetButton);
    const elementStopWatch = screen.getByText("00:00:00.000");
    expect(elementStopWatch).toBeInTheDocument();
  });

  test("lap functionality", () => {
    render(<StopWatch />);

    const lapButton = screen.getByText("Lap");
    const lapList = screen.getByTestId("laps-list");

    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Add a lap
    fireEvent.click(lapButton);

    // Expect lap list to be not empty
    expect(lapList).not.toBeEmptyDOMElement();
  });
});
