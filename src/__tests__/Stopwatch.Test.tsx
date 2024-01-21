import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import StopWatch from '../StopWatch';
import '@testing-library/jest-dom';

describe('StopWatch', () => {
  jest.useFakeTimers();

  it('should start and stop the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    const startStopButton = getByText('Start');

    // Start the stopwatch
    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(3000); // simulate 3 seconds
    });

    expect(getByText('00:00:03')).toBeInTheDocument();

    // Stop the stopwatch
    fireEvent.click(startStopButton);
    expect(getByText('00:00:03')).toBeInTheDocument();
  });

  it('should reset the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    const startStopButton = getByText('Start');
    const resetButton = getByText('Reset');

    // Start and then stop the stopwatch
    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(5000); // simulate 5 seconds
    });
    fireEvent.click(startStopButton);

    // Reset the stopwatch
    fireEvent.click(resetButton);
    expect(getByText('00:00:00')).toBeInTheDocument();
  });

  it('should record laps correctly', () => {
    const { getByText, getAllByText } = render(<StopWatch />);
    const startStopButton = getByText('Start');

    // Start and stop the stopwatch twice to record two laps
    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(3000); // simulate 3 seconds
    });
    fireEvent.click(startStopButton);

    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(2000); // simulate 2 more seconds
    });
    fireEvent.click(startStopButton);

    const laps = getAllByText(/Lap/);
    expect(laps.length).toBe(2);
    expect(laps[0]).toHaveTextContent('Lap 1: 00:00:03');
    expect(laps[1]).toHaveTextContent('Lap 2: 00:00:05');
  });
});
