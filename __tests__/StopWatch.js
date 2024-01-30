import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/components/StopWatch/StopWatch.tsx";

describe("StopWatch", () => {
  test("renders initial state correctly", () => {
    render(<StopWatch />);

    const initialTime = screen.getByText("00:00:00:00");
    const lapList = screen.getByTestId("laps-list");

    // initial time displays as zero, no lap list is visible
    expect(initialTime).toBeInTheDocument();
    expect(lapList).toBeEmptyDOMElement();
  });

  test("start and pause buttons update time accordingly", async () => {
    render(<StopWatch />);

    const startText = screen.getByText("Start");
    const pauseText = screen.getByText("Pause");
    const currentTime = screen.getByText(/(\d{2}:){3}\d{2}/);

    // start and pause buttons are visible
    expect(startText).toBeInTheDocument();
    expect(pauseText).toBeInTheDocument();

    // when start is clicked, time is displayed as hh:mm:ss:dd
    fireEvent.click(startText);
    expect(currentTime).toBeInTheDocument();

    // when start is clicked, time is not zero
    fireEvent.click(startText);
    await waitFor(() => {
      expect(currentTime).not.toHaveTextContent("00:00:00:00");
    });

    // when pause is clicked, time stops changing
    // pause and store paused time
    fireEvent.click(pauseText);
    const stoppedTime = (screen.getByText(/(\d{2}:){3}\d{2}/));

    // wait a while, and ensure time stays the same
    await waitFor(() => {
      expect(stoppedTime).toEqual(currentTime);
    });
  });

  test("resets the stopwatch", async () => {
    render(<StopWatch />);

    const startText = screen.getByText("Start");
    const resetText = screen.getByText("Reset");
    const initialTime = screen.getByText("00:00:00:00");
    const currentTime = screen.getByText(/(\d{2}:){3}\d{2}/);

    // start and wait a while for the stopwatch to run
    fireEvent.click(startText);

    await waitFor(() => {
      expect(currentTime).not.toHaveTextContent("00:00:00:00");
    });

    // reset the stopwatch and have time go back to zero
    fireEvent.click(resetText);
    expect(initialTime).toBeInTheDocument();
  });

  test("records and displays lap times", async () => {
    render(<StopWatch />);

    const startText = screen.getByText("Start");
    const lapText = screen.getByText("Lap");
    const lapList = screen.getByTestId("laps-list");

    // start the stopwatch, wait a while, lap, then have the lap visible
    fireEvent.click(startText);
    expect(lapList).toBeEmptyDOMElement();

    await waitFor(() => {
      fireEvent.click(lapText);
      expect(lapList).not.toBeEmptyDOMElement();
    })
  });
});