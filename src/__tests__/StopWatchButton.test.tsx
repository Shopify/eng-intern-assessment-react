/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import StopWatchButton from "./../StopWatchButton";
import React from "react";

test("Start calls start handle function", async () => {
  const startFn = jest.fn();
  // ARRANGE
  render(
    <StopWatchButton
      isRunning={false}
      lap={() => {}}
      start={startFn}
      stop={() => {}}
      reset={() => {}}
    />,
  );

  // ACT
  expect(screen.getByText("Start")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Start"));
  // ASSERT
  expect(startFn).toHaveBeenCalled();
});

test("Reset calls reset handle function", async () => {
  const resetFn = jest.fn();
  // ARRANGE
  render(
    <StopWatchButton
      isRunning={false}
      lap={() => {}}
      start={() => {}}
      stop={() => {}}
      reset={resetFn}
    />,
  );

  // ACT
  expect(screen.getByText("Reset")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Reset"));

  // ASSERT
  expect(resetFn).toHaveBeenCalled();
});

test("Lap button appears and calls lap function when stopwatch is running", async () => {
  const lapFn = jest.fn();
  render(
    <StopWatchButton
      isRunning={true}
      lap={lapFn}
      start={() => {}}
      stop={() => {}}
      reset={() => {}}
    />,
  );

  // ACT
  expect(screen.getByText("Lap")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Lap"));
  // ASSERT
  expect(lapFn).toHaveBeenCalled();
});

test("Stop button appears and calls stop function when stopwatch is running", async () => {
  const stopFn = jest.fn();
  render(
    <StopWatchButton
      isRunning={true}
      lap={() => {}}
      start={() => {}}
      stop={stopFn}
      reset={() => {}}
    />,
  );

  // ACT
  expect(screen.getByText("Stop")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Stop"));
  // ASSERT
  expect(stopFn).toHaveBeenCalled();
});
