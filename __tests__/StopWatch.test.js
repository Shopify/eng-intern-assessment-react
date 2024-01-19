/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import App from "../src/App";
import StopWatch from "../src/StopWatch";
jest.useFakeTimers();

test("stopwatch initially rendered correctly", async () => {
  render(<StopWatch />);
});

test("Start and Lap button visible prior to timer running", async () => {
  render(<App />);
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();
});

test("Start button converts to a pause button when timer is running", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Start"));
  await expect(screen.getByText("Pause")).toBeInTheDocument();
});

test("When start button is clicked timer is rendering", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Start"));
  expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
});

test("lap button is disabled if timer is not running", async () => {
  render(<App />);
  const lapButton = screen.getByText("Lap");
  expect(lapButton).toHaveClass("disabled-button");
});

test("records and displays lap times", () => {
  render(<App />);

  fireEvent.click(screen.getByText("Start"));
  fireEvent.click(screen.getByText("Lap"));
  const lapLists = screen.getAllByRole("list", { title: "lap-list" });

  lapLists.forEach((lapList) => {
    expect(lapList).toContainElement(
      screen.getByText(/Lap #\d+ (\d{2}:){2}\d{2}/)
    );
  });

  fireEvent.click(screen.getByText("Lap"));
  expect(lapLists.length).toBe(2);
});

test("timer resumes after paused", async () => {
  render(<App />);
  const startButton = screen.getByText("Start");
  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  const pauseButton = screen.getByText("Pause");
  fireEvent.click(pauseButton);
  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toHaveTextContent("00:03:00");
});

test("timer resets after reset button is pressed", async () => {
  render(<App />);
  const startButton = screen.getByText("Start");
  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  const resetButton = screen.getByText("Reset");
  fireEvent.click(resetButton);
  expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toHaveTextContent("00:00:00");
});