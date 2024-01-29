import React from 'react';
import { screen, fireEvent, render, act } from '@testing-library/react';
import StopWatch, { formatTime } from './StopWatch';

describe('renders StopWatch.tsx', () => {
    test('stopwatch renders correctly', () => {
        const { getByTestId } = render(<StopWatch />);
        const stopwatchElement = getByTestId('stopwatch');
        expect(stopwatchElement).not.toBeNull();
    });

    test('stopwatch btns render correctly', () => {
        const { getByText } = render(<StopWatch />);
        const startBtn = getByText('Start');
        expect(startBtn).not.toBeNull();
        const lapBtn = getByText('Lap');
        expect(lapBtn).not.toBeNull();
        const stopBtn = getByText('Stop');
        expect(stopBtn).not.toBeNull();
        const resetBtn = getByText('Reset');
        expect(resetBtn).not.toBeNull();
    });
});


test('formats time correctly', () => {
    expect(formatTime(1900)).toBe('00:00:01.90');
    expect(formatTime(61900)).toBe('00:01:01.90');
    expect(formatTime(3661900)).toBe('01:01:01.90');
});

describe('testing btns', () => {
    beforeEach(() => {
        // Mocking timer
        jest.useFakeTimers();
        render(<StopWatch />);
    });
    // Running all pending timers and switching to real timers
    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('starts timer', () => {
        const spy = jest.spyOn(global, 'setInterval');
        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expect.any(Function), 10);
    });

    it('resets timer', () => {
        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const resetButton = screen.getByRole('button', { name: /reset/i });
        fireEvent.click(resetButton);
        expect(screen.getByText('00:00:00.00')).not.toBeNull();
    });

    it('lap btn clicked', () => {
        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const lapButton = screen.getByRole('button', { name: /lap/i });
        fireEvent.click(lapButton);
        expect(screen.getByText('Lap 1: 00:00:01.00')).not.toBeNull();
    });

    it('stop btn clicked', () => {
        const spyClearInt = jest.spyOn(global, 'clearInterval');
        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const stopButton = screen.getByRole('button', { name: /stop/i });
        fireEvent.click(stopButton);
        expect(spyClearInt).toHaveBeenCalledTimes(1);
        expect(spyClearInt).toHaveBeenCalledWith(expect.any(Number));
    });
});