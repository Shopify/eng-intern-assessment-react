import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import StopWatch from "../src/StopWatch";

jest.useFakeTimers();

describe("StopWatch component", () => {
  test("renders the component", () => {
    render(<StopWatch />);
    expect(screen.queryByText("Stopwatch")).toBeDefined();
  });

  test("initially, the stopwatch is not running", () => {
    render(<StopWatch />);
    expect(screen.getByText("Start")).toBeTruthy();
    expect(screen.queryByText("Stop")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText("Start"));
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText(/00:00:01/)).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByText("Stop"));
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText(/00:00:01/)).toBeTruthy();
  });

  test("resets the stopwatch", () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText("Start"));
      jest.advanceTimersByTime(3000);
      fireEvent.click(screen.getByText("Reset"));
    });

    expect(screen.queryByText(/00:00:00/)).toBeTruthy();
  });
});
