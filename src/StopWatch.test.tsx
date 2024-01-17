import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, act } from '@testing-library/react';
import StopWatch from './StopWatch';
import '@testing-library/jest-dom';

/*
Big issue with testing:
My component uses requestAnimationFrame to update the timer which might not be compatible with Jest's advanceTimersByTime.
Jest fake timers may not affect it as they are designed for setTimeout and setInterval.
I was not able to mock the requestAnimationFrame and test against that.
*/
describe('StopWatch Component', () => {
    jest.useFakeTimers();

    test('starts timer correctly', async () => {
        const { getByText } = render(<StopWatch />);
        userEvent.click(getByText('Start'));
        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        // Check each part of the time separately since they are rendered in separate components
        expect(getByText('00')).toBeInTheDocument(); // hours
        expect(getByText(':')).toBeInTheDocument(); // first colon
        expect(getByText('00')).toBeInTheDocument(); // minutes
        expect(getByText(':')).toBeInTheDocument(); // second colon
        expect(getByText('01')).toBeInTheDocument(); // seconds
        expect(getByText(':')).toBeInTheDocument(); // third colon
        expect(getByText('00')).toBeInTheDocument(); // milliseconds
    });
});

