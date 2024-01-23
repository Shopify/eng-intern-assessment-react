import React from 'react'
import { render, fireEvent, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import StopWatch from '../src/StopWatch';

describe("Stopwatch component", () => {

    // Set up fake times to test timer functionality
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    test("Render the time and buttons", async () => {
        const { getByText, getByTestId } = render(<StopWatch />);
        
        // Time format
        expect(getByText(/00:00:00/)).toBeInTheDocument();

        expect(getByText(/Start/)).toBeInTheDocument();
        expect(getByText(/Reset/)).toBeInTheDocument();
        expect(getByText(/Lap/)).toBeInTheDocument();
    })

    test("Start stopwatch", async () => {
        const { getByText } = render(<StopWatch />);
        const startButton = getByText(/Start/);

        fireEvent.click(startButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
    })

    test("Start and stop stopwatch after 2 seconds", async () => {
        const { getByText } = render(<StopWatch />);
        const startStopButton = getByText(/Start/);

        // Start timer
        fireEvent.click(startStopButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(2 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/00:00:00/)).toBeInTheDocument();
    });

    test("Start and stop stopwatch edge case: seconds to minutes", async () => {
        const { getByText } = render(<StopWatch />);
        const startStopButton = getByText(/Start/);

        // Start timer
        fireEvent.click(startStopButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(59 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/00:00:59/)).toBeInTheDocument();

        // Start timer
        fireEvent.click(startStopButton);

        act(() => {
            jest.advanceTimersByTime(1 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/00:01:00/)).toBeInTheDocument();
    });

    test("Start and stop stopwatch edge case: minutes to hours", async () => {
        const { getByText } = render(<StopWatch />);
        const startStopButton = getByText(/Start/);

        // Start timer
        fireEvent.click(startStopButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(59 * 60 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/00:59:00/)).toBeInTheDocument();

        // Start timer
        fireEvent.click(startStopButton);

        act(() => {
            jest.advanceTimersByTime(1 * 60 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/01:00:00/)).toBeInTheDocument();
    });

    test('Start stopwatch and stop stopwatch edge case: 99 hours to 100 hours', async () => {
        const { getByText } = render(<StopWatch />);
        const startStopButton = getByText(/Start/);
        
        // Start timer
        fireEvent.click(startStopButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(99 * 60 * 60 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/99:00:00/)).toBeInTheDocument();

        // Start timer
        fireEvent.click(startStopButton);

        act(() => {
            jest.advanceTimersByTime(1 * 60 * 60 * 1000);
        })

        // Stop timer
        fireEvent.click(startStopButton);
        expect(getByText(/100:00:00/)).toBeInTheDocument();
    })

    test('Start and reset stopwatch after 2 seconds', async () => {
        const { getByText, getByTestId } = render(<StopWatch />)
        const startButton = getByText(/Start/);
        const resetButton = getByText(/Reset/);
        
        fireEvent.click(startButton);
        expect(getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(2000);
        })

        fireEvent.click(resetButton);
        expect(getByText(/00:00:00/)).toBeInTheDocument();
    })
})
