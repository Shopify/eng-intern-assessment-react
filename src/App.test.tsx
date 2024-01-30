import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

test('records laps correctly', async () => {
    render(<App />);

    userEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(1500); // Advance time by 1.5 seconds
    });
    userEvent.click(screen.getByText('Lap'));
    act(() => {
        jest.advanceTimersByTime(2000); // Advance time by another 2 seconds
    });
    userEvent.click(screen.getByText('Lap'));

    await waitFor(() => {
        expect(screen.getByTestId('lap-time-1')).toHaveTextContent('00:01.5');
        expect(screen.getByTestId('lap-time-2')).toHaveTextContent('00:03.5');
    });
});

test('stops timer correctly', async () => {
    render(<App />);

    userEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(3000);
    });
    userEvent.click(screen.getByText('Stop'));

    await waitFor(() => {
        expect(screen.getByTestId('stopwatch-display')).toHaveTextContent('00:03.0');
    });
});

test('resets timer correctly', async () => {
    render(<App />);

    userEvent.click(screen.getByText('Start'));
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    userEvent.click(screen.getByText('Stop'));
    userEvent.click(screen.getByText('Reset'));

    await waitFor(() => {
        expect(screen.getByTestId('stopwatch-display')).toHaveTextContent('00:00.0');
    });
});
