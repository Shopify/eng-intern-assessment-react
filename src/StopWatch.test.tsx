import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Stopwatch from './StopWatch'; 

// Mocking the utility functions
jest.useFakeTimers();
jest.spyOn(window, 'setInterval');
jest.spyOn(window, 'clearInterval');

describe('Stopwatch component', () => {
  it('renders without crashing', () => {
    render(<Stopwatch />);
  });

  it('starts the stopwatch when start button is clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
  
    // Advance timers to trigger setInterval
    jest.advanceTimersByTime(1000);
  
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('stops the stopwatch when stop button is clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    const stopButton = getByText('Stop');

    fireEvent.click(startButton);

    fireEvent.click(stopButton);

    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('resets the stopwatch when reset button is clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    const resetButton = getByText('Reset');

    fireEvent.click(startButton);

    jest.advanceTimersByTime(5000);

    fireEvent.click(resetButton);

    expect(document.querySelector('.time-text')?.textContent).toBe('0 : 0 : 0');
  });

  it('adds lap when lap button is clicked', async () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    const lapButton = getByText('Lap');

    fireEvent.click(startButton);

    jest.advanceTimersByTime(5000);

    fireEvent.click(lapButton);

    await waitFor(() => {
      expect(document.querySelector('.lap-item')).toBeTruthy();
    });
  });
});
