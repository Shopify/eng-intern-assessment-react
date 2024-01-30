/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';

// Allows the use of timers without stalling the tests
jest.useFakeTimers();

describe('button functionality tests', () => {
    it('should change time after button press', () => {
        render(<App />)
        const stopwatchElement = screen.getByTestId("time-display");
        const startBtnElement = screen.getByRole('button', { name: "Start" });

        fireEvent.click(startBtnElement);
        jest.advanceTimersByTime(1000);
        expect(stopwatchElement.innerHTML).not.toBe("00:00.000");
    });

    it('should stop time after button press', () => {
        render(<App />)
        const stopwatchElement = screen.getByTestId("time-display");
        const startBtnElement = screen.getByRole('button', { name: "Start" });

        fireEvent.click(startBtnElement);
        jest.advanceTimersByTime(1000);
        expect(stopwatchElement.innerHTML).not.toBe("00:00.000");
        // checks if time from 1 second ago remained the same
        let time = stopwatchElement.innerHTML;
        fireEvent.click(startBtnElement);
        jest.advanceTimersByTime(1000);
        expect(stopwatchElement.innerHTML).toBe(time);
    });

    it('should display correct text inside the button after toggling', () => {
        render(<App />)
        const toggleBtnElement = screen.getByRole('button', { name: "Start" });

        fireEvent.click(toggleBtnElement);
        expect(toggleBtnElement.innerHTML).toBe("Stop");
        fireEvent.click(toggleBtnElement);
        expect(toggleBtnElement.innerHTML).toBe("Start");
    });

    it('should show 2 lap components after 2 button press', () => {
        render(<App />)
        const lapBtnElement = screen.getByRole('button', { name: "Lap" });
        fireEvent.click(lapBtnElement);
        fireEvent.click(lapBtnElement);
        const lapsElement = screen.getAllByTestId("lap-items");
        expect(lapsElement.length).toBe(2);
    });

    it('should reset everything after button press', () => {
        render(<App />)
        const stopwatchElement = screen.getByTestId("time-display");
        const startBtnElement = screen.getByRole('button', { name: "Start" });
        const resetBtnElement = screen.getByRole('button', { name: "Reset" });
        const lapBtnElement = screen.getByRole('button', { name: "Lap" });
        // Starts stopwatch, wait 1s and check stopwatch changed, add lap and click reset
        fireEvent.click(startBtnElement);
        jest.advanceTimersByTime(1000);
        expect(stopwatchElement.innerHTML).not.toBe("00:00.000");
        fireEvent.click(lapBtnElement);
        fireEvent.click(resetBtnElement);
        const lapsElement = screen.queryAllByTestId("lap-items");
        // checks if time successfully reset, button says Start and no Laps are showing
        expect(stopwatchElement.innerHTML).toBe("00:00.000");
        expect(startBtnElement.innerHTML).toBe("Start");
        expect(lapsElement.length).toEqual(0);
    });
})

// Checks if lap implementation works
it('should show a 00:01.000 lap and a 00:00:000 lap', () => {
    render(<App />)
    const startBtnElement = screen.getByRole('button', { name: "Start" });
    const lapBtnElement = screen.getByRole('button', { name: "Lap" });
    fireEvent.click(startBtnElement);
    jest.advanceTimersByTime(1000);
    fireEvent.click(startBtnElement);
    fireEvent.click(lapBtnElement);
    fireEvent.click(lapBtnElement);
    // First lap happens at 1 second, second lap happens immediately after
    const lapsElement = screen.getAllByTestId("lap-items");
    expect(lapsElement[0].innerHTML).toBe("Lap 1   00:01.000");
    expect(lapsElement[1].innerHTML).toBe("Lap 2   00:00.000");
});
