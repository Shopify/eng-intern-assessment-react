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