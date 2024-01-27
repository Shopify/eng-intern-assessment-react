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
        // Assert: Buttons are 'Start' & 'Reset', displayed time is '00:00:00.00' and lap list is empty
        expect(startStopButton.textContent).toBe('Start')
        expect(lapButton).toHaveProperty('disabled', true)
        expect(timeDisplay.textContent).toBe('00:00:00.00')
        expect(document.body.innerHTML).not.toContain("Lap #");

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

    // TEST: The stopwatch should record and display laps when user clicks the lap button.
    it("should record and display laps when user clicks the lap button, in the format 'Lap #<lapNum> - <formattedTimeFromLastLap>'", () => {
        // Act: Simulate clicking the start button and advancing the time by 1000ms (1s)
        //      then simulate clicking the lap button
        fireEvent.click(startStopButton);
        act(() =>  jest.advanceTimersByTime(1000));
        fireEvent.click(lapButton);

        // Assert: Laps list should display "Lap #1 - 00:00:01.00"
        expect(document.body.innerHTML).toContain("Lap #");
        expect(screen.getByText("Lap #1 - 00:00:01.00")).toBeDefined();

        // Act: Advance the time by 1300ms (1.3s) and simulate clicking the lap button
        act(() =>  jest.advanceTimersByTime(1300));
        fireEvent.click(lapButton);

        // Assert: Laps list should display "Lap #1 - 00:00:01.00", "Lap #2 - 00:00:01.30"
        expect(screen.getByText("Lap #1 - 00:00:01.00")).toBeDefined();
        expect(screen.getByText("Lap #2 - 00:00:01.30")).toBeDefined();
    })

    // TEST: The stopwatch should reset to zero and clear the lap list when the user clicks the reset button.
    it("should reset to zero and clear the lap list when the user clicks the reset button.", () => {
        // Act: Simulate clicking the start button and advancing the time by 1000ms (1s)
        //      then simulate clicking the lap button
        //      then simulate clicking the reset button
        fireEvent.click(startStopButton);
        act(() =>  jest.advanceTimersByTime(1000));
        fireEvent.click(lapButton);
        fireEvent.click(resetButton);

        // Assert: Laps list should be empty, time displayed should be 00:00:00.00, Start/Stop button should be 'Start', and Lap button to be disabled
        expect(document.body.innerHTML).not.toContain("Lap #");
        expect(startStopButton.textContent).toBe('Start');
        expect(lapButton).toHaveProperty('disabled', true);
        expect(timeDisplay.textContent).toBe('00:00:00.00');
    })

})
