/*
 *@jest-environment jsdom
 */
import React from "react";
import StopWatch from "./src/StopWatch";
import userEvent from "@testing-library/user-event";
import {
  render,
  fireEvent,
  screen,
  getByText,
  findByText,
  act,
  waitFor,
  cleanup,
} from "@testing-library/react";

jest.useFakeTimers();

test(`Stopwatch initially renders`, () => {
  render(<StopWatch />);

  screen.getByText("0:00:000");
});

test(`Stopwatch starts counting when "Play" button is clicked`, async () => {
  render(<StopWatch />);
  userEvent.click(screen.getByText("Play"));
  expect(await screen.findByText("0:00:100")).toBeTruthy();
});

test(`Stopwatch stops counting when "Pause" button is clicked`, async () => {
  render(<StopWatch />);
  userEvent.click(screen.getByText("Play"));
  userEvent.click(await screen.findByText("Pause"));
  await jest.advanceTimersByTimeAsync(1000);
  expect(screen.getByTestId("timeDisplay").textContent).toBe("0:00:000");
});

test(`Stopwatch resets to zero when "Reset" button is clicked`, async () => {
  render(<StopWatch />);
  userEvent.click(screen.getByText("Play"));
  await jest.advanceTimersByTimeAsync(1000);
  screen.debug();
  //screen.debug() used to verify that the timer does actually advance.
  userEvent.click(screen.getByText("Reset"));
  expect(await screen.findByText("0:00:000")).toBeTruthy();
});

// test(`Stopwatch records lap time`, async () => {
//   render(<StopWatch />);
// });

// test(`Stopwatch displays lap time`, () => {});
