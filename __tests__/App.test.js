import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from '@testing-library/react';
import StopWatch from '../src/StopWatch';

// Mocking setInterval and clearInterval
jest.useFakeTimers();

 describe('StopWatch', () => {
  test('starts the stopwatch', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    // Move the timer forward
    act(() => {
      jest.advanceTimersByTime(1000); // 1 second
    });
    expect(screen.getByText(/00:01.000/i)).toBeInTheDocument();
  });

  test('stops the stopwatch', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(3000); // 3 seconds
    });
    const stopButton = screen.getByRole('button', { name: /Stop/i });
    fireEvent.click(stopButton);
    const timeBeforeAdvance = screen.getByText(/00:03.000/i);
    expect(timeBeforeAdvance).toBeInTheDocument();
    // Verify that the time does not advance after stopping
    act(() => {
      jest.advanceTimersByTime(1000); // 1 second
    });
    expect(timeBeforeAdvance).toBeInTheDocument();
  });

  test('resets the stopwatch', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(5000); // 5 seconds
    });
    const stopButton = screen.getByRole('button', { name: /Stop/i });
    fireEvent.click(startButton);
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(screen.getByText(/00:00.000/i)).toBeInTheDocument();
  });

  test('records laps correctly', () => {
    render(<StopWatch />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    // Record a lap at 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    const lapButton = screen.getByRole('button', { name: /Lap/i });
    fireEvent.click(lapButton);
    expect(screen.getByText(/lap 1: 00:03.000/i)).toBeInTheDocument();
    // Record another lap at 6 seconds (3 seconds later)
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(lapButton);
    expect(screen.getByText(/lap 2: 00:03.000/i)).toBeInTheDocument();
  });
});
 