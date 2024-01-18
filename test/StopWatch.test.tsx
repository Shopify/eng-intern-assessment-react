import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import App from '../src/App';

describe('Stopwatch App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });


  test('Testing the speed of counting for the stopwatch', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Simulates 1 second passing on the stopwatch
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const stopwatchElement = screen.getByText(/00:00:01/i);

    expect(stopwatchElement).not.toBeNull();
  });


  test('Testing the stopping feature of the stopwatch', async () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');

    fireEvent.click(startButton);

    jest.advanceTimersByTime(1000);

    fireEvent.click(stopButton);

    await waitFor(() => {
        const stopwatchElement = screen.getByText(/00:00:01/i);
        expect(stopwatchElement).not.toBeNull();
    });
  }, 10000);


  test('Tesing stopping the stopwatch and starting it up again', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(stopButton);

    const prevElapsedTime = screen.getByText(/00:00:01/i);

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const currentElapsedTime = screen.getByText(/00:00:02/i);
    expect(prevElapsedTime).toEqual(currentElapsedTime);
  });


  test('Testing the lap feature on the stopwatch', () => {
    render(<App />);
    const lapButton = screen.getByText('Lap');
    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(lapButton);

    const lapElement = screen.getByText(/Lap: 00:00:01/i);
    expect(lapElement).not.toBeNull();
  });


  test('Testing the reset feature on the stopwatch', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');
    const lapButton = screen.getByText('Lap');

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(lapButton);
    fireEvent.click(resetButton);

    const stopwatchElement = screen.getByText(/00:00:00/i);
    const lapElement = screen.queryByText(/Lap: 00:00:01/i);
    expect(stopwatchElement).not.toBeNull();
    expect(lapElement).toBeNull();
  });
});