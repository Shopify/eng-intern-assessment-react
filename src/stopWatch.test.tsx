/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { calculateTime } from "./StopWatchUtils";
import StopWatchButton from "./StopWatchButton";
import { StopWatchButtonProps } from "./stopWatchProps";

afterEach(() => {
  jest.clearAllMocks();
});

const renderStopWatchButton = (props: StopWatchButtonProps) => {
  return render(<StopWatchButton {...props} />);
};

const mockSetIsStopped = jest.fn();
const mockResetTime = jest.fn();
const mockResetLaps = jest.fn();
const mockResetMinTime = jest.fn();
const mockResetMaxTime = jest.fn();
const mockResetCalculatedLapTimes = jest.fn();

const props: StopWatchButtonProps = {
  isStopped: true,
  setIsStopped: mockSetIsStopped,
  time: 0,
  resetTime: mockResetTime,
  resetLaps: mockResetLaps,
  resetMinTime: mockResetMinTime,
  resetMaxTime: mockResetMaxTime,
  resetCalculatedLapTimes: mockResetCalculatedLapTimes,
};

describe("correctly starts the stopwatch", () => {
  it('test "Start" button has been called', async () => {
    const { getByText } = renderStopWatchButton({ ...props });

    const startButtonElement = getByText("Start");
    fireEvent.click(startButtonElement);

    expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
    expect(mockSetIsStopped).toHaveBeenCalledWith(false);
  });

  it("returns the correct hour in milliseconds", () => {
    expect(calculateTime(3600000)).toEqual("01:00:00:00");
  });

  it("returns the correct minute in milliseconds", () => {
    expect(calculateTime(60000)).toEqual("00:01:00:00");
  });

  it("returns the correct second in milliseconds", () => {
    expect(calculateTime(1000)).toEqual("00:00:01:00");
  });

  it("returns the correct time in hr/min/sec/ms format", () => {
    expect(calculateTime(13857634)).toEqual("03:50:57:69");
  });
});

describe("correctly stops the stopwatch", () => {
  it('test "Stop" button has been called', () => {
    const { getByText } = renderStopWatchButton({
      ...props,
      isStopped: false,
      time: 12333,
    });

    const stopButtonElement = getByText("Stop");
    fireEvent.click(stopButtonElement);

    expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
    expect(mockSetIsStopped).toHaveBeenCalledWith(true);
    expect("00:00:12:33").toBeInTheDocument;
  });
});

describe("correctly resets the stopwatch", () => {
  it('test "Reset" button has been called', async () => {
    const { getByText } = renderStopWatchButton({ ...props });

    const resetButtonElement = getByText("Reset");
    fireEvent.click(resetButtonElement);

    expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
    expect(mockSetIsStopped).toHaveBeenCalledWith(true);
    expect(mockResetTime).toHaveBeenCalledWith(0);
    expect(mockResetLaps).toHaveBeenCalledWith([]);
    expect(mockResetMinTime).toHaveBeenCalledWith(Number.POSITIVE_INFINITY);
    expect(mockResetMaxTime).toHaveBeenCalledWith(0);
    expect(mockResetCalculatedLapTimes).toHaveBeenCalledWith([]);
    expect("00:00:00:00").toBeInTheDocument;
  });
});

describe("correctly records laps", () => {
  it('test "Laps" button has been called', async () => {
    const { getByText } = renderStopWatchButton({
      ...props,
      isStopped: false,
      time: 543634,
    });

    const lapButtonElement = getByText("Lap");
    fireEvent.click(lapButtonElement);

    expect(mockResetLaps).toHaveBeenCalledTimes(1);
    expect("00:09:03:64").toBeInTheDocument;
    expect("Lap 1").toBeInTheDocument;
  });
});
