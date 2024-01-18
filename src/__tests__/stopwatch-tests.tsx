import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("Stopwatch Application", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<App />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("initial render shows correct state", () => {
    //Check Initial display state
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.getByText("STOPPED")).toBeInTheDocument();

    //Check there are no lap times
    const lapItems = screen.queryAllByRole("listitem");
    expect(lapItems).toHaveLength(0);

    //STOP and Lap buttons should be disabled
    const stopButton = screen.getByRole("button", { name: /Stop/i });
    expect(stopButton).toBeDisabled();

    const lapButton = screen.getByRole("button", { name: /Lap/i });
    expect(lapButton).toBeDisabled();
  });

  test("basic functionality (stoping/starting) works", () => {
    const startButton = screen.getByRole("button", { name: /Start/i });

    //Start the time
    fireEvent.click(startButton);

    // Move the timer forward by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("00:00:01")).toBeInTheDocument();

    // Stop the time
    fireEvent.click(screen.getByText("Stop"));

    // Attempt to move the timer forward again
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Assert the timer has stopped
    expect(screen.getByText("00:00:01")).toBeInTheDocument();
  });

  test("shows correct lap times", () => {
    const startButton = screen.getByRole("button", { name: /Start/i });
    const lapButton = screen.getByRole("button", { name: /Lap/i });

    //Start the time
    fireEvent.click(startButton);

    // Move the timer forward by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.click(lapButton);

    // Move the timer forward by 3 second
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.click(lapButton);

    //Check that the displayed lap times are correct
    const lapItems = screen.getAllByRole("listitem");
    expect(lapItems[0]).toHaveTextContent("00:00:01");
    expect(lapItems[1]).toHaveTextContent("00:00:03");
  });

  test("reset button works", () => {
    const startButton = screen.getByRole("button", { name: /Start/i });
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    //Start the time
    fireEvent.click(startButton);

    // Move the timer forward by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.click(resetButton);

    //Check that display is back to initial state
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.getByText("STOPPED")).toBeInTheDocument();

    //Check there are no lap times
    const lapItems = screen.queryAllByRole("listitem");
    expect(lapItems).toHaveLength(0);
  });

  test("Time correctly displays in hh:mm:ss", () => {
    const startButton = screen.getByRole("button", { name: /Start/i });

    fireEvent.click(startButton);

    // Move the timer forward by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check display
    expect(screen.getByText("00:00:01")).toBeInTheDocument();

    // Move the timer forwards so we're at one minute
    act(() => {
      jest.advanceTimersByTime(59000);
    });

    // Check display
    expect(screen.getByText("00:01:00")).toBeInTheDocument();

    // Move the timer forwards so we're at one hour
    act(() => {
      jest.advanceTimersByTime(59 * 60000);
    });

    // Check display
    expect(screen.getByText("01:00:00")).toBeInTheDocument();
  });
});
