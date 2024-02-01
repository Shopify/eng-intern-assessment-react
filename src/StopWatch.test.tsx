import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopWatch from './StopWatch';

// Use fake timers for timer-related tests
jest.useFakeTimers();

// Test for the StopWatch component
describe('StopWatch component', () => {
  // Test case to check if the component renders without errors
  test('renders without errors', () => {
    render(<StopWatch />);
    expect(screen.getByText('StopWatch')).toBeVisible();
  });

  // Test case to check if the stopwatch starts and updates the time
  test('starts the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to wait for the timer
    expect(screen.getByText('00:00:00.100')).toBeVisible();
  });

  // Test case to check if the stopwatch stops and updates the time
  test('stops the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    await waitFor(() => expect(screen.getByText('00:00:00.100')).toBeVisible());
  });

  // Test case to check if the stopwatch resets to zero
  test('resets the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Reset'));
    await waitFor(() => expect(screen.getByText('00:00:00.000')).toBeVisible());
  });

  // Test case to check if the stopwatch records a lap time
  test('records a lap', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    await waitFor(() => expect(screen.getByText('Lap 1: 00:00:00.100')).toBeVisible());
  });

  // Test case to check if the stopwatch records multiple lap times
  test('records multiple laps', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to wait for the timer
    fireEvent.click(screen.getByText('Lap'));
    await waitFor(() => expect(screen.getByText('Lap 2: 00:00:00.200')).toBeVisible());
  });

  // Test case to check if the stopwatch stops, resets, and updates after recording laps
  test('stops and resets after recording laps', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to wait for the timer
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Stop'));
    await waitFor(() => expect(screen.getByText('00:00:00.200')).toBeVisible());
    fireEvent.click(screen.getByText('Reset'));
    await waitFor(() => expect(screen.getByText('00:00:00.000')).toBeVisible());
  });

});

// Cleanup after each test by restoring real timers
afterEach(() => {
  jest.useRealTimers();
});
