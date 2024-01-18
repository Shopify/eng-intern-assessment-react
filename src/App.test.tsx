/**
 * @file App.text.tsx
 * @desc Unit tests for the stopwatch app
 * @author Hadi Naqvi
 */

import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';

describe('Stopwatch App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('the stopwatch starts counting at regular speed when start is clicked', () => {
    render(<App />);
    const stopwatchElement = screen.getByTestId('stopwatch');
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Simulates 1 second passing on the stopwatch
    // Extra 8ms delay to account for discrepency between the stopwatch and jest timer
    act(() => {
      jest.advanceTimersByTime(1008);
    });

    expect(stopwatchElement.textContent).toContain('00:00:01.00');
  });

  test('the stopwatch stops when stop is clicked', () => {
    render(<App />);
    const startStopButton = screen.getByText('Start');

    // Simulates starting the stopwatch, and then stopping it after
    fireEvent.click(startStopButton);
    fireEvent.click(startStopButton);

    const stopwatchElement = screen.getByTestId('stopwatch');
    expect(stopwatchElement.textContent).toContain('00:00:00.00');
  });

  test('the stopwatch stops counting when it is stopped, and resumes when started again', () => {
    render(<App />);
    const startStopButton = screen.getByText('Start');

    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.click(startStopButton);

    const prevElapsedTime = screen.getByTestId('stopwatch').textContent;

    fireEvent.click(startStopButton);

    const currentElapsedTime = screen.getByTestId('stopwatch').textContent;
    expect(prevElapsedTime).toEqual(currentElapsedTime);
  });

  test('the lap counter increases the laps when the lap button is clicked', () => {
    render(<App />);
    const lapCounterElement = screen.getByTestId('lap-counter');
    const lapButton = screen.getByText('Lap');
    
    fireEvent.click(lapButton);

    expect(lapCounterElement.textContent).toContain('1');
  });

  test('the stopwatch and lap counter reset to zero when the reset button is pressed', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');
    const lapButton = screen.getByText('Lap');
    const stopwatchElement = screen.getByTestId('stopwatch');
    const lapCounterElement = screen.getByTestId('lap-counter');

    fireEvent.click(startButton);
    fireEvent.click(lapButton);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.click(resetButton);
    
    expect(stopwatchElement.textContent).toContain('00:00:00.00');
    expect(lapCounterElement.textContent).toContain('Laps: 0');
  });
});