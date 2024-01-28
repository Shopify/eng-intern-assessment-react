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

test(`Stopwatch starts counting when "Play" button is clicked`, async () => {
  userEvent.click(screen.getByText("Play"));
  expect(await screen.findByText("0:00:100")).toBeTruthy();
});

test(`Stopwatch stops counting when "Pause" button is clicked`, async () => {
  userEvent.click(screen.getByText("Play"));
  userEvent.click(await screen.findByText("Pause"));
  await jest.advanceTimersByTimeAsync(1000);
  expect(screen.getByTestId("timeDisplay").textContent).toBe("0:00:000");
});

test(`Stopwatch resets to zero when "Reset" button is clicked`, async () => {
  userEvent.click(screen.getByText("Play"));
  await jest.advanceTimersByTimeAsync(1000);
  userEvent.click(screen.getByText("Reset"));
  expect(await screen.findByText("0:00:000")).toBeTruthy();
});

test(`Stopwatch displays laps`, async () => {
  userEvent.click(screen.getByText("Lap"));
  screen.debug();
});

test(`Stopwatch records lap time`, async () => {
  userEvent.click(screen.getByText("Play"));
  await jest.advanceTimersByTimeAsync(1000);
  userEvent.click(await screen.findByText("Lap"));
  console.log(await screen.findByText(/Lap 1:/));
  expect((await screen.findByText(/Lap 1:/)).innerHTML).toMatch(/Lap 1: 0:01:[\d]{3}/);
});
