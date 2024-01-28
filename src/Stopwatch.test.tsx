/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import React from "react";
import StopWatch from "./StopWatch";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";

jest.useFakeTimers();

test("renders initial time and buttons", () => {
  render(<StopWatch />);

  const watch = screen.getByTestId("watch");

  expect(watch.textContent).toEqual("00:00:00");
  expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /stop/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /lap/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
});

test("start button functionality", () => {
  render(<StopWatch />);
  const watch = screen.getByTestId("watch");

  const startButton = screen.getByRole("button", { name: /start/i });
  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(watch.textContent).not.toEqual("00:00:00");
});

test("stop button functionality", () => {
  render(<StopWatch />);
  const watch = screen.getByTestId("watch");
  const startButton = screen.getByRole("button", { name: /start/i });
  const stopButton = screen.getByRole("button", { name: /stop/i });

  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(500);
  });

  fireEvent.click(stopButton);

  expect(watch.textContent).toEqual("00:00:50");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(watch.textContent).toEqual("00:00:50");
});

test("reset button functionality", () => {
  render(<StopWatch />);
  const watch = screen.getByTestId("watch");
  const startButton = screen.getByRole("button", { name: /start/i });
  const resetButton = screen.getByRole("button", { name: /reset/i });

  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(watch.textContent).toEqual("00:00:50");

  fireEvent.click(resetButton);

  expect(watch.textContent).toEqual("00:00:00");
});

test("lap button functionality", () => {
  render(<StopWatch />);
  const startButton = screen.getByRole("button", { name: /start/i });
  const stopButton = screen.getByRole("button", { name: /stop/i });
  const lapButton = screen.getByRole("button", { name: /lap/i });

  fireEvent.click(startButton);

  for (let i = 0; i < 3; i++) {
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.click(lapButton);
  }
  fireEvent.click(stopButton);
  fireEvent.click(lapButton);

  expect(screen.getByText("#1")).toBeInTheDocument();
  expect(screen.getByText("#2")).toBeInTheDocument();
  expect(screen.getByText("#3")).toBeInTheDocument();
  expect(screen.queryByText("#4")).toBeNull();
});
