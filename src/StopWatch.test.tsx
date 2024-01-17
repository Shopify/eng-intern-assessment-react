/**
 * @jest-environment jsdom
 */

import StopWatch, { FormatTimeMs } from './StopWatch'
import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'

jest.useFakeTimers()

test('initial display', () => {
    render(<StopWatch />)
    expect(screen.getByText('Start')).toBeTruthy()
})

test('start, pause, and reset the timer', async () => {
    render(<StopWatch />)

    /*
        its impossible to get a difference in performance.now() to match the actual
        stopwatch value, so just check if after 1 sec it changed from the initial value
    */
    await act(async () => {
        fireEvent.click(screen.getByTestId('start'))
        jest.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('time').textContent).toBe(FormatTimeMs(100))

    /*
        check that after waiting 1 sec after pausing the stopwatch, the value
        is preserved
    */
    await act(async () => {
        fireEvent.click(screen.getByTestId('pause'))
        jest.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('time').textContent).toBe(FormatTimeMs(100))

    /*
        check that unpausing the stopwatch when paused will resume the time count
    */
    await act(async () => {
        fireEvent.click(screen.getByTestId('pause'))
        jest.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('time').textContent).toBe(FormatTimeMs(200))

    /*
        check that pressing reset will put the time to 0, even after time is elapsed after pressing
    */
    await act(async () => {
        fireEvent.click(screen.getByTestId('reset'))
        jest.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('time').textContent).toBe(FormatTimeMs(0))
})

test('laps work as expected', async () => {
    render(<StopWatch/>)
    await act(async () => {fireEvent.click(screen.getByTestId('start'))})

    // lap 0
    await act(async () => {jest.advanceTimersByTime(150)})
    fireEvent.click(screen.getByTestId('lap'))
    expect(screen.getByText(`Lap ${0}: ${FormatTimeMs(150)}`)).toBeTruthy()

    // lap 1
    await act(async () => { jest.advanceTimersByTime(1150) })
    fireEvent.click(screen.getByTestId('lap'))
    expect(screen.getByText(`Lap ${1}: ${FormatTimeMs(1300)}`)).toBeTruthy()
})
