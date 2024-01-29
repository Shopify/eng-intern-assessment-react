import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatch from './StopWatch';

jest.useFakeTimers();

describe('StopWatch component', () => {
//   test('renders without crashing', () => {
//     render(<StopWatch />);
//   });

  test('starts, stops, and resets the stopwatch', () => {
    const { getByText, getByTestId } = render(<StopWatch />);
    
    // Start the stopwatch
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });
    expect(getByTestId('stopwatch').textContent).toBe('00:01.000');

    // Stop the stopwatch
    fireEvent.click(getByText('Stop'));
    act(() => {
      jest.advanceTimersByTime(2000); // Try to advance time by 2 seconds, should not change
    });
    expect(getByTestId('stopwatch').textContent).toBe('00:01.000');

    // Reset the stopwatch
    fireEvent.click(getByText('Reset'));
    expect(getByTestId('stopwatch').textContent).toBe('00:00.000');
  });

  test('records laps while stopwatch is running', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<StopWatch />);
    
    // Start the stopwatch
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    // Record lap
    fireEvent.click(getByText('Lap'));
    expect(getAllByTestId('lap-item')).toHaveLength(1);
    expect(getByTestId('lap-item-0').textContent).toBe('00:01.000');
  });
});
