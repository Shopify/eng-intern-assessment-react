import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

// Helper function to check if the timer is set to hours:minutes:seconds:milliseconds.
function checkTime(
  container: HTMLElement,
  hours: string = "00",
  minutes: string = "00",
  seconds: string = "00",
  milliseconds: string = "00"
) {
  expect(container.querySelector("#hours").innerHTML).toEqual(hours);
  expect(container.querySelector("#minutes").innerHTML).toEqual(minutes);
  expect(container.querySelector("#seconds").innerHTML).toEqual(seconds);
  expect(container.querySelector("#milliseconds").innerHTML).toEqual(
    milliseconds
  );
}

function checkLapTime(
  container: HTMLElement,
  lap: string,
  time: string,
  totalTime: string,
  index: number
) {
  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-3").innerHTML
  ).toEqual(totalTime);
  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-2").innerHTML
  ).toEqual(time);
  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-1").innerHTML
  ).toEqual(lap);
}

test("renders the App component", () => {
  const { container } = render(<App />);

  // Check if the initial timer is set to 00:00:00:00
  checkTime(container, "00", "00", "00", "00");

  // Check if all four buttons are rendered
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(screen.getByText("Stop")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();
});

test("starts the stopwatch and checks if the time is updated after 5 seconds", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  // Check if the time is updated after 5 seconds
  setTimeout(() => {
    checkTime(container, "00", "00", "05", "00"); // For hours, minutes, and seconds
  }, 5000);
});

test("runs stopwatch for 5 seconds, stops then runs for 5 seconds again", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  // Check if the time is updated after 5 seconds
  setTimeout(() => {
    let stopButton = screen.getByText("Stop");
    stopButton.click();
  }, 5000);

  // Start the stopwatch again, run for 5 seconds, and check if the time is updated.
  startButton.click();
  setTimeout(() => {
    checkTime(container, "00", "00", "10", "00");
    let stopButton = screen.getByText("Stop");
    stopButton.click();
  }, 5000);
});

test("start stopwatch, stop it, then reset", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  setTimeout(() => {
    // Stop the stopwatch
    let stopButton = screen.getByText("Stop");
    stopButton.click();

    // Check for timer to be 5 seconds.
    checkTime(container, "00", "00", "05", "00");
  }, 5000);

  // Reset the stopwatch
  let resetButton = screen.getByText("Reset");
  resetButton.click();

  // Check if the initial timer is set to 00:00:00:00
  checkTime(container, "00", "00", "00", "00");
});

test("start stopwatch, reset without stopping", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  setTimeout(() => {
    // Reset the stopwatch
    let resetButton = screen.getByText("Reset");
    resetButton.click();

    // Check if the initial timer is set to 00:00:00:00
    checkTime(container, "00", "00", "00", "00");
  }, 5000);
});

test("stop stopwatch before starting", () => {
  const { container } = render(<App />);

  // Stop the stopwatch
  let stopButton = screen.getByText("Stop");
  stopButton.click();

  // Check if the initial timer is set to 00:00:00:00
  checkTime(container, "00", "00", "00", "00");
});

test("Start button clicked twice", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  // Start the stopwatch again
  startButton.click();

  // Check if the time is updated after 5 seconds
  setTimeout(() => {
    checkTime(container, "00", "00", "05", "00");
  }, 5000);
});

test("Test lap button", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  // Click the lap button
  setTimeout(() => {
    let lapButton = screen.getByText("Lap");
    lapButton.click();

    // Check if the lap table is rendered
    expect(container.querySelector("#lap-table")).toBeInTheDocument();

    checkLapTime(container, "1", "00:00:05:00", "00:00:05:00", 0);
  }, 5000);
});

test("Test lap button twice", () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  startButton.click();

  // Click the lap button
  setTimeout(() => {
    let lapButton = screen.getByText("Lap");
    lapButton.click();

    // Check if the lap table is rendered
    expect(container.querySelector("#lap-table")).toBeInTheDocument();

    checkLapTime(container, "1", "00:00:05:00", "00:00:05:00", 0);
  }, 5000);

  // Click the lap button again
  setTimeout(() => {
    let lapButton = screen.getByText("Lap");
    lapButton.click();

    // Check if the lap table is rendered
    expect(container.querySelector("#lap-table")).toBeInTheDocument();

    checkLapTime(container, "2", "00:00:05:00", "00:00:10:00", 1);
  }, 10000);
});

  test("Test lap button after stopping using jest fake timers", async () => {
    jest.useFakeTimers();
    const { container } = render(<App />);

    // Start the stopwatch
    let startButton = screen.getByText("Start");
    startButton.click();

    // Click the lap button
    setTimeout(() => {
      let lapButton = screen.getByText("Lap");
      lapButton.click();

      // Check if the lap table is rendered
      expect(container.querySelector("#lap-table")).toBeInTheDocument();

      checkLapTime(container, "1", "00:00:05:00", "00:00:05:00", 0);
    }, 5000);

    // Stop the stopwatch
    setTimeout(() => {
      let stopButton = screen.getByText("Stop");
      stopButton.click();
    }, 5000);

    // Click the lap button again
    setTimeout(() => {
      let lapButton = screen.getByText("Lap");
      lapButton.click();

      // Check if the lap table is rendered
      expect(container.querySelector("#lap-table")).toBeInTheDocument();

      checkLapTime(container, "2", "00:00:05:00", "00:00:10:00", 1);
    }, 10000);
  });