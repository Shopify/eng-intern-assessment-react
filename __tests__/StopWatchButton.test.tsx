import React, { useState } from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import App from '../src/App'
import StopwatchButton from '../src/StopWatchButton'

afterEach(cleanup)

it('The Button should display the "Start" label', () => {
    const { getByText } = render(<StopwatchButton isRunning={false}  setIsRunning={null}/>)
    const buttonDisplay = getByText('Start')
    expect(buttonDisplay.textContent === 'Start')
})

it('The Button should toggle from "Start" to "Stop"', () => {
    const { getByText } = render(<App />)
    const buttonDisplay = getByText('Start')
    expect(buttonDisplay.textContent === 'Start')
    fireEvent.click(getByText('Start'))
    expect(buttonDisplay.textContent === 'Stop')
})
