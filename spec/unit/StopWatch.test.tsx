import React from "react";
import { render, screen } from "@testing-library/react";
import StopWatch from "../../src/StopWatch";

// TEST: The stopwatch displays the correct time according to the time prop, in milliseconds.
describe("The stopwatch displays the correct corresponding time elapsed from milliseconds to HH:MM:SS.CS", () => {

    let timeDisplayed: HTMLElement | null;
    
    it("Shows an initial time of 00:00:00.00", () => {
        render(<StopWatch timeElapsed={0} />);
        const timeDisplay = screen.getByTestId('time-display')
        expect(timeDisplay.textContent).toBe('00:00:00.00')
    })

    it("Shows 00:00:00.01 when time is 10ms", () => {
        render(<StopWatch timeElapsed={10} />);
        const timeDisplay = screen.getByTestId('time-display')
        expect(timeDisplay.textContent).toBe('00:00:00.01')
    })

    it("Shows 00:00:01.00 when time is 1000ms", () => {
        render(<StopWatch timeElapsed={1000} />);
        const timeDisplay = screen.getByTestId('time-display')
        expect(timeDisplay.textContent).toBe('00:00:01.00')
    })

    it("Shows 00:01:00.00 when time is 60000ms", () => {
        render(<StopWatch timeElapsed={60000} />);
        const timeDisplay = screen.getByTestId('time-display')
        expect(timeDisplay.textContent).toBe('00:01:00.00')
    })

    it("Shows 01:00:00.00 when time is 3600000ms", () => {
        render(<StopWatch timeElapsed={3600000} />);
        const timeDisplay = screen.getByTestId('time-display')
        expect(timeDisplay.textContent).toBe('01:00:00.00')
    })
})