import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; // Import your component

// Mocks and fake timers setup
beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    });
});

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

test('records laps correctly', () => {
    render(<App />);

    // Start the timer and record laps
    fireEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(1500); // Advance time by 1.5 seconds
    });
    fireEvent.click(screen.getByText('Lap'));
    act(() => {
        jest.advanceTimersByTime(2000); // Advance time by another 2 seconds
    });
    fireEvent.click(screen.getByText('Lap'));

    // Assertions to check if laps are recorded correctly
    expect(screen.getAllByText('Lap')).toHaveLength(2);
});

test('stops timer correctly', () => {
    render(<App />);

    // Start the timer
    fireEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(3000); // Advance time by 3 seconds
    });

    // Stop the timer
    fireEvent.click(screen.getByText('Stop'));

    // Assertions to check if the timer has stopped
    expect(screen.getByText('3 seconds')).toBeInTheDocument();
});

test('resets timer correctly', () => {
    render(<App />);

    // Start and then stop the timer
    fireEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(5000); // Advance time by 5 seconds
    });
    fireEvent.click(screen.getByText('Stop'));

    // Reset the timer
    fireEvent.click(screen.getByText('Reset'));

    // Assertions to check if the timer has reset
    expect(screen.getByText('0 seconds')).toBeInTheDocument();
});
