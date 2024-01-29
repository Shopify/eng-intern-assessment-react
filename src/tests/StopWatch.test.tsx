import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import StopWatch from "../StopWatch";
import "@testing-library/jest-dom";

test("renders StopWatch component", () => {
  render(<StopWatch />);
});

// https://testing-library.com/docs/using-fake-timers/
beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(window, "setInterval");
  jest.spyOn(window, "clearInterval");
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("stopwatch starts with start button onClick", async () => {
  render(<StopWatch />);
  const buttonElement = screen.getByText(/Start/i);
  // https://legacy.reactjs.org/docs/test-utils.html#act
  act(() => {
    fireEvent.click(buttonElement);
    jest.advanceTimersByTime(1000);
  });
  expect(setInterval).toHaveBeenCalledTimes(1);
});

test("stopwatch stops with stop button onClick", () => {
  render(<StopWatch />);
  const buttonElement = screen.getByText(/Stop/i);
  fireEvent.click(buttonElement);
  expect(clearInterval).toHaveBeenCalledTimes(1);
});

test("stopwatch time resets with the reset button onClick", () => {
  render(<StopWatch />);
  const startButtonElement = screen.getByText(/Start/i);
  const resetButtonElement = screen.getByText(/Reset/i);
  const timeDisplayDivElement = screen.getByRole("display-time");

  // mock start the timer
  act(() => {
    fireEvent.click(startButtonElement);
    jest.advanceTimersByTime(4543);
  });

  // mock reset the timer
  fireEvent.click(resetButtonElement);

  expect(timeDisplayDivElement).toHaveTextContent("00:00:00:00");
});

test("lap button records the current time", async () => {
  render(<StopWatch />);

  const startButtonElement = screen.getByText(/Start/i);
  const lapButtonElement = screen.getByText(/Lap/i);

  act(() => {
    fireEvent.click(startButtonElement);
    jest.advanceTimersByTime(6000);
  });

  fireEvent.click(lapButtonElement);
  await waitFor(() => {
    expect(screen.getByTestId("recorded-lap-item")).toBeTruthy();
  });
});
