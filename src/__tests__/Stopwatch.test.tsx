import {render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import StopWatch from '../StopWatch'
import React from "react";

describe('<StopWatch/>', () => {

    jest.useFakeTimers();

    test('initial time', () => {
        render(<StopWatch />);
        expect(screen.getByText('00:00:00.000')).toBeInTheDocument();
    });

    test('initial laps is empty', () => {
        render(<StopWatch />);
        const lapElements = screen.queryAllByText(/Lap \d+:/);
        expect(lapElements.length).toBe(0);
    });

    test('four buttons render correctly', () => {
        render(<StopWatch />);

        // Each button's label
        ["Start", "Stop", "Reset", "Lap"].forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        })
    });

    test('handleStart starts the timer', () => {
        render(<StopWatch />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // Advance by 1 sec
        act(() => {jest.advanceTimersByTime(1000); });

        expect(screen.getByText(/00:00:01.*/)).toBeInTheDocument();
    });

    test('handleStop stops the timer', () => {
        render(<StopWatch />);
        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        fireEvent.click(startButton);

        // Advance by 1 sec
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(stopButton);

        const timeAfterStop = screen.getByText(/00:00:01.*/).textContent;

        // Advance by 1 sec
        act(() => {jest.advanceTimersByTime(1000); });

        expect(screen.getByText(timeAfterStop)).toBeInTheDocument();
    });

    test('pausing and resuming', () => {
        render(<StopWatch/>);

        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');

        fireEvent.click(startButton);
        // Advance by 1 sec
        act(() => {jest.advanceTimersByTime(1000); });
        
        // PAUSE!
        fireEvent.click(stopButton);

        // match 00:00:01.XXX 
        const timeAfterStop = screen.getByText(/00:00:01.*/).textContent;

        // Advance time while paused...
        act(() => {jest.advanceTimersByTime(5000); });

        // But the time shouldn't have changed
        expect(screen.getByText(timeAfterStop)).toBeInTheDocument();

        // RESUME!
        fireEvent.click(startButton);
        act(() => {jest.advanceTimersByTime(5000); });
        fireEvent.click(stopButton);

        // match 00:00:06.XXX, after 5 seconds of running after paused at 1 second
        const timeAfterUnpause = screen.getByText(/00:00:06.*/).textContent;

        expect(screen.getByText(timeAfterUnpause)).toBeInTheDocument();
    })

    test('resetting the timer', () => {
        render(<StopWatch/>);

        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        const resetButton = screen.getByText('Reset');

        const timeAfterStop = screen.getByText("00:00:00.000").textContent;
        // Reset button should work both when running, and when paused

        // Click while it's running
        fireEvent.click(startButton);
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(resetButton);
        act(() => {jest.advanceTimersByTime(1000); });

        expect(screen.getByText(timeAfterStop)).toBeInTheDocument();

        // Click while it's paused
        fireEvent.click(startButton);
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(stopButton);
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(resetButton);
        act(() => {jest.advanceTimersByTime(1000); });
        expect(screen.getByText(timeAfterStop)).toBeInTheDocument();
    })

    test('creates and displays laps correctly', () => {
        render(<StopWatch />);

        const startButton = screen.getByText('Start');
        const lapButton = screen.getByText('Lap');

        fireEvent.click(startButton);

        act(() => {jest.advanceTimersByTime(1000); });

        fireEvent.click(lapButton);

        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(lapButton);

        // There should be two lap elements after pressing lap twice.
        const lapElements = screen.getAllByText(/Lap \d+:/);
        expect(lapElements.length).toBe(2);

        // Correct numbering...
        expect(lapElements[0]).toHaveTextContent('Lap 1:');
        expect(lapElements[1]).toHaveTextContent('Lap 2:');
    });

    test('resets laps correctly', () => {
        render(<StopWatch />);

        const resetButton = screen.getByText('Reset');
        const startButton = screen.getByText('Start');
        const lapButton = screen.getByText('Lap');

        fireEvent.click(startButton);

        act(() => {jest.advanceTimersByTime(5000); });

        // Press lap button thrice
        fireEvent.click(lapButton);
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(lapButton);
        act(() => {jest.advanceTimersByTime(1000); });
        fireEvent.click(lapButton);
        act(() => {jest.advanceTimersByTime(1000); });

        fireEvent.click(resetButton);

        // After resetting, laps should be cleared.
        const lapElements = screen.queryAllByText(/Lap \d+:/);
        expect(lapElements.length).toBe(0);
    });
});
