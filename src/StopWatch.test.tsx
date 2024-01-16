import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import StopWatch from "./StopWatch";

test("Ensuring that our stopwatch has all its necessary buttons and that they change accordingly on click.", () => {
  render(<StopWatch />);

  // Expecting to have the standard stopwatch buttons
  expect(screen.getByText("Start"));
  expect(screen.getByText("Lap"));
  expect(screen.getByText("Reset"));

  expect(screen.getByText("Elapsed Time (s): 0.0"));
  expect(screen.getByText("Current Laps:"));

  /* If we start the timer, our button should change to "Stop" */
  fireEvent.click(screen.getByText("Start"));
  expect(screen.getByText("Stop"));

  /* If we stop the timer, our button should change to "Start" */
  fireEvent.click(screen.getByText("Stop"));
  expect(screen.getByText("Start"));

  // If we reset the timer, the start/stop button should switch back to "Start"
  fireEvent.click(screen.getByText("Start"));
  expect(screen.getByText("Stop"));
  fireEvent.click(screen.getByText("Reset"));
  expect(screen.getByText("Start"));
});

jest.useFakeTimers();
test("Testing that our stopwatch produces the correct times using a mock/fake timer.", () => {
  render(<StopWatch />);
  fireEvent.click(screen.getByText("Start"));
  expect(screen.getByText("Elapsed Time (s): 0.0"));

  /* Since we use a setInterval with a delay of 100ms in our actual code*/
  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(screen.getByText("Elapsed Time (s): 0.1"));

  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(screen.getByText("Elapsed Time (s): 0.2"));
});

test("Testing that our lap button works as expected.", () => {
  render(<StopWatch />);
  fireEvent.click(screen.getByText("Start"));

  fireEvent.click(screen.getByText("Lap"));
  expect(screen.getByText("Lap 1: 0 seconds"));
  fireEvent.click(screen.getByText("Lap"));
  expect(screen.getByText("Lap 2: 0 seconds"));

  act(() => {
    jest.advanceTimersByTime(100);
  });

  fireEvent.click(screen.getByText("Lap"));
  expect(screen.getByText("Lap 3: 0.1 seconds"));
});
