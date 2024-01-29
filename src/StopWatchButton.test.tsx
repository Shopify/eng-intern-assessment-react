import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchButton from "./StopWatchButton"; // Adjust the import path based on your project structure
import React from "react";
import exp from "constants";

describe("StopWatchButton Component", () => {
  // Reset Button Test
  test("Reset button should set the time to 0 and clear laps", () => {
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(mockSetTime).toHaveBeenCalledWith(0);
    expect(mockSetLaps).toHaveBeenCalledWith([]);
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
  });

  test("Reset button should be disabled when time is 0", () => {
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={0}
      />
    );

    expect(screen.getByTestId("reset-button")).toBeDisabled();
  });

  test("Reset button should be enabled when time is greater than 0", () => {
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("reset-button")).toBeEnabled();
  });

  test("Start/Stop button should call start timer when timer is not running", () => {
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    fireEvent.click(screen.getByTestId("start-stop-button"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });

  test("Start/Stop button should call stop timer when timer is running", () => {
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    fireEvent.click(screen.getByTestId("start-stop-button"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
  });

  test("Start/Stop button should display play icon when timer is not running", () => {
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("start-stop-button")).toContainElement(
      screen.getByTestId("play-icon")
    );
  });

  test("Start/Stop button should display pause icon when timer is running", () => {
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("start-stop-button")).toContainElement(
      screen.getByTestId("pause-icon")
    );
  });

  test("Lap button should add the current time to the laps array", () => {
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    const initialLaps = [10, 20, 30];
    const curTime = 40;

    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={curTime}
      />
    );

    fireEvent.click(screen.getByTestId("lap-button"));
    expect(mockSetLaps).toHaveBeenCalledTimes(1);

    const setLapsArg = mockSetLaps.mock.calls[0][0];
    expect(typeof setLapsArg).toBe("function");

    expect(setLapsArg(initialLaps)).toEqual([...initialLaps, curTime]);
  });

  test("Lap button should be disabled when timer is not running", () => {
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("lap-button")).toBeDisabled();
  });

  test("Lap button should be enabled when timer is running", () => {
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("lap-button")).toBeEnabled();
  });

  test("Lap button should be disabled when timer is not running", () => {
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    expect(screen.getByTestId("lap-button")).toBeDisabled();
  });
});
