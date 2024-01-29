// Importing necessary libraries and components for testing
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchButton from "./StopWatchButton";
import React from "react";

// Grouping tests related to StopWatchButton component
describe("StopWatchButton Component", () => {
  // Reset Button Tests
  // Test case to check if the Reset button resets the time and clears laps
  test("Reset button should set the time to 0 and clear laps", () => {
    // Mock functions for testing
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    // Rendering the component with mock functions and initial time
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    // Simulating a click event on the Reset button
    fireEvent.click(screen.getByTestId("reset-button"));

    // Expecting the mock functions to be called with the correct arguments
    expect(mockSetTime).toHaveBeenCalledWith(0);
    expect(mockSetLaps).toHaveBeenCalledWith([]);
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
  });

  // Test case to check if the Reset button is disabled when time is 0
  test("Reset button should be disabled when time is 0", () => {
    // Rendering the component with time set to 0
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={0}
      />
    );

    // Expecting the Reset button to be disabled
    expect(screen.getByTestId("reset-button")).toBeDisabled();
  });

  // Test case to check if the Reset button is enabled when time is greater than 0
  test("Reset button should be enabled when time is greater than 0", () => {
    // Rendering the component with time set to 20
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Reset button to be enabled
    expect(screen.getByTestId("reset-button")).toBeEnabled();
  });

  // Start/Stop Button Tests
  // Test case to check if the Start/Stop button starts the timer when it's not running
  test("Start/Stop button should call start timer when timer is not running", () => {
    // Mock functions for testing
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    // Rendering the component with mock functions and initial time
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    // Simulating a click event on the Start/Stop button
    fireEvent.click(screen.getByTestId("start-stop-button"));

    // Expecting the setIsRunning mock function to be called with true
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });

  // Test case to check if the Start/Stop button stops the timer when it's running
  test("Start/Stop button should call stop timer when timer is running", () => {
    // Mock functions for testing
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    // Rendering the component with mock functions and initial time
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={20}
      />
    );

    // Simulating a click event on the Start/Stop button
    fireEvent.click(screen.getByTestId("start-stop-button"));

    // Expecting the setIsRunning mock function to be called with false
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
  });

  // Test case to check if the Start/Stop button displays the play icon when the timer is not running
  test("Start/Stop button should display play icon when timer is not running", () => {
    // Rendering the component with the timer not running
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Start/Stop button to contain the play icon
    expect(screen.getByTestId("start-stop-button")).toContainElement(
      screen.getByTestId("play-icon")
    );
  });

  // Test case to check if the Start/Stop button displays the pause icon when the timer is running
  test("Start/Stop button should display pause icon when timer is running", () => {
    // Rendering the component with the timer running
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Start/Stop button to contain the pause icon
    expect(screen.getByTestId("start-stop-button")).toContainElement(
      screen.getByTestId("pause-icon")
    );
  });

  // Lap Button Tests
  // Test case to check if the Lap button adds the current time to the laps array
  test("Lap button should add the current time to the laps array", () => {
    // Mock functions for testing
    const mockSetIsRunning = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();

    // Initial laps and current time for testing
    const initialLaps = [10, 20, 30];
    const curTime = 40;

    // Rendering the component with mock functions and initial time
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={mockSetIsRunning}
        setTime={mockSetTime}
        setLaps={mockSetLaps}
        time={curTime}
      />
    );

    // Simulating a click event on the Lap button
    fireEvent.click(screen.getByTestId("lap-button"));

    // Expecting the setLaps mock function to be called once
    expect(mockSetLaps).toHaveBeenCalledTimes(1);

    // Checking the argument of the setLaps mock function
    const setLapsArg = mockSetLaps.mock.calls[0][0];
    expect(typeof setLapsArg).toBe("function");

    // Expecting the setLaps function to add the current time to the laps array
    expect(setLapsArg(initialLaps)).toEqual([...initialLaps, curTime]);
  });

  // Test case to check if the Lap button is disabled when the timer is not running
  test("Lap button should be disabled when timer is not running", () => {
    // Rendering the component with the timer not running
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Lap button to be disabled
    expect(screen.getByTestId("lap-button")).toBeDisabled();
  });

  // Test case to check if the Lap button is enabled when the timer is running
  test("Lap button should be enabled when timer is running", () => {
    // Rendering the component with the timer running
    render(
      <StopWatchButton
        isRunning={true}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Lap button to be enabled
    expect(screen.getByTestId("lap-button")).toBeEnabled();
  });

  // Test case to check if the Lap button is disabled when the timer is not running
  test("Lap button should be disabled when timer is not running", () => {
    // Rendering the component with the timer not running
    render(
      <StopWatchButton
        isRunning={false}
        setIsRunning={jest.fn()}
        setTime={jest.fn()}
        setLaps={jest.fn()}
        time={20}
      />
    );

    // Expecting the Lap button to be disabled
    expect(screen.getByTestId("lap-button")).toBeDisabled();
  });
});
