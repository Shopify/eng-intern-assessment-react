// Importing necessary libraries and components for testing
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "./StopWatch"; // Importing the component to be tested
import React from "react";
import { act } from "react-dom/test-utils";

// Grouping tests related to StopWatch component
describe("StopWatch Component", () => {
  // Test case to check if the StopWatch renders the correct initial time
  test("StopWatch should render the correct time", () => {
    render(<StopWatch />); // Rendering the component

    // Expecting the hours, minutes, seconds, and milliseconds to initially be "00"
    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  // Using fake timers for testing time-dependent code
  jest.useFakeTimers();

  // Test case to check if the timer starts when the start button is clicked
  test("Starts timer when start button is clicked", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval"); // Spying on setInterval function
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Expecting setInterval to have been called once and with a function and 10 as arguments
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  // Test case to check if the timer stops when the stop button is clicked
  test("Stops timer when stop button is clicked", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval"); // Spying on clearInterval function
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating a click on the start button to stop the timer
    act(() => {
      fireEvent.click(startButton);
    });

    // Expecting clearInterval to have been called
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  // Test case to check if the timer resets when the reset button is clicked
  test("Resets timer when reset button is clicked", () => {
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button
    const resetButton = screen.getByTestId("reset-button"); // Getting the reset button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating a click on the reset button to reset the timer
    act(() => {
      fireEvent.click(resetButton);
    });

    // Expecting the hours, minutes, seconds, and milliseconds to be "00" after reset
    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  // Test case to check if the reset button works when the timer is running
  test("Check if reset button works when timer is running", () => {
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button
    const resetButton = screen.getByTestId("reset-button"); // Getting the reset button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating a click on the reset button to reset the timer
    act(() => {
      fireEvent.click(resetButton);
    });

    // Expecting the hours, minutes, seconds, and milliseconds to be "00" after reset
    expect(screen.getByTestId("hours-display")).toHaveTextContent("00");
    expect(screen.getByTestId("minutes-display")).toHaveTextContent("00");
    expect(screen.getByTestId("seconds-display")).toHaveTextContent("00");
    expect(screen.getByTestId("milliseconds-display")).toHaveTextContent("00");
  });

  // Test case to check if the lap button adds a lap to the list of laps
  test("Lap button should add a lap to the list of laps", () => {
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button
    const lapButton = screen.getByTestId("lap-button"); // Getting the lap button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating a click on the lap button to add a lap and advancing the timers
    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating another click on the lap button to add another lap and advancing the timers
    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    // Expecting the lap list to have 2 children (2 laps)
    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  // Test case to check if the reset button clears the list of laps
  test("Reset button should clear the list of laps", () => {
    render(<StopWatch />); // Rendering the component
    const startButton = screen.getByTestId("start-stop-button"); // Getting the start button
    const lapButton = screen.getByTestId("lap-button"); // Getting the lap button
    const resetButton = screen.getByTestId("reset-button"); // Getting the reset button

    // Simulating a click on the start button and advancing the timers
    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating a click on the lap button to add a lap and advancing the timers
    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    // Simulating another click on the lap button to add another lap and advancing the timers
    act(() => {
      fireEvent.click(lapButton);
      jest.advanceTimersByTime(1000);
    });

    // Expecting the lap list to have 2 children (2 laps)
    expect(screen.getByTestId("lap-list").children.length).toBe(2);

    // Simulating a click on the reset button to clear the laps
    act(() => {
      fireEvent.click(resetButton);
    });

    // Expecting the lap list to have 0 children (0 laps) after reset
    expect(screen.getByTestId("lap-list").children.length).toBe(0);
  });
});
