import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import StopWatchButton from './StopWatchButton';

describe('Tests the StopWatchButton', () => {
    it('renders the StopWatchButton', () => {
        const { getByText, getByRole } = render(<StopWatchButton text="Start" onClick={() => { }} />);

        const button = getByText('Start');
        expect(button).toBeTruthy();
        expect(getByRole('button').textContent).toBe("Start");
    });

    it('handles the onClick', () => {
        const onClickHandler = jest.fn();
        const { getByText } = render(<StopWatchButton text="Start" onClick={onClickHandler} />);

        const button = getByText('Start');
        fireEvent.click(button);

        expect(onClickHandler).toHaveBeenCalled();
    });
});
