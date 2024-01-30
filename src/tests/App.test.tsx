/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import App from '../App';

beforeEach(() => {
    // use fake timing functions to allow time manipulation for testing
    jest.useFakeTimers();
});

afterEach(() => {
    // unmount elements rendered during tests
    cleanup();
    // run all pending timers and switch back to real timers
    jest.runOnlyPendingTimers()
    jest.useRealTimers();
});

test('stopwatch starts when user clicks start button', () => {
    render(<App />);
    const startButton = screen.getByTestId('startButton');
    const stopwatchDisplay = screen.getByTestId('stopwatch');

    // click the start button and wait 10 milliseconds
    fireEvent.click(startButton);
    act(() => {jest.advanceTimersByTime(10);});

    // stopwatch display should show that 10 milliseconds have passed
    expect(stopwatchDisplay).toHaveTextContent('00:00.01');
});

test('stopwatch stops when user clicks stop button', () => {
    render(<App />);
    const startButton = screen.getByTestId('startButton');
    const stopButton = screen.getByTestId('stopButton');
    const stopwatchDisplay = screen.getByTestId('stopwatch');

    // click the start button and wait 10000 milliseconds (10 seconds)
    fireEvent.click(startButton);
    act(() => {jest.advanceTimersByTime(10000);});

    // click the stop button and wait another 10 seconds
    fireEvent.click(stopButton);
    act(() => {jest.advanceTimersByTime(10000);});

    // stopwatch should show that only 10 seconds have been timed
    // and not the additional 10 seconds after the stop button was clicked
    expect(stopwatchDisplay).toHaveTextContent('00:10.00');

    // this test is passing but I'm not sure if it is truly testing the
    // functionality of the stop button correctly. I tried to implement
    // a better solution using things like mock timers and waitFor 
    // but I ran out of time so I reverted back to my first iteration.
});