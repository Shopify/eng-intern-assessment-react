import React from 'react'

import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'

import { StopWatch } from '../src/StopWatch'
import { act } from 'react-dom/test-utils'

describe("StopWatch", () => {
    const startBtnText = 'Start'
    const stopBtnText = 'Stop'
    const resetBtnText = 'Reset'
    const lapBtnText = 'Lap'

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('displays initial state of stopwatch correctly', async () => {
        render(<StopWatch />)

        expect(screen.getByText(startBtnText)).toBeInTheDocument()
        expect(screen.getByText(resetBtnText)).toBeInTheDocument()
        expect(screen.getByText(lapBtnText)).toBeInTheDocument()
        expect(screen.getAllByText('00')).toHaveLength(3)
        expect(screen.getAllByRole('colon')).toHaveLength(2)
    })

    it('start stopwatch for 1sec and stop', () => {
        render(<StopWatch />)

        const startBtn = screen.getByText(startBtnText)
        fireEvent.click(startBtn)

        // Advance timers by 1 second
        act(() => {
            jest.advanceTimersByTime(1000)
        })

        const stopBtn = screen.getByText(stopBtnText)
        fireEvent.click(stopBtn)
        expect(screen.getAllByText('00')).toHaveLength(2)
        expect(screen.getByText('01'))
    })

    it('start stopwatch for 1sec and reset', () => {
        render(<StopWatch />)

        const startBtn = screen.getByText(startBtnText)
        fireEvent.click(startBtn)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        const resetBtn = screen.getByText(resetBtnText)
        fireEvent.click(resetBtn)
        expect(screen.getAllByText('00')).toHaveLength(3)
    })

    it('render laps when stopwatch running', () => {
        render(<StopWatch />)

        const lapBtn = screen.getByText(lapBtnText)
        const startBtn = screen.getByText(startBtnText)
        fireEvent.click(startBtn)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        fireEvent.click(lapBtn)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        fireEvent.click(lapBtn)

        // Stop the stopwatch
        fireEvent.click(screen.getByText('Stop'));

        expect(screen.getByText('Lap 1')).toBeInTheDocument()
        expect(screen.getByText('Lap 2')).toBeInTheDocument()
    })

    it('render no laps when stopwatch is not running', () => {
        render(<StopWatch />)

        const lapBtn = screen.getByText(lapBtnText)
        fireEvent.click(lapBtn)
        fireEvent.click(lapBtn)

        expect(screen.queryByText('Lap 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Lap 2')).not.toBeInTheDocument()
    })
})
