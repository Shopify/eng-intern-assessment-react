// Unit tests verifying if stopwatch works

import React from 'react';
import { render, screen, fireEvent, act, getAllByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('StopWatch', () => {

    //enable fake timers
    jest.useFakeTimers();

    test('renders the initial stopwatch', () => {
        const { getByText } = render(<App />);
        expect(getByText('00:00.00')).toBeInTheDocument();
        expect(getByText('Start')).toBeInTheDocument();
    });

    test('starts and stops the stopwatch', () => {
        const { getByText } = render(<App />);
        const startStopButton = getByText('Start');

        act(() => fireEvent.click(startStopButton));

        expect(getByText('Stop')).toBeInTheDocument();

        act(() => jest.advanceTimersByTime(180));

        expect(getByText('00:00.18')).toBeInTheDocument();

        act(() => fireEvent.click(startStopButton));

        expect(getByText('Start')).toBeInTheDocument();
    });

    test('resumes after stopping the stopwatch', () => {
        const { getByText } = render(<App />);
        const startStopButton = getByText('Start');

        act(() => fireEvent.click(startStopButton));

        expect(getByText('Stop')).toBeInTheDocument();

        act(() => jest.advanceTimersByTime(180));

        expect(getByText('00:00.18')).toBeInTheDocument();

        act(() => fireEvent.click(startStopButton));

        expect(getByText('Start')).toBeInTheDocument();

        act(() => fireEvent.click(startStopButton));

        act(() => jest.advanceTimersByTime(110));

        expect(getByText('00:00.29')).toBeInTheDocument();

        expect(getByText('Stop')).toBeInTheDocument();
    });

    test('records laps', () => {
        const { getAllByText, getByText } = render(<App />);
        const startStopButton = getByText('Start');

        act(() => fireEvent.click(startStopButton));

        act(() => jest.advanceTimersByTime(130));

        const lapButton = getByText('Lap');

        act(() => fireEvent.click(lapButton));

        expect(getByText('Laps')).toBeVisible();
        expect(getByText('1')).toBeVisible(); // first lap
        expect(getAllByText('00:00.13').at(1)).toBeInTheDocument(); // first lap's time
        expect(getAllByText('00:00.13').at(2)).toBeInTheDocument(); // first lap's total time

        act(() => jest.advanceTimersByTime(60));

        act(() => fireEvent.click(lapButton));

        expect(getByText('2')).toBeInTheDocument(); // second lap
        expect(getAllByText('00:00.13').at(0)).toBeInTheDocument(); // first lap's time
        expect(getAllByText('00:00.13').at(1)).toBeInTheDocument(); // first lap's total time
        expect(getByText('00:00.06')).toBeInTheDocument(); // second lap's time
        expect(getAllByText('00:00.19').at(1)).toBeInTheDocument(); // second lap's total time
    });

    test('resets the stopwatch', () => {
        const { getByText } = render(<App />);
        const startStopButton = getByText('Start');

        act(() => fireEvent.click(startStopButton));

        act(() => jest.advanceTimersByTime(70));

        const lapButton = getByText('Lap');

        act(() => fireEvent.click(lapButton));

        act(() => fireEvent.click(startStopButton));

        const resetButton = getByText('Reset');

        act(() => fireEvent.click(resetButton));

        expect(getByText('Start')).toBeInTheDocument();
        expect(getByText('00:00.00')).toBeInTheDocument();
        expect(getByText('Laps')).not.toBeVisible();
    });
});
