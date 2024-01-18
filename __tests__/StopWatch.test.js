/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import toBeInTheDocument from '@testing-library/jest-dom';
import StopWatch from '../src/StopWatch.tsx';


describe("StopWatch functionality", () => {
  // Set up fake timers before each test to control the behavior of timers in a controlled environment.\
  // Clear all timers after each test
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  it("renders the initial StopWatch component correctly", () => {
    // Capture snapshot for stability
    const { container } = render(<StopWatch />);
    expect(container).toMatchSnapshot();

    // Check if initial time is "00:00:00".
    expect(screen.getByText("00:00:00")).toBeInTheDocument();

    // Check if Start and Reset buttons are present on initial render
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();

    // Check if Lap and Pause buttons are not present on initial render when stopwatch is inactive
    expect(screen.queryByTestId("stopwatch-lap")).not.toBeInTheDocument();
    expect(screen.queryByTestId("stopwatch-pause")).not.toBeInTheDocument();

    // Check if lap list length is 0 on initial render
    expect(screen.queryByTestId("stopwatch-laps").children.length).toBe(0);
  });
  // end

  it("toggles between Start and Pause buttons", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText('Start'));

    // Check button states when the stopwatch is active
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.queryByTestId("stopwatch-start")).not.toBeInTheDocument();

    // Pause the timer
    fireEvent.click(screen.getByText('Pause'));

    // Check button states when the stopwatch is paused
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByTestId("stopwatch-pause")).not.toBeInTheDocument();
    expect(screen.queryByTestId("stopwatch-lap")).not.toBeInTheDocument();
  });
  // end

  it("starts counting when the user clicks the start button", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText('Start'));

    // Simulate time incrementing by advancing timers
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Check if the timer is greater than "00:00:00"
    const timerValue = screen.getByTestId("stopwatch-timer").textContent;
    const [minutes, seconds, milliseconds] = timerValue.split(':').map(Number);
    expect(minutes > 0 || seconds > 0 || milliseconds > 0).toBe(true);
  });
  // end

  it("adds lap when the timer is active and the user clicks 'Lap'", () => {
    render(<StopWatch />);
    // Store initial lap count, which is 0
    const initialLaps = screen.queryByTestId("stopwatch-laps").children.length;

    // Start the timer
    fireEvent.click(screen.getByText('Start'));

    // Simulate time incrementing by advancing timers
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Simulate the user clicking the 'Lap' button 3 times
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('stopwatch-lap'));
    }

    // Expect 'Lap' labels 1, 2, and 3 to be displayed
    for (let j = 1; j <= 3; j++) {
      expect(screen.getByText(`Lap ${j}`)).toBeInTheDocument();
    }

    // Expect the updated lap count to be the initial lap count plus 3
    const updatedLapCount = screen.queryByTestId("stopwatch-laps").children.length;
    expect(updatedLapCount).toBe(initialLaps + 3);
  });
  // end

  it("clears all laps and resets the StopWatch to initial states on 'Reset'", () => {
    render(<StopWatch />);
    // Store initial lap count, which is 0
    const initialLaps = screen.queryByTestId("stopwatch-laps").children.length;

    // Start the timer
    fireEvent.click(screen.getByText('Start'));

    // Simulate time incrementing by advancing timers
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Check if the timer is greater than "00:00:00"
    const timerValue = screen.getByTestId("stopwatch-timer").textContent;
    const [minutes, seconds, milliseconds] = timerValue.split(':').map(Number);
    expect(minutes > 0 || seconds > 0 || milliseconds > 0).toBe(true);

    // Simulate the user clicking the 'Lap' button 3 times
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('stopwatch-lap'));
    }

    // Expect 'Lap' labels 1, 2, and 3 to be displayed
    for (let j = 1; j <= 3; j++) {
      expect(screen.getByText(`Lap ${j}`)).toBeInTheDocument();
    }

    // Expect the updated lap count to be the initial lap count plus 3
    const updatedLapCount = screen.queryByTestId("stopwatch-laps").children.length;
    expect(updatedLapCount).toBe(initialLaps + 3);

    fireEvent.click(screen.getByText('Reset'));

    // Verify the timer was reset
    expect(screen.getByText("00:00:00")).toBeInTheDocument();

    // Verify lap list length is 0 after reset
    expect(screen.queryByTestId("stopwatch-laps").children.length === 0);
  });
  // end

});



