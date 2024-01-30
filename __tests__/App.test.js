import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('Stopwatch Application', () => {
    it('displays the initial timer state', () => {
        render(<App/>);
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    it('starts the timer when the start button is clicked', () => {
        jest.useFakeTimers();
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: /start/i }));
        act(() => {
            jest.advanceTimersByTime(1000); // Advance fake timers by 1 second
        });

        // Verify the timer has advanced by checking if the time has changed from the initial state
        expect(screen.getByText(/00:00:01/i)).toBeInTheDocument(); // Replace with the actual time format displayed after 1 second
        jest.useRealTimers();
    });

    it('pauses the timer when the pause button is clicked', () => {
        jest.useFakeTimers();
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: /start/i }));
        act(() => {
            jest.advanceTimersByTime(2000); // Advance fake timers by 2 seconds
        });
        fireEvent.click(screen.getByRole('button', { name: /pause/i }));
        act(() => {
            jest.advanceTimersByTime(1000); // Attempt to advance fake timers by another 1 second
        });

        // Verify the timer is paused by checking if the time has not changed from when we paused it
        expect(screen.getByText(/00:00:02/i)).toBeInTheDocument(); // Replace with the actual time format displayed after pausing
        jest.useRealTimers();
    });

    it('resets the timer when the reset button is clicked', () => {
        jest.useFakeTimers();
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: /start/i }));
        act(() => {
            jest.advanceTimersByTime(3000); // Advance fake timers by 3 seconds
        });
        fireEvent.click(screen.getByRole('button', { name: /pause/i }));
        fireEvent.click(screen.getByRole('button', { name: /reset/i }));

        // Verify the timer has been reset by checking if the time is back to the initial state
        expect(screen.getByText(/00:00:00/i)).toBeInTheDocument(); // Replace with the actual initial time format displayed
        jest.useRealTimers();
    });

    it('records laps', () => {
        jest.useFakeTimers();
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: /start/i }));
        act(() => {
            jest.advanceTimersByTime(1500); // Advance fake timers by 1.5 seconds
        });
        fireEvent.click(screen.getByRole('button', { name: /lap/i }));

        // Verify a lap has been recorded
        // This assumes that laps are listed in a certain element, adjust the query accordingly
        expect(screen.getByTestId("split-time")).toHaveTextContent("00:00:01.50"); // Replace with the actual lap time format displayed
        jest.useRealTimers();
    });
});
