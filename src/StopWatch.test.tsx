import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "./StopWatch";
import React from "react";
import { act } from "react-dom/test-utils";

describe("StopWatch Component", () => {
  test("StopWatch should render the correct time", () => {
    render(<StopWatch />);

    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  jest.useFakeTimers();

  test("Starts timer when start button is clicked", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  test("Stops timer when stop button is clicked", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(startButton);
    });

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  test("Resets timer when reset button is clicked", () => {
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");
    const resetButton = screen.getByTestId("reset-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(resetButton);
    });

    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  test("Check if reset button works when timer is running", () => {
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");
    const resetButton = screen.getByTestId("reset-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(resetButton);
    });

    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  test("Lap button should add a lap to the list of laps", () => {
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");
    const lapButton = screen.getByTestId("lap-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("Reset button should clear the list of laps", () => {
    render(<StopWatch />);
    const startButton = screen.getByTestId("start-stop-button");
    const lapButton = screen.getByTestId("lap-button");
    const resetButton = screen.getByTestId("reset-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("lap-list").children.length).toBe(2);

    act(() => {
      fireEvent.click(resetButton);
    });

    expect(screen.getByTestId("lap-list").children.length).toBe(0);
  });
});
