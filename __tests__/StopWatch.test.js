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

  const delay = async (ms) => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    });
  };

  const getTimers = (screen) => {
    return screen.getAllByText(/\d{2}\s:\s\d{2}\s\.\s\d{2}/);
  };

  const getLapTimes = (screen) => {
    return screen.getAllByText(/\d{2}:\d{2}\.\d{2}/);
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
    await act(async () => {
      fireEvent.click(startBtn);
    });

    await delay(2000);

    const timers = getTimers(screen);
    expect(timers).toHaveLength(2);

    // Check if both timers have started ticking and both display the same time
    timers.forEach((timer) => {
      expect(timer.textContent).not.toBe("00 : 00 . 00");
    });
    expect(timers[0].textContent).toBe(timers[1].textContent);
  });

  test("Stop the Stopwatch Timer", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    await delay(2000);

    const timers = getTimers(screen);
    timers.forEach((timer) => {
      expect(timer.textContent).not.toBe("00 : 00 . 00");
    });

    // Fire the stop button and keep log of the stop time
    await act(async () => {
      fireEvent.click(screen.getByText("Stop"));
    });
    const stopTime = getTimers(screen)[0].textContent;

    // Check if stop time equals timers time after 2s
    await delay(2000);
    expect(getTimers(screen)[0].textContent).toBe(stopTime);
  });

  test("Reset the Stopwatch", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    await delay(2000);

    // Click stop button to pause the time
    await act(async () => {
      fireEvent.click(screen.getByText("Stop"));
    });

    // Fire reset button
    await act(async () => {
      fireEvent.click(screen.getByText("Reset"));
    });

    // Check if reset button resets both timers to initial state
    const timers = getTimers(screen);
    timers.forEach((timer) => {
      expect(timer.textContent).toBe("00 : 00 . 00");
    });
  });

  test("Check Lap Timer Reset on Lap Button Click", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    // Click lap button after approx. 2s of timer running
    await delay(2000);
    await act(async () => {
      fireEvent.click(screen.getByText("Lap"));
    });

    const lapTime = screen.getByTestId("lap-timer").textContent;
    const mainTime = screen.getByTestId("main-timer").textContent;

    // Check that the lap timer now differs from main timer
    expect(mainTime).not.toBe(lapTime);
  });

  test("Check Lap Table Pop-Up on Lap Button Click", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    // Click lap button after approx. 2s of timer running
    await delay(2000);
    await act(async () => {
      fireEvent.click(screen.getByText("Lap"));
    });

    // Check if the first entry of lap time is recorded
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(getLapTimes(screen)).toHaveLength(2);
  });

  test("Check Lap Table on Multiple Lap Button Clicks", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    // Click lap button after approx. 2s of timer running
    await delay(1000);
    lapBtn = screen.getByText("Lap");
    for (let i = 1; i <= 3; i++) {
      await act(async () => {
        fireEvent.click(lapBtn);
      });

      const lapTime = screen.getByTestId("lap-timer").textContent;
      const mainTime = screen.getByTestId("main-timer").textContent;
      // Check that the lap timer now differs from main timer
      expect(mainTime).not.toBe(lapTime);

      // Check if the i'th entry of lap time is recorded
      expect(screen.getByText(`0${i}`)).toBeInTheDocument();
      expect(getLapTimes(screen)).toHaveLength(i * 2);

      await delay(1000);
    }
  });

  test("Check Stopwatch Resume After 2s Wait", async () => {
    await act(async () => {
      fireEvent.click(startBtn);
    });

    await delay(1000);

    // Fire the stop button and keep log of the stop time
    await act(async () => {
      fireEvent.click(screen.getByText("Stop"));
    });
    const stopTime = getTimers(screen)[0].textContent;

    // Fire the resume button to start timer
    await act(async () => {
      fireEvent.click(screen.getByText("Resume"));
    });

    // Check if stop time equals timer after 2s of clicking resume
    await delay(2000);
    expect(stopTime).not.toBe(getTimers(screen)[0]);
  });
});
