import React from "react"
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import StopWatch from "../StopWatch"

describe('StopWatch', () => {

    // Before each test, render StopWatch Component and us jests fake timer
    beforeEach(() => {
        render(<StopWatch />)
        jest.useFakeTimers()
    })


    test("renders inital time on start up", () => {

        // Test if on start up, the time displayed is 00:00.00
        expect(screen.getByText('00:00.00'))
    })


    test("stop watch starts, counts, and stops when clicked", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After starting timer, advance 9 seconds then click stop button
        act(() => { jest.advanceTimersByTime(9000) })
        fireEvent.click(screen.getByText('Stop'))

        // Wait for state changes to happen and expect time display to show 00:09.00
        expect(await screen.findByText("00:09.00"))
    })


    test("records inital lap number when clicked", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After starting timer, advance 2 seconds and the press lap button
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))

        // Wait for state changes to happen and expect tag with lap-1 test id
        expect(await screen.findByTestId('lap-1'))
    })

    test("records inital lap time when clicked", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After clicking start button, advance 2 seconds and then press lap button
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))

        // Wait for state changes to happen and then expect time recorded to be 00:02.00
        expect(await screen.findByText('00:02.00'))
    })

    test("records laps that are not the fist lap number when clicked", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After clicking start button, advance 1 second and then press lap button
        act(() => { jest.advanceTimersByTime(1000) })
        fireEvent.click(screen.getByText('Lap'))

        // Advance 3 more seconds then click lap button
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))

        // Wait for state changes to happen and expect tag with lap-2 test id
        expect(await screen.findByTestId('lap-2'))
    })

    test("records laps that are not the first lap times when clicked", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After clicking start button, advance 1 second and then press lap button
        act(() => { jest.advanceTimersByTime(1000) })
        fireEvent.click(screen.getByText('Lap'))

        // Advance 3 more seconds then click lap button
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))

        // Wait for state changes to happen and then expect time recorded to be 00:03.00
        expect(await screen.findByText('00:03.00'))
    });

    test("reset buttons resets time", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After clicking start button, advance 7 second and then press stop button
        act(() => { jest.advanceTimersByTime(7000) })
        fireEvent.click(screen.getByText('Stop'))

        // Click reset button
        fireEvent.click(screen.getByText('Reset'))

        // Expect time display to show 00:00.00
        expect(await screen.findByText('00:00.00'))
    })

    test("reset buttons resets lap", async () => {

        fireEvent.click(screen.getByText('Start'))

        // After clicking start button, advance 7 second and then press lap button
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))

        // After clicking start button, advance 3 second and then press lap button
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))

        // After clicking start button, advance 4 second and then press stop button
        act(() => { jest.advanceTimersByTime(4000) })
        fireEvent.click(screen.getByText('Stop'))

        // CLick reset button
        fireEvent.click(screen.getByText('Reset'))

        // Wait for state changes to happen and expect laps to be reset
        await waitFor(() => {
            expect(screen.queryAllByTestId('lap-object')).toHaveLength(0)
        })
    })
})




