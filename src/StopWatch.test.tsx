import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatch, { formattedTime } from './StopWatch';

// Test the formatTime function
describe('formatTime', () => {
  test('formats time correctly', () => {
    expect(formattedTime(0)).toBe('00:00:00');
    expect(formattedTime(6000)).toBe('01:00:00');
    expect(formattedTime(1234)).toBe('00:12:34');
  });
});

test('renders correctly', () => {
  const { getByText } = render(<StopWatch />);
  const stopwatchElement = getByText('StopWatch');
  expect(stopwatchElement).not.toBeNull();
});

// Use fake timers for timer-related tests
jest.useFakeTimers();

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
  jest.useRealTimers();
});

afterEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
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