import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from './StopWatch';
import '@testing-library/jest-dom';

// Setup: Mocking timers for the setInterval used in the StopWatch component
beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

// Test suite for the StopWatch Component
describe('StopWatch Component', () => {
    // Test case for start/stop functionality
    test('should start and stop counting when start/stop button is clicked', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');

        // Start the stopwatch and advance time by 1 second
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        let display = screen.getByText(/0:00:01/);
        expect(display).toBeInTheDocument();

        // Stop the stopwatch and ensure time remains the same
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        display = screen.getByText(/0:00:01/);
        expect(display).toBeInTheDocument();
    });

    // Test case for lap recording functionality
    test('should record lap times correctly', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');
        const lapButton = screen.getByText('Lap');

        // Start the stopwatch, advance time, and record a lap
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        fireEvent.click(lapButton);

        // Verify that lap times are displayed correctly
        const lapTimes = screen.getAllByText(/0:00:05/);
        expect(lapTimes.length).toBe(2);
    });

    // Test case for reset functionality
    test('should reset the time and laps when reset button is clicked', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');
        const resetButton = screen.getByText('Reset');

        // Start the stopwatch, advance time, and then reset
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(resetButton);

        // Verify that the stopwatch resets to zero
        const display = screen.getByText(/0:00:00/);
        expect(display).toBeInTheDocument();
    });

    // Test case for time display format
    test('should display time in the correct format', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByText('Start/Stop');

        // Start the stopwatch and advance time to check format
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(3661000); // 1 hour, 1 minute, and 1 second
        });

        // Verify that time is displayed in the correct format
        const display = screen.getByText(/01:01:01/);
        expect(display).toBeInTheDocument();
    });
});