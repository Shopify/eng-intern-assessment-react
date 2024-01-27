import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

describe("Testing StopWatch Button Functionality", () => {
  let component;
  const mockSetTimeInSeconds = jest.fn();
  const mockRecordLap = jest.fn();
  const mockSetLaps = jest.fn();

  beforeEach(() => {
    component = render(
      <StopWatchButton
        setTimeInSeconds={mockSetTimeInSeconds}
        recordLap={mockRecordLap}
        laps={[]}
        setLaps={mockSetLaps}
        formatTime={() => {}}
      />
    );
  });

  test("Starts the stopwatch correctly", () => {
    // Click the Start button
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Expect the stopwatch to start from 0 the first time
    expect(mockSetTimeInSeconds).toHaveBeenCalledWith(0);
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(1);

    // Clicking the Stop button
    const stopButton = screen.getByText("Stop");
    fireEvent.click(stopButton);

    // Click the Start button again
    fireEvent.click(startButton);

    // Expect the stopwatch to continue from the paused time
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(1);

    // Clicking the Reset button
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    // Clicking the Start button after reset
    fireEvent.click(startButton);

    // Expect the stopwatch to start from 0 after reset
    expect(mockSetTimeInSeconds).toHaveBeenCalledWith(0);
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(2);
  });

  test("Pauses the stopwatch when the stop button is clicked", () => {
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    const stopButton = screen.getByText("Stop");
    fireEvent.click(stopButton);

    //  Expect initial update in useEffect, on start click and on stop click
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(3);
  });

  test("Resets the stopwatch to zero when the reset button is clicked", () => {
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    // Expect stopwatch to reset to 0 and lap list array to be empty
    expect(mockSetTimeInSeconds).toHaveBeenCalledWith(0);
    expect(mockSetLaps).toHaveBeenCalledWith([]);
  });

  test("Records laps when the lap button is clicked", () => {
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);
    const lapButton = screen.getByText("Lap");
    fireEvent.click(lapButton);

    //  Expect initial update in useEffect, on start click and on lap click
    expect(mockSetLaps).toHaveBeenCalledTimes(3);
  });
});
