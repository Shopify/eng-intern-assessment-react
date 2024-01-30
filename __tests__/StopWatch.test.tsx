import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatch from '../src/components/StopWatch';

describe('StopWatch', () => {
    /*
     *
     * @description Mocks the scrollIntoView function
     *
     */
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        jest.useFakeTimers();
    });

    /*
     *
     * @description Clears all timers
     *
     */
    afterEach(() => {
        jest.clearAllTimers();
    });

    /*
     *
     * @description Restores all mocks
     *
     */
    afterAll(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    /*
     *
     * @description Tests if the StopWatch component renders correctly
     *
     */
    test('Renders the StopWatch component', () => {
        render(<StopWatch />);
        expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    /*
     *
     * @description Tests if the StopWatch component starts and stops correctly
     *
     */
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

    /*
     *
     * @description Tests if the StopWatch component laps correctly
     *
     */
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

    /*
     *
     * @description Tests if the StopWatch component resets correctly
     *
     */
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