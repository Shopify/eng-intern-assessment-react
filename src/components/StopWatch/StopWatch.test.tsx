import React from "react"
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import StopWatch from "./StopWatch"

describe('StopWatch', () => {

    beforeEach(() => {
        render(<StopWatch />)
        jest.useFakeTimers()
    })

    test("renders inital time on start up", () => {
        expect(screen.getByText('00:00.00'))
    })

    test("stop watch starts, counts, and stops when clicked", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(9000) })
        fireEvent.click(screen.getByText('Stop'))
        expect(await screen.findByText("00:09.00"))
    })

    test("records inital lap number when clicked", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))
        expect(await screen.findByTestId('lap-1'))
    })

    test("records inital lap time when clicked", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))
        expect(await screen.findByText('00:02.00'))
    })

    test("records laps that are not the fist lap number when clicked", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(1000) })
        fireEvent.click(screen.getByText('Lap'))
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))
        expect(await screen.findByTestId('lap-2'))
    })

    test("records laps that are not the first lap times when clicked", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(1000) })
        fireEvent.click(screen.getByText('Lap'))
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))
        expect(await screen.findByText('00:03.00'))
    });

    test("reset buttons resets time", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(7000) })
        fireEvent.click(screen.getByText('Stop'))
        fireEvent.click(screen.getByText('Reset'))
        expect(await screen.findByText('00:00.00'))
    })

    test("reset buttons resets lap", async () => {
        fireEvent.click(screen.getByText('Start'))
        act(() => { jest.advanceTimersByTime(2000) })
        fireEvent.click(screen.getByText('Lap'))
        act(() => { jest.advanceTimersByTime(3000) })
        fireEvent.click(screen.getByText('Lap'))
        act(() => { jest.advanceTimersByTime(4000) })
        fireEvent.click(screen.getByText('Stop'))
        fireEvent.click(screen.getByText('Reset'))
        await waitFor(() => {
            expect(screen.queryAllByTestId('lap-object')).toHaveLength(0)
        })
    })
})




