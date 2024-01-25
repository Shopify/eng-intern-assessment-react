import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';

describe('StopWatchButton Component', () => {
    it('calls onStart callback on Start button click', () => {
        const onStartMock = jest.fn();
        const { getByText } = render(<StopWatchButton startTimer={onStartMock} stopTimer={() => { }} reset={() => { }} lap={() => { }} />)
        
        fireEvent.click(getByText('Start'));
        expect(onStartMock).toHaveBeenCalledTimes(1);
    })
})