import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "../StopWatch";

describe("Stopwatch", () => {
  // Checks if the initial time and laps are empty
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  // Checks that the start and stop button work and that the time changes
  test("starts and stops the stopwatch", async () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    const start = screen.getByText("Start");
    fireEvent.click(start);

    await waitFor(() => true, { timeout: 2000 });

    const stop = screen.getByText("Stop");
    fireEvent.click(stop);
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();
  });

  // Checks that the time is preserved when pausing and resuming
  test("pauses and resumes the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByTestId("startButton"));

    await waitFor(() => true, { timeout: 2000 });

    fireEvent.click(screen.getByTestId("stopButton"));

    const pausedTime = screen.getByTestId("time").textContent;

    fireEvent.click(screen.getByTestId("startButton"));

    await waitFor(() => screen.getByText(/00:00:10/i), {
      timeout: 1000,
    });

    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  // Checks that the lap button works and the laps are displayed
  test("records and displays lap times", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByTestId("startButton"));

    await waitFor(() => true, { timeout: 2000 });

    fireEvent.click(screen.getByTestId("lapButton"));

    expect(screen.getByTestId("lap-list").children.length).toBe(1);

    await waitFor(() => true, { timeout: 2000 });

    fireEvent.click(screen.getByTestId("lapButton"));

    await waitFor(() => true, { timeout: 2000 });

    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  // Checks that reseting the stopwatch brings the time back to 0
  test("resets the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});
