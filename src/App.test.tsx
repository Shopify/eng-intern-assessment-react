// App.test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

test('renders the stopwatch application', () => {
    render(<App />);
    expect(screen.getByText('Welcome to my Stopwatch Application')).toBeInTheDocument();
});

test('starts and records laps correctly', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    userEvent.click(startButton);
    act(() => {
        jest.advanceTimersByTime(1500);
    });

    const lapButton = screen.getByText('Lap');
    userEvent.click(lapButton);
    expect(screen.getByTestId('lap-time-1')).toHaveTextContent('1');

    act(() => {
        jest.advanceTimersByTime(2000);
    });

    userEvent.click(lapButton);
    expect(screen.getByTestId('lap-time-2')).toHaveTextContent('2');
});

test('stops timer correctly', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    userEvent.click(startButton);
    act(() => {
        jest.advanceTimersByTime(3000);
    });

    const stopButton = screen.getByText('Stop');
    userEvent.click(stopButton);

    const display = screen.getByTestId('stopwatch-display');
    expect(display).toHaveTextContent('00:00:03.000');
});

test('resets timer correctly', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    userEvent.click(startButton);
    act(() => {
        jest.advanceTimersByTime(5000);
    });

    const resetButton = screen.getByText('Reset');
    userEvent.click(resetButton);

    const display = screen.getByTestId('stopwatch-display');
    expect(display).toHaveTextContent('00:00:00.000');
});
