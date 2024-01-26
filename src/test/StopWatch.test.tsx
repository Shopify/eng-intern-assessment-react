import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatch from '../StopWatch';

describe('StopWatch Component', () => {
    it('calls onStart callback on Start button click', () => {
        const onStartMock = jest.fn();
        const { getByText } = render(<StopWatch isRunning={false} onStart={onStartMock} onStop={() => { }} />);

        fireEvent.click(getByText('Start'));
        expect(onStartMock).toHaveBeenCalledTimes(1);
    });

    it('calls onStop callback on Stop button click', () => {
        const onStopMock = jest.fn();
        const { getByText } = render(<StopWatch isRunning={true} onStart={() => { }} onStop={onStopMock} />)
        
        fireEvent.click(getByText('Stop'));
        expect(onStopMock).toHaveBeenCalledTimes(1);
    })
})

test('reset button resets the timer and laps', () => {
    const { getByText, getByTestId } = render(<StopWatch isRunning={false} onStart={() =>{}} onStop={() => { }} />)
    
    // start the timer
    fireEvent.click(getByText('Start'));

    // wait for certain period of time to let the timer run
    // adjust the timer depending on the timer interval in the component

    setTimeout(() => {
        // report initial lap button
    const initialLapCount = getByTestId('lap-count').textContent;

    // click the lap button
    fireEvent.click(getByText('Lap'));

    // click the reset button
    fireEvent.click(getByText('Reset'));

    // assert the time is reset to 0 and laps are cleared
    expect(getByText('00:00:00')).toBeTruthy();
    expect(getByTestId('lap-count').textContent).toBe(initialLapCount)
    }, 1000)    
})

test('lap button records lap time', () => {
    const { getByText, getByTestId } = render(<StopWatch isRunning={false} onStart={() => { }} onStop={() => { }} />)
    
    // start the timer
    fireEvent.click(getByText('Start'));

    // wait for certain amount of time to let the timer run
    // adjust the time depending on the timer interval in the component

    setTimeout(() => {
        
        // record initial lap count
        const initialLapCount = getByTestId('lap-count').textContent;
    
        // click the lap button
        fireEvent.click(getByText('Lap'));
    
        // assert that the lap time is recorded
        expect(getByTestId('lap-count').textContent).toBe(`${parseInt(initialLapCount) + 1}`);
    }, 1000);

})