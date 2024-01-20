// Verifies that the stopwatch starts, stops, resets, and records laps as expected

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

jest.useFakeTimers();

describe('Stopwatch App', () => {

    test('starts timer', () => {
        const { getByText } = render(<App />);
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000));
        const timeDisplay = getByText(/00:00:01:00/); // ensure 1 second is displayed
        expect(timeDisplay).toBeInTheDocument();
    });

    test('stops timer', () => {
        const { getByText } = render(<App />);
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000));
        fireEvent.click(getByText('Stop'));
        const timeDisplay = getByText(/00:00:01:00/); 
        expect(timeDisplay).toBeInTheDocument(); // ensure 1 second is displayed
        act(() => jest.advanceTimersByTime(1000));
        expect(timeDisplay).toBeInTheDocument(); // ensure 1 second is still displayed
    });

    test('resumes timer', () => {
        const { getByText } = render(<App />);
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000));
        fireEvent.click(getByText('Stop'));
        const timeDisplay = getByText(/00:00:01:00/); 
        expect(timeDisplay).toBeInTheDocument(); // ensure 1 second is displayed
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000));
        const timeDisplay2 = getByText(/00:00:02:00/);
        expect(timeDisplay2).toBeInTheDocument(); // ensure 2 seconds is displayed
    });

    test('records laps', () => {
        const { getByText } = render(<App />);
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000));
        fireEvent.click(getByText('Lap'));
        act(() => jest.advanceTimersByTime(1000));
        const lapDisplay = getByText(/Lap 1/);
        const lapTime = getByText(/00:00:01:00/);
        expect(lapDisplay).toBeInTheDocument(); // ensure lap 1 is displayed
        expect(lapTime).toBeInTheDocument(); // ensured lap time is displayed
    });

    test('resets timer', () => {
        const { getByText, queryByText } = render(<App />);
        fireEvent.click(getByText('Start'));
        act(() => jest.advanceTimersByTime(1000)); 
        fireEvent.click(getByText('Lap'));
        fireEvent.click(getByText('Stop'));
        fireEvent.click(getByText('Reset'));
        expect(queryByText(/00:00:00:00/)).toBeInTheDocument(); // ensure time resets to zero
        expect(queryByText(/Lap 1/)).not.toBeInTheDocument(); // ensure laps are cleared
    });

});
