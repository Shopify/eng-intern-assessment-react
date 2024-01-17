import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom'

jest.useFakeTimers();

describe('Stopwatch functionality tests', () => {
  test('render the stopwatch component', () => {
    const { getByText } = render(<App />);
    expect(getByText("Start")).toBeInTheDocument();
    expect(getByText("Reset Timer")).toBeInTheDocument();
  });

  test('start and stop the stopwatch', () => {
    const { getByText, getByTestId } = render(<App />);
    
    // Start the stopwatch
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Stop the stopwatch
    fireEvent.click(getByText('Stop'));

    const displayedTimeAfterTwoSeconds = getByTestId('stopwatch-time').textContent;

    // Check if stopwatch displays the correct time after 2 seconds
    expect(displayedTimeAfterTwoSeconds).toBe('00:02:00');

    // Advance the test timer while the stopwatch is still stopped
    jest.advanceTimersByTime(2000);

    // Ensure stopwatch did not change while stopped
    expect(displayedTimeAfterTwoSeconds).toBe('00:02:00');
  });
  

  test('reset the stopwatch', () => {
    const { getByText, getByTestId } = render(<App />);
  
    // Start the stopwatch
    fireEvent.click(getByText('Start'));
    act(() => {
      // advance the test timer by 1 second
      jest.advanceTimersByTime(1000);
    });
  
    // Reset the stopwatch
    fireEvent.click(getByText('Reset Timer'));
  
    const displayedTimeAfterReset = getByTestId('stopwatch-time').textContent;
    // Check if stopwatch was reset correctly
    expect(displayedTimeAfterReset).toBe('00:00:00');
  });

  test('record and clear laps', () => {
    const { getByText, getAllByTestId, queryAllByTestId } = render(<App />);

    // Start the stopwatch
    fireEvent.click(getByText('Start'));
    act(() => {
      // advance the test timer by 1230 milliseconds
      jest.advanceTimersByTime(1230);
    });
  
    // Record a lap
    fireEvent.click(getByText('Lap'));
  
    const lapTimes = getAllByTestId('lap-time');
    // Check if exactly one lap is recorded
    expect(lapTimes.length).toBe(1);
    // Check if the lap time is correct
    expect(lapTimes[0].textContent).toBe('00:01:23');
  
    act(() => {
      // advance the test timer by 2 seconds
      jest.advanceTimersByTime(2000);
    });
  
    // Record another lap
    fireEvent.click(getByText('Lap'));

    const lapTimesAfterSecondLap = getAllByTestId('lap-time');
    // Check if two laps are recorded
    expect(lapTimesAfterSecondLap.length).toBe(2);
    // Check if the second lap time is correct
    expect(lapTimesAfterSecondLap[1].textContent).toBe('00:03:23');

    // Clear laps
    fireEvent.click(getByText('Clear Laps'));

    const lapTimesAfterClear = queryAllByTestId('lap-time');
    // Check if all laps were cleared
    expect(lapTimesAfterClear.length).toBe(0);
  });
  
});
