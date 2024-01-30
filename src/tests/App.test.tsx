/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import App from '../App';

// Arrange
// Act
// Assert

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

    fireEvent.click(startButton);
    
    act(() => {
        jest.advanceTimersByTime(100);
    });

    expect(stopwatchDisplay).toHaveTextContent('00:00.10');
});