/**
 * @jest-environment jsdom
 */

import React from "react";

import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import StopWatch from "../StopWatch";

// Integration tests
test("start and reset button exist on initial state", async () => {
  // ARRANGE
  render(<StopWatch />);

  // ASSERT
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();
});

test("lap and reset button exist after starting", async () => {
  // ARRANGE
  render(<StopWatch />);

  // ACT
  act(() => fireEvent.click(screen.getByText("Start")));

  // ASSERT
  expect(screen.getByText("Lap")).toBeInTheDocument();
  expect(screen.getByText("Stop")).toBeInTheDocument();
});

test("stopwatch displays '00:00.00' initially", async () => {
  // ARRANGE
  render(<StopWatch />);

  // ASSERT
  expect(screen.getByText("00:00.00")).toBeInTheDocument();
});

test("starting and stopping shows start and reset buttons", async () => {
  // ARRANGE
  render(<StopWatch />);

  // ACT
  act(() => fireEvent.click(screen.getByText("Start")));
  act(() => fireEvent.click(screen.getByText("Stop")));

  // ASSERT
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();
});

test("starting and stopping after 5 seconds shows reset button and start button", async () => {
  // ARRANGE
  jest.useFakeTimers();
  render(<StopWatch />);

  // ACT
  act(() => {
    fireEvent.click(screen.getByText("Start"));
  });

  // expect stop button to be visible
  expect(screen.getByText("Stop")).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(5000);
    fireEvent.click(screen.getByText("Stop"));
  });

  // ASSERT
  expect(screen.getByText("Reset")).toBeInTheDocument();
  expect(screen.getByText("Start")).toBeInTheDocument();

  expect(screen.getAllByText("00:05.00")).toHaveLength(2); // lap time and total time
});

test("lap button adds a new lap with correct time", async () => {
  // ARRANGE
  jest.useFakeTimers();
  render(<StopWatch />);

  // ACT
  act(() => fireEvent.click(screen.getByText("Start")));
  act(() => jest.advanceTimersByTime(3000));
  act(() => fireEvent.click(screen.getByText("Lap")));
  act(() => jest.advanceTimersByTime(2000));
  act(() => fireEvent.click(screen.getByText("Stop")));

  // ASSERT
  expect(screen.getByText("00:02.00")).toBeInTheDocument();
  expect(screen.getByText("00:03.00")).toBeInTheDocument();
  expect(screen.getByText("00:05.00")).toBeInTheDocument();
});

test("reset button resets the stopwatch", async () => {
  // ARRANGE
  jest.useFakeTimers();
  render(<StopWatch />);

  // ACT
  act(() => fireEvent.click(screen.getByText("Start")));
  act(() => jest.advanceTimersByTime(3000));
  act(() => fireEvent.click(screen.getByText("Lap")));
  act(() => jest.advanceTimersByTime(2000));
  act(() => fireEvent.click(screen.getByText("Stop")));
  act(() => fireEvent.click(screen.getByText("Reset")));

  // ASSERT
  expect(screen.getByText("00:00.00")).toBeInTheDocument();
});

afterEach(() => {
  jest.useRealTimers();
});
