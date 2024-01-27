/*
 *@jest-environment jsdom
 */
import React from "react";
import StopWatch from "./src/StopWatch";
import { render, fireEvent, screen } from "@testing-library/react";

test(`Stopwatch initially renders`, () => {
  render(<StopWatch time={0} />);

  expect(screen.getByText("00:00:000")).toBeTruthy();
});

test(`Stopwatch starts counting when "Start" button is clicked`, () => {});

test(`Stopwatch stops counting when "Stop" button is clicked`, () => {});

test(`Stopwatch resets to zero when "Reset" button is clicked`, () => {});

test(`Stopwatch resets timer when "Lap" is clicked`, () => {});

test(`Stopwatch records lap time`, () => {});

test(`Stopwatch displays lap time`, () => {});
