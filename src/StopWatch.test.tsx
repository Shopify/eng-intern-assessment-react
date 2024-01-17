import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';
import moment, { Duration } from 'moment';
import StopWatch from './StopWatch';

/**
 * Testing for this part of the application is to verify that the text for the
 * stop watch gets displayed, and also the time is displayed.
 * 
 * 1. Verify that there is the text on the display
 * 2. Verify that the time is on the display
 * 
 * For greater test coverage I would need to figure out how to
 * use this test suite more. I would want to verify that the
 * timer actually runs when pressing the start button
 * 
 * I would also want to verify that the laps are shown on the display
 * when the button is clicked.
 */

test('verify that the text is on the display', () => {

    const { getByText } = render(<StopWatch laps={[]} time={moment.duration(0)} />);

    const timerText = getByText("Current Time(Hours, Minutes, Seconds):");
    expect(timerText).toBeDefined();
});

test('verify that the time is on the display', () => {

    const { getByText } = render(<StopWatch laps={[]} time={moment.duration(0)} />);

    const timeText = getByText("0:0:0");
    expect(timeText).toBeDefined();
});