import React from 'react'
import {render, fireEvent, act, screen} from '@testing-library/react'
import App from './App'
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe('Stopwatch', () => {
    //Test functionality of the start button
    test('Start button click', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText(/0:01.00/)).toBeInTheDocument();
    });

    //Test functionality of the stop button
    test('Stop button click', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        fireEvent.click(screen.getByText('Stop'));

        expect(screen.getByText(/0:03.00/)).toBeInTheDocument();
    });

    //Test functionality of the reset button
    test('Reset button click', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        fireEvent.click(screen.getByText('Reset'));

        expect(screen.getByText(/0:00.00/)).toBeInTheDocument();
    });

    //Test functionality of the lap button and display lap times
    test('Records laps function', () => {
        const { container } = render(<App />);
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        fireEvent.click(screen.getByText('Lap'));

        expect(container.textContent).toMatch(/Stopwatch0:01.50StartStopResetLap/);
    });
}); 