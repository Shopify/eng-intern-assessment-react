import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';
import React from 'react';

jest.useFakeTimers();

describe('Stopwatch', () => {
    test('start button functionality', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByTestId('start-stop-test-btn');
        const time = screen.getByTestId('time-test');
        expect(startStopButton).toHaveTextContent("Start");
        expect(time).toHaveTextContent("00 : 00 : 00");
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(time).toHaveTextContent("00 : 01 : 00");
        expect(startStopButton).toHaveTextContent("Stop");
    })

    test('stop button functionality', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByTestId('start-stop-test-btn');
        const time = screen.getByTestId('time-test');
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(startStopButton);
        expect(time).toHaveTextContent("00 : 01 : 00");
        expect(startStopButton).toHaveTextContent("Start");
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(startStopButton);
        expect(time).toHaveTextContent("00 : 01 : 00");
    })

    test('reset button functionality', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByTestId('start-stop-test-btn');
        const resetButton = screen.getByTestId('reset-test-btn');
        const time = screen.getByTestId('time-test');
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(startStopButton);
        expect(time).toHaveTextContent("00 : 01 : 00");
        fireEvent.click(resetButton);
        expect(time).toHaveTextContent("00 : 00 : 00");
    })
    
    test('clicking lap button', () => {
        render(<StopWatch />);
        const startStopButton = screen.getByTestId('start-stop-test-btn');
        const lapButton = screen.getByTestId('lap-test-btn');
        const time = screen.getByTestId('time-test');
        fireEvent.click(startStopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        fireEvent.click(lapButton);
        const lap = screen.getByTestId('lap-test');
        expect(time).toHaveTextContent("00 : 01 : 00");
        expect(lap).toHaveTextContent("00 : 01 : 00");
    })
});


