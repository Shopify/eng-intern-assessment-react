import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch, { formatTime } from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllTimers();
        render(<StopWatch />);
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
        expect(screen.getAllByText(/(\d{2}:){3}\d{2}/)).toHaveLength(2); // Check for two instances of time

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));

        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
        expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:01:00');
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
        expect(lapsList.length).toBe(11); // 11 laps because pressing start creates the first lap
        for (let i = 0; i < 10; i++) {
            expect(lapsList[i].textContent).toBe(`Lap ${11 - i}: 00:00:00:00`);
        }
    });

    it('should increment the correct amount of time', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Start' }));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const timeText = screen.getByTestId('time-display').textContent;

        // Extract the time and convert it to milliseconds
        const [hours, minutes, seconds, milliseconds] = timeText.split(':').map(Number);
        const totalTimeInMilliseconds =
            (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

        expect(totalTimeInMilliseconds).toBe(1000);

        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
        expect(screen.getByTestId('time-display').textContent).toBe('00:00:01:00');
    });

    it('should format time correctly', () => {
        expect(formatTime(0)).toBe('00:00:00:00');
        expect(formatTime(1000)).toBe('00:00:01:00'); // 1000ms = 1s
        expect(formatTime(700000)).toBe('00:11:40:00'); // 700000ms = 7000s = 11m40s
        expect(formatTime(3131313)).toBe('00:52:11:31'); // 3131313ms = 3131s313ms = 52m11s313ms
        expect(formatTime(3600000)).toBe('01:00:00:00'); // 3600000ms = 3600s = 1h
    });
});
