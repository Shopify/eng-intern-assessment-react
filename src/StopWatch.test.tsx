import React from 'react';
import StopWatch, { formatTime } from './StopWatch';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Stopwatch Tests', () => {
  test('formats time less than an hour correctly', () => {
    expect(formatTime(5900)).toBe('0:00:59:00');
    expect(formatTime(6000)).toBe('0:01:00:00');
    expect(formatTime(359900)).toBe('0:59:59:00');
  });

  test('formats time greater than an hour correctly', () => {
    expect(formatTime(360000)).toBe('1:00:00:00');
    expect(formatTime(366100)).toBe('1:01:01:00');
  });

  test('renders with initial state correctly', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: 'Start' });
    const lapButton = screen.getByRole('button', { name: 'Lap' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    expect(screen.getByText('0:00:00:00')).toBeTruthy();
    expect(startButton).toBeTruthy();
    expect(lapButton).toHaveAttribute('disabled');
    expect(resetButton).toBeTruthy();
  });

  test('starts and stops the timer', () => {
    const { getByRole } = render(<StopWatch />);
    const startStopButton = getByRole('button', { name: 'Start' });
    fireEvent.click(startStopButton);
    expect(startStopButton.textContent).toBe('Stop');

    jest.advanceTimersByTime(1000);

    fireEvent.click(startStopButton);
    expect(startStopButton.textContent).toBe('Start');
  });

  test('resets the stopwatch', () => {
    const { getByText, getByRole, queryByText } = render(<StopWatch />);
    const startButton = getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    jest.advanceTimersByTime(1000);
    const resetButton = getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    expect(getByText('0:00:00:00')).toBeTruthy();
    expect(queryByText('Lap 1:')).toBeNull();
  });

  test('lap button is disabled when stopwatch is not running', () => {
    const { getByRole } = render(<StopWatch />);
    const lapButton = getByRole('button', { name: 'Lap' });
    expect(lapButton).toHaveAttribute('disabled');
  });


});
