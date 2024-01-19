import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import '@testing-library/jest-dom';
import { start } from 'repl';

// Mocking the StopWatchButton component
jest.mock('./StopWatchButton', () => {
return {
    start: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
};
});

// Test cases below
describe ('StopWatchButton', () => {

    // Test case that checks for the 'Start' button
    test('renders StopWatchButton component', () => {
        render(<StopWatchButton />);
    });
    
    // Test case that checks for the 'Start' button
    test('renders Start button', () => {
        const { getByText } = render(<StopWatchButton />);
        const startButton = getByText('Start');
    });

    // Test case that checks for the 'Stop' button
    test('renders Stop button', () => {
        const { getByText } = render(<StopWatchButton />);
        const stopButton = getByText('Stop');
    });

    // Test case that checks for the 'Reset' button
    test('renders Reset button', () => {
        const { getByText } = render(<StopWatchButton />);
        const resetButton = getByText('Reset');
    });

    // Test case that checks for the 'Lap' button
    test('renders Lap button', () => {
        const { getByText } = render(<StopWatchButton />);
        const lapButton = getByText('Lap');
    });

    // Test case that checks for the timer
    test('renders timer', () => {
        const { getByText } = render(<StopWatchButton />);
        const timer = getByText('0.0');
    });

    // Test case that checks for the lap timer
    test('renders lap timer', () => {
        const { getByText } = render(<StopWatchButton />);
        const lapTimer = getByText('Lap 1: 0');
    });
    
    // Test case that checks for the 'Start' button functionality
    test('Start button functionality', () => {
        const { getByText } = render(<StopWatchButton />);
        const startButton = getByText('Start');
        fireEvent.click(startButton);
        expect(start).toHaveBeenCalled();
    });

    // Test case that checks for the 'Stop' button functionality
    test('Stop button functionality', () => {
        const { getByText } = render(<StopWatchButton />);
        const stopButton = getByText('Stop');
        fireEvent.click(stopButton);
        expect(stop).toHaveBeenCalled();
    });

    // Test case that checks for the 'Reset' button functionality
    test('Reset button functionality', () => {
        const { getByText } = render(<StopWatchButton />);
        const resetButton = getByText('Reset');
        fireEvent.click(resetButton);
        expect(onreset).toHaveBeenCalled();
    });
    
});