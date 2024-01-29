/*
 *@jest-environment jsdom
 */
import React from "react";
import StopWatch from "./src/StopWatch";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

beforeEach(() => {
  render(<StopWatch />);
});

jest.useFakeTimers();

test(`Stopwatch initially renders`, () => {
  screen.getByText("0:00:000");
});

//Will grab the display element when 0:00:100 is on screen, verifying that the timer starts counting.
test(`Stopwatch starts counting when "Start" button is clicked`, async () => {
  userEvent.click(screen.getByText("Start"));
  expect(await screen.findByText("0:00:100")).toBeTruthy();
});

//Click start, then stop. Wait a second then check the display. "0:00:000" verifies that the stopwatch paused immediately.
test(`Stopwatch stops counting when "Stop" button is clicked`, async () => {
  userEvent.click(screen.getByText("Start"));
  userEvent.click(await screen.findByText("Stop"));
  await jest.advanceTimersByTimeAsync(500);
  expect((await screen.findByTestId("timeDisplay")).innerHTML).toMatch(
    "0:00:000"
  );
});

//Starts the stopwatch running, verifies that it has advanced, pushes the reset button, then verifies that it has zero'd out
test(`Stopwatch resets to zero when "Reset" button is clicked`, async () => {
  userEvent.click(screen.getByText("Start"));
  await jest.advanceTimersByTimeAsync(500);
  expect(screen.getByTestId("timeDisplay").innerHTML).not.toMatch("0:00:000");
  userEvent.click(await screen.findByText("Reset"));
  //I wanted to grab this by testId again, but it's too quick, and the reset is not resolved by then
  expect((await screen.findByText("0:00:000")).innerHTML).toBeTruthy();
});

//Runs the timer for a second, then checks that the displayed lap reads at least one second, and less than 2 seconds
test(`Stopwatch records and displays lap time`, async () => {
  userEvent.click(screen.getByText("Start"));
  await jest.advanceTimersByTimeAsync(1000);
  userEvent.click(await screen.findByText("Lap"));
  expect((await screen.findByText(/Lap 1:/)).innerHTML).toMatch(
    /Lap 1: 0:01:[\d]{3}/
  );
});
