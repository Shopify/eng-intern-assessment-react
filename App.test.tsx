import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatchButton from './src/components/StopWatchButton';
import StopWatch from './src/components/StopWatch';


test('Displays the correct text on the Start/Stop button', () => {
    const {getByText} = render(<StopWatchButton formattedTime={"00:00:00:00"} time={0} setTime={() => {
    }}/>);
    const Button = getByText('Start')
    fireEvent.click(Button)
    expect(Button.textContent).toBe('Stop')

    fireEvent.click(Button)
    expect(Button.textContent).toBe('Start')
})

test('Resets the entire stop watch on click', () => {
    const setMockTime = jest.fn()
    const {getByText} = render(<StopWatchButton formattedTime={"00:00:00:01"} time={10} setTime={setMockTime}/>)

    const resetButton = getByText('Reset')
    fireEvent.click(resetButton)
    expect(setMockTime).toHaveBeenCalledWith(0)

    const {getByTestId} = render(<StopWatch/>)
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:00:00');
})

