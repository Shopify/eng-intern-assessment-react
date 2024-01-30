import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../src/components/StopWatch';

describe('Stopwatch Component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('displays initial time of 0:00.000', () => {
      render(<StopWatch />);
      expect(screen.getByText('0:00.000')).toBeInTheDocument();
  });

    test('starts the timer when start button is clicked', () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByLabelText(/start/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getByText(/0:01.000/)).toBeInTheDocument();
    });

    test('stops the timer when stop button is clicked', () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByLabelText(/start/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(screen.getByLabelText(/pause/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getByText(/0:01.000/)).toBeInTheDocument(); 
    });

    test('resets the timer when reset button is clicked', () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByLabelText(/start/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(screen.getByLabelText(/reset/i));
        expect(screen.getByText(/0:00.000/)).toBeInTheDocument();
    });

    test('records a lap when lap button is clicked', () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByLabelText(/start/i));
        act(() => {
            jest.advanceTimersByTime(7000);
        });
        fireEvent.click(screen.getByLabelText(/lap/i));
        expect(screen.getByText(/Lap 1/)).toBeInTheDocument();
        expect(screen.getAllByText('0:07.000')[0]).toBeInTheDocument();
    });
});
