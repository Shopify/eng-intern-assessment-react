import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import StopWatch from './StopWatch';

jest.useFakeTimers();

describe('StopWatch', () => {
    test('starts and stops correctly', () => {
        const { getByText } = render(<StopWatch />);
        const startButton = getByText('Start');

        // Start the stopwatch
        fireEvent.click(startButton);
        expect(getByText('Stop')).toBeTruthy();

        // Advance the timer by 1 second (1000 milliseconds)
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const stopButton = getByText('Stop');
        // Stop the stopwatch
        fireEvent.click(stopButton);
        expect(getByText('Start')).toBeTruthy();
    });

    test('resets correctly', () => {
        const { getByText } = render(<StopWatch />);
        const startButton = getByText('Start');
        const resetButton = getByText('Reset');

        // Start the stopwatch
        fireEvent.click(startButton);

        // Advance the timer by 1 second (1000 milliseconds)
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Reset the stopwatch
        fireEvent.click(resetButton);
        expect(getByText('00:00:00:00')).toBeTruthy();
    });

    test('records laps correctly', () => {
        const { getByText, getAllByText } = render(<StopWatch />);
        const startButton = getByText('Start');
        // Start the stopwatch
        fireEvent.click(startButton);

        const lapButton = getByText('Lap');
        // Record a lap
        fireEvent.click(lapButton);
        let laps = getAllByText(/Lap 1/i);
        expect(laps.length).toBeGreaterThan(0);

        // Record another lap
        fireEvent.click(lapButton);
        laps = getAllByText(/Lap 2/i);
        expect(laps.length).toBeGreaterThan(0);
    });
});