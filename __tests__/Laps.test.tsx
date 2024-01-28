import React, { useState } from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Laps from '../src/Laps'

afterEach(cleanup)

it('The Lap History Should Display 1 lap with a time of 5 seconds', () => {
    const { getByText } = render(<Laps lapHistory={[{ lap: 1, time: 5 }]}/>)
    const lapDisplay = getByText('', { selector: 'div.lap-history-item' })
    const lapNumber = lapDisplay.querySelector('p.lap-key-lap').textContent
    const lapTime = lapDisplay.querySelector('p.lap-key-time').textContent

    expect(lapNumber === 'Lap #1')
    expect(lapTime === 'Time 5 seconds')
})
