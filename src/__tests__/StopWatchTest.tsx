import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from '../StopWatch';

beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
});

test('Renders StopWatch component', async () => {
    // ARRANGE
    render(<StopWatch />);

    // ACT
    const stopwatchElement = screen.getByText(/00:00:00.000/i);

    // ASSERT
    expect(stopwatchElement);
});

test('Starts the stopwatch', async () => {
    // ARRANGE
    render(<StopWatch />);
    const startButton = screen.getByText(/Start/i)
    const advanceTimer = () => {
        act(() => {
            jest.advanceTimersByTime(500); // Simulate 0.5 second
        });
    }

    // ACT
    fireEvent.click(startButton);
    advanceTimer()

    // ASSERT
    expect(screen.getByText(/00:00:00.500/i));
});

test('Stops the stopwatch', async () => {
    // ARRANGE
    render(<StopWatch />);
    const startButton = screen.getByText(/Start/i)
    const advanceTimer = () => {
        act(() => {
            jest.advanceTimersByTime(500); // Simulate 0.5 second
        });
    }

    // ACT
    fireEvent.click(startButton);
    advanceTimer()
    const stopButton = screen.getByText(/Stop/i)
    fireEvent.click(stopButton);

    // ASSERT
    expect(screen.getByText(/00:00:00.500/i));
});

test('Resets the stopwatch', async () => {
   // ARRANGE
    render(<StopWatch />);
    const startButton = screen.getByText(/Start/i)
    const resetButton = screen.getByText(/Reset/i)
    const advanceTimer = () => {
        act(() => {
            jest.advanceTimersByTime(500); // Simulate 0.5 second
        });
    }

    // ACT
    fireEvent.click(startButton);
    advanceTimer()
    const stopButton = screen.getByText(/Stop/i)
    fireEvent.click(stopButton);
    expect(screen.getByText(/00:00:00.500/i));
    fireEvent.click(resetButton);

    // ASSERT
    expect(screen.getByText(/00:00:00.000/i));
});

test('records laps', async () => {
    // ARRANGE
    render(<StopWatch />);
    const startButton = screen.getByText(/Start/i)
    const lapButton = screen.getByText(/Lap/i)
    const advanceTimer = () => {
        act(() => {
            jest.advanceTimersByTime(500); // Simulate 0.5 second
        });
    }

    // ACT
    fireEvent.click(startButton);
    advanceTimer()
    fireEvent.click(lapButton);
    advanceTimer()
    fireEvent.click(lapButton);
    advanceTimer()
    fireEvent.click(lapButton);
    advanceTimer() // Final advanceTimer()  is required to prevent duplicate display of "00:00:02.000" for timer and lap which causes test to fail

    // ASSERT
    expect(screen.getByText(/00:00:00.500/i)); // Lap 1
    expect(screen.getByText(/00:00:01.500/i)); // Lap 2
    expect(screen.getByText(/00:00:02.000/i)); // Lap 3
});
