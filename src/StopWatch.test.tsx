import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopWatch from './StopWatch';

// Use fake timers for timer-related tests
jest.useFakeTimers();

describe('StopWatch component', () => {
  test('renders without errors', () => {
    render(<StopWatch />);
    expect(screen.getByText('StopWatch')).toBeVisible();
  });

  test('starts the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to wait for the timer
    expect(screen.getByText('00:00:00.100')).toBeVisible();
  });

  test('stops the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    await waitFor(() => expect(screen.getByText('00:00:00.100')).toBeVisible());
  });

  test('resets the stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Reset'));
    await waitFor(() => expect(screen.getByText('00:00:00.000')).toBeVisible());
  });

  test('records a lap', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    await waitFor(() => expect(screen.getByText('Lap 1: 00:00:00.100')).toBeVisible());
  });

  test('records multiple laps', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to wait for the timer
    fireEvent.click(screen.getByText('Lap'));
    await waitFor(() => expect(screen.getByText('Lap 2: 00:00:00.200')).toBeVisible());
  });

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

afterEach(() => {
  jest.useRealTimers();
});
