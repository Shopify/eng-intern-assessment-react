import React from "react";
import { render, fireEvent, screen, act, cleanup } from "@testing-library/react";
import App from "../../src/App";
import { assert } from "console";

// Declare HTML elements
let startStopButton: HTMLElement | null;
let resetButton: HTMLElement | null;
let lapButton: HTMLElement | null;
let timeDisplay: HTMLElement | null;

// Mocking timers using jest fake timers
jest.useFakeTimers();

describe("Stopwatch", () => {
    // Arrange: mount the component
    beforeEach(() => {
        render(<App/>);
        startStopButton = screen.getByTestId('start-stop-btn')
        resetButton = screen.getByTestId('reset-btn')
        lapButton = screen.getByTestId('lap-btn')
        timeDisplay = screen.getByTestId('time-display')
    })

    // TEST: The stopwatch renders initial state correctly
    it("renders initial state correctly", () => {
        // Assert: Buttons are 'Start' & 'Reset' and displayed time is '00:00:00.00'
        expect(startStopButton.textContent).toBe('Start')
        expect(lapButton).toHaveProperty('disabled', true)
        expect(timeDisplay.textContent).toBe('00:00:00.00')
    })

    // TEST: The stopwatch should start counting when the user clicks the start button.
    it("should start counting when the user clicks the start button", () => {
        // Act: Simulate clicking the start button and advance time by 1000ms (1s)
        fireEvent.click(startStopButton);
        act(() =>  jest.advanceTimersByTime(1000));

        // Assert: Time should update to 00:00:01.00
        expect(timeDisplay.textContent).toBe("00:00:01.00")
    })

    // TEST: The stopwatch should stop counting when the user clicks the stop button.
    it("should stop counting when the user clicks the stop button", () => {
        // Act: Simulate clicking the start button and advance time by 1500ms (1.5s)
        //      Then simulate clicking the stop button and advance time by 1000ms (1s)
        fireEvent.click(startStopButton);
        act(() =>  jest.advanceTimersByTime(1500));
        fireEvent.click(startStopButton);
        act(() =>  jest.advanceTimersByTime(1000));

        // Assert: Time should update to 00:00:01.50
        expect(timeDisplay.textContent).toBe("00:00:01.50")
    })

    // TEST: The lap button should not do anything if the stopwatch is not running.
    it("should not record a new lap when the stopwatch is not running", () => {
    })

    // TEST: The stopwatch should record and display laps when user clicks the lap button.
    it("should record and display laps when user clicks the lap button, in the format 'Lap #<lapNum> - <formattedTimeFromLastLap>'", () => {
    })

    // TEST: The stopwatch should reset to zero and clear the lap list when the user clicks the reset button.
    it("should reset to zero and clear the lap list when the user clicks the reset button.", () => {
    })

})
