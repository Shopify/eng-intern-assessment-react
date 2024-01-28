import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import StopWatchButton from "../../src/StopWatchButton";

// Mock implementation of functions
const mockHandleStart = jest.fn();
const mockHandleStop = jest.fn();
const mockHandleReset = jest.fn();
const mockHandleLap = jest.fn();


// TEST: When the stopwatch is NOT running, the buttons are Start, Reset and Lap (disabled)
describe("When the stopwatch is NOT running, the buttons are Start, Reset and Lap (disabled)", () => {
    
    let startStopButton: HTMLElement | null;
    let resetButton: HTMLElement | null;
    let lapButton: HTMLElement | null;

    // Arrange: mount the component before each test & reset all mocks after each test
    beforeEach(() => {
        render(
            <StopWatchButton
                handleStart={mockHandleStart}
                handleStop={mockHandleStop}
                handleReset={mockHandleReset}
                handleLap={mockHandleLap}
                isRunning={false}
            />
        );
        startStopButton = screen.getByTestId('start-stop-btn')
        resetButton = screen.getByTestId('reset-btn')
        lapButton = screen.getByTestId('lap-btn')
    })
    afterEach(() => {
        jest.clearAllMocks(); 
    });


    // Act & Assert: Start button says 'Start' and calls handleStart onClick    
    it("Shows a Start button", () => {
        expect(startStopButton.textContent).toBe('Start')
    })
    it("onClick, it calls the handleStart function", () => {
        // Simulate clicking the Start button
        fireEvent.click(startStopButton);
        expect(mockHandleStart).toHaveBeenCalledTimes(1);
    })

    // Act & Assert: Reset button says 'Reset' and calls handleReset onClick    
    it("Shows a Reset button", () => {
        expect(resetButton.textContent).toBe('Reset')
    })

    it("onClick, it calls the handleReset function", () => {
        // Simulate clicking the reset button
        fireEvent.click(resetButton);
        expect(mockHandleReset).toHaveBeenCalledTimes(1);
    })

    // Act & Assert: Lap button says 'Lap' and is disabled 
    it("Shows a Lap button", () => {
        expect(lapButton.textContent).toBe('Lap')
    })

    it("Lap button is disabled and cannot call handleLap", () => {
        expect(lapButton).toHaveProperty('disabled', true);
        // Simulate clicking the lap button
        fireEvent.click(lapButton);
        expect(mockHandleLap).toHaveBeenCalledTimes(0);
    })
})

// TEST: When the stopwatch IS running, the buttons are Stop, Reset and Lap (enabled)
describe("When the stopwatch IS running, the buttons are Stop, Reset and Lap (enabled)", () => {
    
    let startStopButton: HTMLElement | null;
    let resetButton: HTMLElement | null;
    let lapButton: HTMLElement | null;

    // Arrange: mount the component before each test & reset all mocks after each test
    beforeEach(() => {
        render(
            <StopWatchButton
                handleStart={mockHandleStart}
                handleStop={mockHandleStop}
                handleReset={mockHandleReset}
                handleLap={mockHandleLap}
                isRunning={true}
            />
        );
        startStopButton = screen.getByTestId('start-stop-btn')
        resetButton = screen.getByTestId('reset-btn')
        lapButton = screen.getByTestId('lap-btn')
    })
    afterEach(() => {
        jest.clearAllMocks(); // Reset all mocks after each test
    });


    // Act & Assert: Stop button says 'Stop' and calls handleStop onClick    
    it("Shows a Stop button", () => {
        expect(startStopButton.textContent).toBe('Stop')
    })
    it("onClick, it calls the handleStop function", () => {
        // Simulate clicking the Stop button
        fireEvent.click(startStopButton);
        expect(mockHandleStop).toHaveBeenCalledTimes(1);
    })

    // Act & Assert: Reset button says 'Reset' and calls handleReset onClick    
    it("Shows a Reset button", () => {
        expect(resetButton.textContent).toBe('Reset')
    })

    it("onClick, it calls the handleReset function", () => {
        // Simulate clicking the reset button
        fireEvent.click(resetButton);
        expect(mockHandleReset).toHaveBeenCalledTimes(1);
    })

    // Act & Assert: Lap button says 'Lap' and is enabled, and calls handleLap onClick
    it("Shows a Lap button", () => {
        expect(lapButton.textContent).toBe('Lap')
    })

    it("Lap button is enabled and calls handleLap onClick", () => {
        expect(lapButton).toHaveProperty('disabled', false);
        // Simulate clicking the lap button
        fireEvent.click(lapButton);
        expect(mockHandleLap).toHaveBeenCalledTimes(1);
    })
})
