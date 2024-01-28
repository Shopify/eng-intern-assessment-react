import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "./StopWatch";

describe("Stopwatch", () => {
  const laps = [
    { id: 1, time: 5000 },
    { id: 2, time: 10000 },
  ];

  const renderComponent = (props = {}) => {
    const defaultProps = {
      elapsedTime: 15000,
      isRunning: false,
      laps: [],
      startStop: jest.fn(),
      reset: jest.fn(),
      recordLap: jest.fn(),
      ...props,
    };

    return render(<Stopwatch {...defaultProps} />);
  };

  it("renders elapsed time, buttons, and laps correctly", () => {
    const { getByText, getAllByRole } = renderComponent({
      isRunning: true,
      laps,
    });

    expect(getByText("00:15.000")).toBeInTheDocument();
    expect(getByText("Stop")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
    expect(getByText("Lap")).toBeInTheDocument();

    const lapElements = getAllByRole("listitem");
    expect(lapElements).toHaveLength(laps.length);
    expect(getByText("Lap 1: 00:05.000")).toBeInTheDocument();
    expect(getByText("Lap 2: 00:10.000")).toBeInTheDocument();
  });

  it("calls startStop, reset, and recordLap functions correctly", () => {
    const startStopMock = jest.fn();
    const resetMock = jest.fn();
    const recordLapMock = jest.fn();

    const { getByText } = renderComponent({
      startStop: startStopMock,
      reset: resetMock,
      recordLap: recordLapMock,
    });

    fireEvent.click(getByText("Start"));
    expect(startStopMock).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Reset"));
    expect(resetMock).toHaveBeenCalledTimes(1);

    const lapButton = getByText("Lap");
    expect(lapButton).toBeDisabled();

    fireEvent.click(lapButton);
    expect(recordLapMock).not.toHaveBeenCalled();
  });
});
