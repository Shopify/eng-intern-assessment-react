import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom'
import StopWatch from "./StopWatch";

test("handles reset button", () => {
    render(<StopWatch />)
    const resetButton = screen.getByText("Reset")
    const timeDisplay = screen.getByRole("displayTime")
    fireEvent.click(resetButton)

    // If the stopwatch is reset, then the time will be all 0's
    expect(timeDisplay).toHaveTextContent("00:00:00:00")
})

test("handles new lap button", () => {
    render(<StopWatch />)
    const newLapButton = screen.getByText("New Lap")
    const startButton = screen.getByText("Start")
    const lapDisplay = screen.getByRole("lapDisplay")
    fireEvent.click(startButton)
    fireEvent.click(newLapButton)

    // If a lap exists, then recording laps works
    expect(lapDisplay).not.toBeEmptyDOMElement()
})

test("handles start button", () => {
    jest.useFakeTimers()
    render(<StopWatch />)
    const startButton = screen.getByText("Start")
    const timeDisplay = screen.getByRole("displayTime")
    const curTimeText = document.getElementById("displayTime").innerText
    act(() => {
        fireEvent.click(startButton)
        jest.advanceTimersByTime(2000)
    })

    // Checks that the new time after start is not the same as before the watch started
    expect(timeDisplay).not.toHaveTextContent(curTimeText)
})