import { render, fireEvent, screen } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";
import React from "react";

//tests the StopWatchButton functions
describe("testing StopWatchButton functionality", () => {
  test("renders Start button initially", () => {
    render(
      <StopWatchButton
        time={0}
        setTime={() => {}}
        setLaps={() => {}}
        laps={[]}
      />
    );
    expect(screen.getByText("Start")).toBeDefined();
  });

  test("renders Stop button when timer is active", () => {
    const { getByText } = render(
      <StopWatchButton
        time={0}
        setTime={() => {}}
        setLaps={() => {}}
        laps={[]}
      />
    );
    fireEvent.click(getByText("Start"));
    expect(screen.getByText("Stop")).toBeDefined();
  });

  test("calls clearInterval on Stop button click", () => {
    const clearIntervalMock = jest.fn();
    jest.spyOn(window, "clearInterval").mockImplementation(clearIntervalMock);
    render(
      <StopWatchButton
        time={0}
        setTime={() => {}}
        setLaps={() => {}}
        laps={[]}
      />
    );
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Stop"));
    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
  });

  test("calls setLaps on Laps button click when timer is active", () => {
    const setLapsMock = jest.fn();
    const { getByText } = render(
      <StopWatchButton
        time={0}
        setTime={() => {}}
        setLaps={setLapsMock}
        laps={[]}
      />
    );
    fireEvent.click(getByText("Start"));
    fireEvent.click(getByText("Laps"));
    expect(setLapsMock).toHaveBeenCalledTimes(1);
  });

  test("does not call setLaps on Laps button click when timer is not active", () => {
    const setLapsMock = jest.fn();
    const { getByText } = render(
      <StopWatchButton
        time={0}
        setTime={() => {}}
        setLaps={setLapsMock}
        laps={[]}
      />
    );
    fireEvent.click(getByText("Laps"));
    expect(setLapsMock).not.toHaveBeenCalled();
  });

  test("calls clearInterval and resets time and laps on Reset button click", () => {
    const clearIntervalMock = jest.fn();
    const setTimeMock = jest.fn();
    const setLapsMock = jest.fn();
    jest.spyOn(window, "clearInterval").mockImplementation(clearIntervalMock);
    render(
      <StopWatchButton
        time={100}
        setTime={setTimeMock}
        setLaps={setLapsMock}
        laps={[50, 75]}
      />
    );
    fireEvent.click(screen.getByText("Reset"));
    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
    expect(setTimeMock).toHaveBeenCalledWith(0);
    expect(setLapsMock).toHaveBeenCalledWith([]);
  });
});
