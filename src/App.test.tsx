import React from "react";
import { fireEvent, render, act } from "@testing-library/react";
import App, { formatMs } from "./App";

it("formatMs calculates 1000 ms correctly", () => {
  expect(formatMs(1000)).toEqual("00:00:01.000");
});

it("formatMs calculates 0 ms correctly", () => {
  expect(formatMs(0)).toEqual("00:00:00.000");
});

it("formatMs calculates 12 hours, 34 minutes, 56 seconds, and 789 ms correctly", () => {
  let ms = 0;
  ms += 12 * 60 * 60 * 1000; // 12 hours
  ms += 34 * 60 * 1000; // 34 minutes
  ms += 56 * 1000; // 56 seconds
  ms += 789; // 789 ms

  expect(formatMs(ms)).toEqual("12:34:56.789");
});

it("renders all required buttons", async () => {
  const { queryByText } = render(<App />);

  ["Start", "Stop", "Lap", "Reset"]
    .map((t) => queryByText(t))
    .forEach((e) => expect(e).toBeTruthy());
});

it("measures 1 second correctly", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  // buttons we need are rendering
  const [start, stop] = ["Start", "Stop"].map((t) => queryByText(t));
  [start, stop].forEach((e) => expect(e).toBeTruthy());

  // timer starts at 0
  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    fireEvent.click(start);
  });

  // check that it renders correctly for each millisecond
  for (let i = 0; i < 1000; i += 1) {
    expect(queryByText(formatMs(i))).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1);
    });
  }

  act(() => {
    fireEvent.click(stop);
  });

  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // the timer does not advance when it's stopped
  expect(queryByText(formatMs(1000))).toBeTruthy();
});

it("resets time correctly when running", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  // buttons exist
  const [start, reset] = ["Start", "Reset"].map((t) => queryByText(t));
  [start, reset].forEach((e) => expect(e).toBeTruthy());

  // timer starts at 0
  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    fireEvent.click(start);
  });

  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // after 1 second passes, the timer displays exactly 1 second
  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    fireEvent.click(reset);
  });

  // the reset button stops and resets displayed time
  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // the timer does not advance when it's stopped
  expect(queryByText(formatMs(0))).toBeTruthy();
});

it("resets time correctly when stopped", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  // buttons exist
  const [start, stop, reset] = ["Start", "Stop", "Reset"].map((t) =>
    queryByText(t),
  );
  [start, stop, reset].forEach((e) => expect(e).toBeTruthy());

  // timer starts at 0
  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    fireEvent.click(start);
  });

  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // after 1 second passes, the timer displays exactly 1 second
  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    fireEvent.click(stop);
  });

  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // the timer does not advance when it's stopped
  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    fireEvent.click(reset);
  });

  // the reset button stops and resets displayed time
  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // the timer does not advance when it's stopped
  expect(queryByText(formatMs(0))).toBeTruthy();
});

it("records laps accurately", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  // buttons exist
  const [start, lap] = ["Start", "Lap"].map((t) => queryByText(t));
  [start, lap].forEach((e) => expect(e).toBeTruthy());

  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    fireEvent.click(start);
  });

  expect(queryByText(formatMs(0))).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(queryByText(formatMs(500))).toBeTruthy();

  act(() => {
    fireEvent.click(lap);
  });

  expect(queryByText(`Lap 01:`).nextSibling.textContent).toEqual(formatMs(500));
  expect(queryByText(`Lap 01:`).nextSibling.nextSibling.textContent).toEqual(
    formatMs(500),
  );

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(queryByText(formatMs(1000))).toBeTruthy();

  act(() => {
    fireEvent.click(lap);
  });

  expect(queryByText(`Lap 01:`).nextSibling.textContent).toEqual(formatMs(500));
  expect(queryByText(`Lap 02:`).nextSibling.textContent).toEqual(
    formatMs(1000),
  );
  expect(queryByText(`Lap 01:`).nextSibling.nextSibling.textContent).toEqual(
    formatMs(500),
  );
  expect(queryByText(`Lap 02:`).nextSibling.nextSibling.textContent).toEqual(
    formatMs(500),
  );
});

it("resets laps", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  // buttons exist
  const [lap, reset] = ["Lap", "Reset"].map((t) => queryByText(t));
  [lap, reset].forEach((e) => expect(e).toBeTruthy());

  act(() => {
    fireEvent.click(lap);
  });

  expect(queryByText(`Lap 01:`)).toBeTruthy();

  act(() => {
    fireEvent.click(lap);
  });

  expect(queryByText(`Lap 01:`)).toBeTruthy();
  expect(queryByText(`Lap 02:`)).toBeTruthy();

  act(() => {
    fireEvent.click(reset);
  });

  expect(queryByText(`Lap 01:`)).toBeFalsy();
  expect(queryByText(`Lap 02:`)).toBeFalsy();
});
