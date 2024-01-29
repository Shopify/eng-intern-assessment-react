/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen, act, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Stopwatch from "../components/StopWatch";

beforeEach(() => {
  // Needed to prevent jest tests from timing out : https://github.com/nock/nock/issues/2200#issuecomment-1699838032
  jest.useFakeTimers({ advanceTimers: 1 });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
});

describe("tests stopwatch", () => {
  test("check that initial stopwatch state renders correctly", () => {
    render(<Stopwatch />);

    // check that all components are displayed as expected
    expect(screen.getByTestId("stopwatch")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.queryByText("Lap")).toBeNull();
    expect(screen.queryByText("Pause")).toBeNull();
    expect(screen.queryByText("Relative Time")).toBeNull();
    expect(screen.queryByText("Absolute Time")).toBeNull();

    // check that the initial state is displayed correctly
    expect(screen.getByTestId("minutes")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds")).toHaveTextContent("00");
    expect(screen.getByTestId("ms")).toHaveTextContent("00");
  });

  test("should start and pause the stopwatch on start/pause button click", async () => {
    const user = userEvent;
    render(<Stopwatch />);

    // Click the "Start" button
    await user.click(screen.getByText("Start"));
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.getByText("Lap")).toBeInTheDocument();

    // Advance the timer by 1000 milliseconds and check if time on screen updates
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("seconds")).toHaveTextContent("01");

    // trigger pause
    await user.click(screen.getByText("Pause"));
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByTestId("seconds")).toHaveTextContent("01");

    // Advance the timer by another 1000 milliseconds to assert that the time has not changed after pausing
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("seconds")).toHaveTextContent("01");
  });

  test("check that time is reset to 00:00.00 on reset button click", async () => {
    const user = userEvent;
    render(<Stopwatch />);

    await user.click(screen.getByText("Start"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await user.click(screen.getByText("Pause"));

    expect(screen.getByTestId("seconds")).toHaveTextContent("01");
    await user.click(screen.getByText("Reset"));

    expect(screen.getByTestId("seconds")).toHaveTextContent("00");
  });

  test("check that laps are rendered on lap button click", async () => {
    const user = userEvent;
    render(<Stopwatch />);
    await user.click(screen.getByText("Start"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await user.click(screen.getByText("Lap"));

    expect(screen.getByTestId("laps")).toBeInTheDocument();
  });

  test("check that current, relative and absolute laps are rendered correctly", async () => {
    const user = userEvent;
    render(<Stopwatch />);
    await user.click(screen.getByText("Start"));

    act(() => {
      jest.advanceTimersByTime(1550);
    });
    await user.click(screen.getByText("Lap"));

    // check that absolute and relative lap values are the same for the first lap
    expect(
      within(screen.getByTestId("absolute-lap-time-1")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("absolute-lap-time-1")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("01");
    expect(
      within(screen.getByTestId("absolute-lap-time-1")).getByTestId("lap-ms")
    ).toHaveTextContent("55");
    expect(
      within(screen.getByTestId("relative-lap-time-1")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("relative-lap-time-1")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("01");
    expect(
      within(screen.getByTestId("relative-lap-time-1")).getByTestId("lap-ms")
    ).toHaveTextContent("55");

    // Check that for every subsequent lap, absolute and relative lap values are being displayed correctly
    act(() => {
      jest.advanceTimersByTime(2450);
    });

    await user.click(screen.getByText("Lap"));
    expect(
      within(screen.getByTestId("absolute-lap-time-2")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("absolute-lap-time-2")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("04");
    expect(
      within(screen.getByTestId("absolute-lap-time-2")).getByTestId("lap-ms")
    ).toHaveTextContent("00");

    expect(
      within(screen.getByTestId("relative-lap-time-2")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("relative-lap-time-2")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("02");
    expect(
      within(screen.getByTestId("relative-lap-time-2")).getByTestId("lap-ms")
    ).toHaveTextContent("45");

    // check current absolute lap values
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(
      within(screen.getByTestId("absolute-lap-time-current")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("absolute-lap-time-current")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("07");
    expect(
      within(screen.getByTestId("absolute-lap-time-current")).getByTestId(
        "lap-ms"
      )
    ).toHaveTextContent("00");

    // check current relative lap values
    expect(
      within(screen.getByTestId("relative-lap-time-current")).getByTestId(
        "lap-minutes"
      )
    ).toHaveTextContent("00");
    expect(
      within(screen.getByTestId("relative-lap-time-current")).getByTestId(
        "lap-seconds"
      )
    ).toHaveTextContent("03");
    expect(
      within(screen.getByTestId("relative-lap-time-current")).getByTestId(
        "lap-ms"
      )
    ).toHaveTextContent("00");
  });
});
