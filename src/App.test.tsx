import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getAllByTestId,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App", () => {
  it("increments the timer after start is pressed", async () => {
    const { getByText, getByTestId } = render(<App />);

    // Press start button
    const startButton = getByText("start");
    act(() => {
      fireEvent.click(startButton);
    });

    // Check that the timer is no longer 00:00:00
    await waitFor(
      () => {
        const timer = getByTestId("stopwatch-text");
        expect(timer.textContent).not.toBe("00:00:00");
      },
      { timeout: 1000 }
    );
  });

  it("stops the timer after stop is pressed", async () => {
    const { getByText, getByTestId } = render(<App />);

    // Press start button
    const startButton = getByText("start");
    act(() => {
      fireEvent.click(startButton);
    });

    // Check that the timer is no longer 00:00:00
    await waitFor(
      () => {
        const timer = getByTestId("stopwatch-text");
        expect(timer.textContent).not.toBe("00:00:00");
      },
      { timeout: 1000 }
    );

    // Press stop button
    const stopButton = getByText("stop");
    act(() => {
      fireEvent.click(stopButton);
    });

    // Wait for 1 second and check that the timer value has not changed
    const timerAfterStop = getByTestId("stopwatch-text").textContent;
    await waitFor(
      () => {
        const timerAfterWait = getByTestId("stopwatch-text").textContent;
        expect(timerAfterWait).toBe(timerAfterStop);
      },
      { timeout: 1000 }
    );
  });

  // test for adding laps
  it("adds a lap after lap is pressed", async () => {
    const { getByText, getByTestId } = render(<App />);

    // Press start button
    const startButton = getByText("start");
    act(() => {
      fireEvent.click(startButton);
    });

    // Check that the timer is no longer 00:00:00
    await waitFor(
      () => {
        const timer = getByTestId("stopwatch-text");
        expect(timer.textContent).not.toBe("00:00:00");
      },
      { timeout: 1000 }
    );

    // Press lap button
    const lapButton = getByText("lap");
    act(() => {
      fireEvent.click(lapButton);
    });

    // Check that the number of laps has gone up to 2
    const laps = getAllByTestId(document.body, "lap-wrapper");
    expect(laps.length).toBe(2);
  });

  it("resets the timer and laps after reset is pressed", async () => {
    const { getByText, getByTestId } = render(<App />);

    // Press start button
    const startButton = getByText("start");
    act(() => {
      fireEvent.click(startButton);
    });

    // Check that the timer is no longer 00:00:00
    await waitFor(
      () => {
        const timer = getByTestId("stopwatch-text");
        expect(timer.textContent).not.toBe("00:00:00");
      },
      { timeout: 1000 }
    );

    // Press lap button
    const lapButton = getByText("lap");
    act(() => {
      fireEvent.click(lapButton);
    });

    // Check that the number of laps has gone up to 2
    const laps = getAllByTestId(document.body, "lap-wrapper");
    expect(laps.length).toBe(2);

    // Press stop button
    const stopButton = getByText("stop");
    act(() => {
      fireEvent.click(stopButton);
    });

    // Press reset button
    const resetButton = getByText("reset");
    act(() => {
      fireEvent.click(resetButton);
    });

    // Check that the timer is 00:00:00 and that there is only 1 lap
    const timer = getByTestId("stopwatch-text");
    expect(timer.textContent).toBe("00:00:00");
    const new_laps = getAllByTestId(document.body, "lap-wrapper");
    expect(new_laps.length).toBe(1);
  });
});
