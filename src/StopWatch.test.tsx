import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';

jest.useFakeTimers();

describe('StopWatch component', () => {
  test('starts the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second passing
    });
    expect(getByText('0h : 0m : 1s.00')).toBeInTheDocument();
  });
  
  test('stops the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second passing
    });
    fireEvent.click(getByText('Stop'));
    act(() => {
      jest.advanceTimersByTime(1000); // Simulate another second passing
    });
    expect(getByText('0h : 0m : 1s.00')).toBeInTheDocument(); // Should still be the same time as before stopping
  });

  test('resets the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second passing
    });
    fireEvent.click(getByText('Reset'));
    expect(getByText('0h : 0m : 0s.00')).toBeInTheDocument(); // Should be back to 0 after resetting
  });

  test('records laps', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second passing
    });

    fireEvent.click(getByText('Lap'));
    act(() => {
      jest.advanceTimersByTime(1000); // Simulate another second passing
    });

    expect(getByText('0h : 0m : 2s.00')).toBeInTheDocument(); // Check the main display
    expect(getByText('0h : 0m : 1s.00')).toBeInTheDocument(); // Check if the lap is displayed
  
  });
});
