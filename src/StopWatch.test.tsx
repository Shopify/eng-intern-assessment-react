import { render, fireEvent, act } from "@testing-library/react";
import Stopwatch from "./StopWatch";
import React from "react";

jest.useFakeTimers();

describe("Stopwatch Component", () => {
  it("renders without crashing", () => {
    render(<Stopwatch />);
  });

  it("starts and stops stopwatch correctly", async () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText("Start");
    const stopButton = getByText("Stop");
    const intervalSpy = jest.spyOn(global, "setInterval");
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
    act(() => {
      fireEvent.click(stopButton);
    });
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  it("resets stopwatch correctly", async () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText("Start");
    const resetButton = getByText("Reset");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(5000); // Advance time by 5 seconds
      fireEvent.click(resetButton);
    });
    expect(getByText("00:00.00")).toBeTruthy();
  });
});
