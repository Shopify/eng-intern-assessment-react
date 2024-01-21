import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchComponent from "../stopWatchComponent/StopWatchComponent";

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

    expect(screen.getByTestId("main-time").textContent).toBe("00:00:01:000");

    const stopButton = screen.getByText("Pause");
    fireEvent.click(stopButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Timer should remain at 1 second
    expect(screen.getByTestId("main-time").textContent).toBe("00:00:01:000");
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

    expect(screen.getByTestId("main-time").textContent).toBe("00:00:00:000");
  });

  test("should record a lap", () => {
    render(<StopWatchComponent />);
    const startButton = screen.getByTestId("start-stop-button");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const lapButton = screen.getByTestId("lap-button");
    fireEvent.click(lapButton);

    const lapRows = screen.getAllByRole("row");
    expect(lapRows).toHaveLength(2);

    const firstLapRow = lapRows[1];
    expect(firstLapRow).toHaveTextContent("1");
    expect(firstLapRow).toHaveTextContent("00:00:01:500");
  });
});
