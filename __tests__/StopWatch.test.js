import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import StopWatch from '../src/StopWatch.tsx';


describe('StopWatch', () => {
    jest.useFakeTimers();

    // Test initial state
    test('initial state', () => {
        const { getByText } = render(<StopWatch />);
        expect(getByText('00:00:00:00')).toBeInTheDocument();
    });

    // Test start and stop functionality
    test('start and stop stopwatch', () => {
        const { getByText } = render(<StopWatch />);
        const startButton = getByText('Start');
        const stopButton = getByText('Stop');

        // Start the stopwatch
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000); // Advance time by 1 second
        });
        expect(getByText('00:00:01:00')).toBeInTheDocument();

        // Stop the stopwatch
        fireEvent.click(stopButton);
        act(() => {
            jest.advanceTimersByTime(1000); // Advance time by another second
        });
       
        // Verify that the time has not changed
        expect(getByText('00:00:01:00')).toBeInTheDocument();
    });

    // Test reset functionality
    test('reset stopwatch', () => {
        const { getByText } = render(<StopWatch />);
        const startButton = getByText('Start');
        const resetButton = getByText('Reset');

        // Start and then reset the stopwatch
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000); // Advance time by 1 second
        });
        fireEvent.click(resetButton);

        // Verify that the time is reset to 0
        expect(getByText('00:00:00:00')).toBeInTheDocument();
    });

    // Test lap functionality
    test('lap functionality', () => {
        const { getByText, getAllByText } = render(<StopWatch />);
        const startButton = getByText('Start');
        const lapButton = getByText('Lap');

        // Start the stopwatch and add two laps
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000); // Advance time by 1 second
        });
        fireEvent.click(lapButton);

        // Verify that the lap is recorded
        const laps = getAllByText(/Lap/);
        expect(laps.length).toBe(1);
    });

    // Restore timers to their real implementations
    afterAll(() => {
        jest.useRealTimers();
    });
});
