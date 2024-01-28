import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Stopwatch from '../src/StopWatch'

afterEach(cleanup)

it('Should retrieve the correct stopwatch time', () => {
    const { getByText } = render(<Stopwatch stopwatchTime={10} laps={3} />)
    const timeDisplay = getByText('', { selector: 'div#stopwatch-display-time' })
    const timeLabel = timeDisplay.querySelector('p.label').textContent
    const timeValue = timeDisplay.querySelector('p.value').textContent
    expect(timeLabel === 'Time')
    expect(Number(timeValue) === 10)
})

it('Should retrieve the correct stopwatch laps', () => {
    const { getByText } = render(<Stopwatch stopwatchTime={10} laps={3} />)
    const lapDisplay = getByText('', { selector: 'div#stopwatch-display-laps' })
    const lapLabel = lapDisplay.querySelector('p.label').textContent
    const lapValue = lapDisplay.querySelector('p.value').textContent
    expect(lapLabel === 'Laps')
    expect(Number(lapValue) === 3)
})