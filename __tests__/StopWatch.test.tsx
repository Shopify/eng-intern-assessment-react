import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatch from '../src/components/StopWatch';

describe('StopWatch', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    test('Renders the StopWatch component', () => {
        render(<StopWatch />);
        expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    test('Starts the StopWatch component', () => {
        render(<StopWatch />);

        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(screen.getByText('Stop')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Stop'));
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    test('Laps the StopWatch component', () => {
        render(<StopWatch />);

        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(5000);
        });

        fireEvent.click(screen.getByText('Lap'));

        const lapItems = screen.queryAllByRole('listitem');
        expect(lapItems.length).toBeGreaterThan(0);
    });

    test('Resets the StopWatch component', () => {
        render(<StopWatch />);

        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(300);
        });

        fireEvent.click(screen.getByText('Reset'));
        expect(screen.queryByText('Lap 1 - 00:03:00')).not.toBeInTheDocument();
        expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
    });
});