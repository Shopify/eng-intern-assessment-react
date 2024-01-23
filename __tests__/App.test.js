import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../src/App";
import FakeTimers from "@sinonjs/fake-timers";

let clock;
beforeEach(() => {
    clock = FakeTimers.install();
    render(<App />);
});

afterEach(() => {
    clock = clock.uninstall();
    jest.clearAllMocks();
});

describe('StopWatch', () => {
    test("should initially display the timer at zero", () => {
        expect(screen.getByText("00:00:00:00"));
    });

    test("should start the timer and display updated time when Start is clicked", () => {
        fireEvent.click(screen.getByText("Start"));
        expect(screen.getByText("Stop")).toBeTruthy();
        expect(screen.getByText("Lap")).toBeTruthy();
        act(() => {
            clock.tick(1000)
        });
        expect(screen.getByText("00:00:01:00")).toBeTruthy();
    });

    test("should stop the timer at the current time when Stop is clicked", ()=> {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(5000)
        });
        fireEvent.click(screen.getByText("Stop"));
        expect(screen.getByText("Start")).toBeTruthy();
        expect(screen.getByText("Reset")).toBeTruthy();
        expect(screen.getByText("00:00:05:00")).toBeTruthy();
    });

    test("should resume the timer from the stopped time when Start is clicked after Stop", ()=> {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(3000)
        });
        fireEvent.click(screen.getByText("Stop"));
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(3000)
        });
        fireEvent.click(screen.getByText("Stop"));
        expect(screen.getByText("00:00:06:00")).toBeTruthy();
    });

    test("should record and display lap times correctly when Lap is clicked", ()=> {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(3000)
        });
        fireEvent.click(screen.getByText("Lap"));
        expect(screen.getByText("Lap 1: 00:00:03:00")).toBeTruthy();
        act(() => {
            clock.tick(1000)
        });
        fireEvent.click(screen.getByText("Lap"));
        expect(screen.getByText("Lap 2: 00:00:01:00")).toBeTruthy();
    });

    test('should display the time in the correct format for hours, minutes, seconds, and millisecondst', () => {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(3661000)
        });
        expect(screen.getByText("01:01:01:00")).toBeTruthy();
    });

    test("should reset the timer to zero and remove all laps when Reset is clicked", () => {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(1000);
        });
        fireEvent.click(screen.getByText("Lap"));
        act(() => {
            clock.tick(2000);
        });
        fireEvent.click(screen.getByText("Lap"));
        fireEvent.click(screen.getByText("Stop"));
        fireEvent.click(screen.getByText("Reset"));
        // Check if the timer is reset to zero
        expect(screen.getByText("00:00:00:00")).toBeTruthy();
        // Check if the laps are removed
        expect(screen.queryByText("Lap 1: 00:00:01:00")).toBeNull();
        expect(screen.queryByText("Lap 2: 00:00:02:00")).toBeNull();
    });


});