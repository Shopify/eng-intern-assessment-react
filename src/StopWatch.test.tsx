import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatch, { formatTime } from './StopWatch';
import { maxLaps } from './StopWatchButton';
import { act, waitFor } from '@testing-library/react';

// Test the formatTime function
describe('formatTime', () => {
  test('formats time less than an hour correctly', () => {
    expect(formatTime(5900)).toBe('00:59:00');
    expect(formatTime(6000)).toBe('01:00:00');
    expect(formatTime(359900)).toBe('59:59:00');
  });

  test('formats time greater than an hour correctly', () => {
    expect(formatTime(360000)).toBe('01:00:00:00');
    expect(formatTime(366100)).toBe('01:01:01:00');
  });
});

test('renders correctly', () => {
  const { getByText } = render(<StopWatch />);
  const stopwatchElement = getByText('StopWatch');
  expect(stopwatchElement).not.toBeNull();
});

test('starts timer when start button is clicked', () => {
  const setIntervalSpy = jest.spyOn(global, 'setInterval');
  render(<StopWatch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton);
  jest.advanceTimersByTime(1000);
  expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
});

test('stops timer when stop button is clicked', () => {
  const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
  const setIntervalSpy = jest.spyOn(global, 'setInterval');
  setIntervalSpy.mockImplementation(() => 123 as unknown as NodeJS.Timeout);
  render(<StopWatch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton);
  jest.advanceTimersByTime(1000);
  const stopButton = screen.getByRole('button', { name: /stop/i });
  fireEvent.click(stopButton);
  expect(clearIntervalSpy).toHaveBeenCalledWith(123);
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test('resets timer when reset button is clicked', () => {
  const { getByRole, getByText } = render(<StopWatch />);
  const startButton = getByRole('button', { name: /start/i });
  fireEvent.click(startButton);
  jest.advanceTimersByTime(1000);
  const resetButton = getByRole('button', { name: /reset/i });
  fireEvent.click(resetButton);
  expect(getByText('00:00:00')).not.toBeNull();
});

// Test for handling the maximum number of laps
test('does not exceed the maximum number of laps', () => {
  render(<StopWatch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton);

  const lapButton = screen.getByRole('button', { name: /lap/i });
  for (let i = 0; i < maxLaps + 1; i++) {
    fireEvent.click(lapButton);
  }

  const lapTimes = screen.queryAllByRole('listitem');
  expect(lapTimes.length).toBe(maxLaps);
});


describe('Testing Stopwatch lap funcstionality', () => {
  test('records laps correctly when lap button is clicked', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);
  
    const lapButton = screen.getByRole('button', { name: /lap/i });
    fireEvent.click(lapButton);
    fireEvent.click(lapButton);
  
    const lapTimes = screen.getAllByRole('listitem');
    expect(lapTimes.length).toBe(2);
  });
  
  test('does not record laps when stopwatch is not running', () => {
    render(<StopWatch />);
    const lapButton = screen.getByRole('button', { name: /lap/i });
    fireEvent.click(lapButton);
  
    const lapTimes = screen.queryAllByRole('listitem');
    expect(lapTimes.length).toBe(0);
  });
  
  test('lists laps in correct order and count', async () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /start/i });
    const lapButton = screen.getByRole('button', { name: /lap/i });
  
    act(() => {
      fireEvent.click(startButton);
    });
  
    for (let i = 1; i <= 3; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Advance 1 second
      });
      act(() => {
        fireEvent.click(lapButton);
      });
    }
  
    await waitFor(() => {
      const lapTimes = screen.getAllByRole('listitem');
      expect(lapTimes.length).toBe(3);
      expect(lapTimes[0].textContent).toBe('1. 00:01:00');
      expect(lapTimes[1].textContent).toBe('2. 00:02:00');
      expect(lapTimes[2].textContent).toBe('3. 00:03:00');
    });
  });  
});

test('handles repeated start and stop actions correctly', () => {
  render(<StopWatch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  const stopButton = screen.getByRole('button', { name: /stop/i });

  // Start and stop the stopwatch multiple times
  fireEvent.click(startButton);
  fireEvent.click(stopButton);
  fireEvent.click(startButton);
  fireEvent.click(stopButton);

  // Check the displayed time after some delay
  const displayedTimeBeforeDelay = screen.getByText('00:00:00').textContent;
  jest.advanceTimersByTime(500);
  const displayedTimeAfterDelay = screen.getByText('00:00:00').textContent;

  // Verify the timer has not advanced
  expect(displayedTimeBeforeDelay).toEqual(displayedTimeAfterDelay);
});