/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Stopwatch from "../components/StopWatch";

beforeEach(() => {
  jest.useFakeTimers({ advanceTimers: true });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
});

test("should render stopwatch component with all vals = 00", () => {
  render(<Stopwatch />);

  // check that all components are displayed as expected
  expect(screen.getByTestId("stopwatch")).toBeInTheDocument();
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();

  // check that the initial state is displayed correctly
  expect(screen.getByTestId("minutes")).toHaveTextContent("00");
  expect(screen.getByTestId("seconds")).toHaveTextContent("00");
  expect(screen.getByTestId("ms")).toHaveTextContent("00");
  expect(screen.queryByText("Pause")).toBeNull();
  expect(screen.queryByText("Lap")).toBeNull();
  expect(screen.queryByText("Laps")).toBeNull();
  expect(screen.queryByText("Relative Time")).toBeNull();
  expect(screen.queryByText("Absolute Time")).toBeNull();
});

test("should start and pause the stopwatch on start/pause button click", async () => {
  // Click the "Start" button
  const user = userEvent;
  render(<Stopwatch />);

  await user.click(screen.getByText("Start"));
  expect(screen.getByText("Pause")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();

  // Advance the timer by 1000 milliseconds and check if time on screen updates
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByTestId("seconds")).toHaveTextContent("01");

  await user.click(screen.getByText("Pause"));
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();

  // Advance the timer by another 1000 milliseconds to assert that the time has not changed after pausing
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByTestId("seconds")).toHaveTextContent("01");
});

test("should reset time to 00:00.00 on reset button click", async () => {
  const user = userEvent;
  render(<Stopwatch />);

  await user.click(screen.getByText("Start"));

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  await user.click(screen.getByText("Pause"));

  expect(screen.getByTestId("seconds")).toHaveTextContent("01");
  await user.click(screen.getByText("Reset"));

  expect(screen.getByTestId("seconds")).toHaveTextContent("00");
});

test("check that laps are rendered on lap button click", async () => {
  const user = userEvent;
  render(<Stopwatch />);
  await user.click(screen.getByText("Start"));

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  await user.click(screen.getByText("Lap"));

  expect(screen.getByTestId("laps")).toBeInTheDocument();
});

test("check that laps are rendered correctly", async () => {
  const user = userEvent;
  render(<Stopwatch />);
  await user.click(screen.getByText("Start"));

  act(() => {
    jest.advanceTimersByTime(10);
  });
  await user.click(screen.getByText("Lap"));

  expect(screen.getByTestId("abs-lap-1-minutes")).toHaveTextContent("00");
  expect(screen.getByTestId("abs-lap-1-seconds")).toHaveTextContent("00");
  expect(screen.getByTestId("abs-lap-1-ms")).toHaveTextContent("00");
});
