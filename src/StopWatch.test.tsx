import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';


test('stopwatch functionality', async () => {
    const { getByText, findByText } = render(<StopWatch />);
    const startButton = getByText('Start');
    const stopButton = getByText('Stop');
    const resetButton = getByText('Reset');
    const lapButton = getByText('Lap');

    // Test start button
    fireEvent.click(startButton);
    // Wait for the timer to update
    await act(async () => {
        await new Promise((r) => setTimeout(r, 1000));
    });
    expect(getByText('1')).toBeInTheDocument();

    // Test stop button
    fireEvent.click(stopButton);
    // The timer should still display the last value
    expect(getByText('1')).toBeInTheDocument();

    // Test lap button
    fireEvent.click(lapButton);
    // A lap record should be displayed
    expect(getByText('Lap 1: 1')).toBeInTheDocument();

    // Test reset button
    fireEvent.click(resetButton);
    // The timer should be reset to zero
    expect(getByText('0')).toBeInTheDocument();
    // The lap record should be removed
    expect(findByText('Lap 1: 1')).rejects.toThrow();
});
