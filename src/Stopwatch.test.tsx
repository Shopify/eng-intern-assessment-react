/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatch from './StopWatch';

// Checks if the default state of 00:00.000 is rendered correctly
it('should render time in its initial state', () => {
    render(<StopWatch timeElapsed={0} />);
    const stopwatchElement = screen.getByTestId("time-display");
    expect(stopwatchElement.innerHTML).toBe("00:00.000");
});

it('should render 150 000 ms in the correct format', () => {
    render(<StopWatch timeElapsed={150000} />);
    const stopwatchElement = screen.getByTestId("time-display");
    expect(stopwatchElement.innerHTML).toBe("02:30.000");
});
