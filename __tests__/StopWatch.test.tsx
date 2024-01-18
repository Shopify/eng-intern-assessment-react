import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import '@testing-library/jest-dom';

/* As there is no implementation yet, these should all fail and they likely will be tweaked later */
describe('Stopwatch', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllTimers();
        render(<Stopwatch />);
    });

    it('correctly renders the initial state of the page', () => {
        expect(screen.getByTestId('time-display')).toBeInTheDocument();
        expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:00:00');
        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Lap' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    it('correctly starts and stops the stopwatch', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Start' }));
        expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));

        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
        expect(screen.getByTestId('time-display')).not.toEqual('00:00:00:00');
    });

    it('correctly resets the stopwatch', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Start' }));

        act(() => {
            jest.advanceTimersByTime(5000);
        });
        fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

        expect(screen.getByText('00:00:00:00')).toBeInTheDocument();
    });

    it('correctly creates multiple laps when the "Lap" button is pressed', () => {
        fireEvent.click(screen.getByText('Start'));
        for (let i = 0; i < 10; i++) {
            fireEvent.click(screen.getByRole('button', { name: 'Lap' }));
        }
        const lapsList = screen.getByTestId('laps-list').children;
        expect(lapsList.length).toBe(10);
    });

    it('should increment the correct amount of time', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Start' }));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const timeText = screen.getByTestId('time-display').textContent;

        const [hours, minutes, seconds, milliseconds] = timeText.split(':').map(Number);
        const totalTimeInMilliseconds =
            (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

        expect(totalTimeInMilliseconds).toBe(1000);

        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
        expect(screen.getByTestId('time-display').textContent).toBe('00:00:01:00');
    });
});
