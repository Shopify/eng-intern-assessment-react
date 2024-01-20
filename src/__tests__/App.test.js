import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import App from '../App';

describe('Stopwatch', () => {
    beforeEach(() => {
        render(<App />);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('renders initial state correctly', () => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Stop/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Lap/i })).toBeInTheDocument();

        expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
    });

    test('counts seconds correctly', () => {
        const startBtn = screen.getByRole('button', { name: /Start/i });
        fireEvent.click(startBtn);

        act(() => {
            // Move stopwatch forward by 5 seconds
            jest.advanceTimersByTime(5 * 1000);
        })
        expect(screen.getByText('00:00:05')).toBeInTheDocument();
    });

    test('counts minutes correctly', () => {
        const startBtn = screen.getByRole('button', { name: /Start/i });
        fireEvent.click(startBtn);

        act(() => {
            // Move stopwatch forward by 2 minutes
            jest.advanceTimersByTime(2 * 60 * 1000);
        })
        expect(screen.getByText('00:02:00')).toBeInTheDocument();
    });
    
    test('counts hours correctly', () => {
        const startBtn = screen.getByRole('button', { name: /Start/i });
        fireEvent.click(startBtn);

        act(() => {
            // Move stopwatch forward by 3 hours
            jest.advanceTimersByTime(3 * 60 * 60 * 1000);
        })
        expect(screen.getByText('03:00:00')).toBeInTheDocument();
    });

    test('stops the stopwatch', () => {
        const startBtn = screen.getByRole('button', { name: /Start/i });
        fireEvent.click(startBtn);

        act(() => {
            // Move stopwatch forward by 2 minutes
            jest.advanceTimersByTime(2 * 60 * 1000);
        })
        expect(screen.getByText('00:02:00')).toBeInTheDocument();

        const stopBtn = screen.getByRole('button', { name: /Stop/i });
        fireEvent.click(stopBtn);

        act(() => {
            // Attempt to move stopwatch forward by 30 seconds
            jest.advanceTimersByTime(30 * 1000);
        })
        // Stopwatch time should not have changed
        expect(screen.getByText('00:02:00')).toBeInTheDocument();
    });

    test.todo('resets the stopwatch to zero');
    test.todo('displays correct lap times');
    test.todo('displays time with proper formatting');
    test.todo('does not allow for seconds to overflow');
    test.todo('does not allow for minutes to overflow');
});
