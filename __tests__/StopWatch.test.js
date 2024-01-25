import React from "react";
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/StopWatch";

describe("Stopwatch Tests", () => {
  let initTimers;
  let startBtn;
  let lapBtn;
  const delayPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000); // (2-second delay)
  });
  let getTimers = (screen) => {
    return screen.getAllByText(/\d{2}\s:\s\d{2}\s\.\s\d{2}/);
  };

  beforeEach(() => {
    render(<StopWatch />);
    initTimers = screen.getAllByText("00 : 00 . 00");
    startBtn = screen.getByText("Start");
    lapBtn = screen.getByText("Lap");
  });

  afterEach(() => {
    cleanup();
  });

  test("Loads Initial Stopwatch State", async () => {
    // Check if 2 timers exist (main + lap timers)
    expect(initTimers).toHaveLength(2);
    // Check if start & lap button exist
    expect(startBtn).toBeInTheDocument();
    expect(lapBtn).toBeInTheDocument();
    // Check if lap button is disabled initially
    expect(lapBtn).toBeDisabled();
  });

  test("Start the stopwatch timer", async () => {
    fireEvent.click(startBtn);

    delayPromise.then(() => {
      // Check if 2 timers exist (main + lap timers)
      const timers = getTimers(screen);
      expect(timers).toHaveLength(2);

      // Check if both timers have started ticking and both display the same time
      timers.forEach((timer) => {
        expect(timer.textContent).not.toBe("00 : 00 . 00");
      });
      expect(timers[0].textContent).toBe(timers[1].textContent);
    });
  });

  test("Stop the stopwatch timer", async () => {
    fireEvent.click(startBtn);

    delayPromise.then(() => {
      const timers = getTimers(screen);
      timers.forEach((timer) => {
        expect(timer.textContent).not.toBe("00 : 00 . 00");
      });
    });

    // Fire the stop button and keep log of the stop time
    fireEvent.click(screen.getByText("Stop"));
    const stopTime = getTimers(screen)[0].textContent;

    // Check if stop time equals timers time after 2s
    delayPromise.then(() => {
      expect(getTimers(screen)[0].textContent).toBe(stopTime);
    });
  });

  test("Reset the Stopwatch", () => {
    fireEvent.click(startBtn);

    // Fire reset button if it exists
    delayPromise.then(() => {
      const resetBtn = screen.getByText("Reset");
      fireEvent.click(resetBtn);
    });

    // Check if reset button resets both timers to initial state
    const timers = getTimers(screen);
    timers.forEach((timer) => {
      expect(timer.textContent).toBe("00 : 00 . 00");
    });
  });
});
