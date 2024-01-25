import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import StopWatch from './StopWatch';

jest.useFakeTimers();

describe('StopWatch Component', () => {
  it('starts and displays time correctly when the start button is clicked', () => {
    const { getByText } = render(<StopWatch />);
    
    fireEvent.click(getByText('Start'));

    // Advance timers by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText(/00:01.000/)).toBeTruthy();
  });

  it('stops the timer when the stop button is clicked', () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.click(getByText('Start'));

    // Advance timers by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.click(getByText('Stop'));

    // Verify that the timer has stopped at 3 seconds
    expect(getByText(/00:03.000/)).toBeTruthy();

    // Advance timers by another 1 second and verify time doesn't change
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText(/00:03.000/)).toBeTruthy();
  });

  it('resets the timer when the reset button is clicked', () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.click(getByText('Start'));

    // Advance timers by some time
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(getByText('Reset'));

    // Verify that the timer has reset
    expect(getByText(/00:00.000/)).toBeTruthy();
  });

  it('records and displays laps correctly', () => {
    const { getByText, getAllByRole } = render(<StopWatch />);

    fireEvent.click(getByText('Start'));

    // Record a lap at 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(getByText('Lap'));

    // Record another lap at 3 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(getByText('Lap'));

    // Check that two laps are recorded
    const lapItems = getAllByRole('listitem');
    expect(lapItems.length).toBe(2);

    // Check the recorded lap times
    expect(lapItems[0].textContent).toMatch(/00:01.000/); // First lap
    expect(lapItems[1].textContent).toMatch(/00:03.000/); // Second lap
  });
});
