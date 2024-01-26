/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { calculateTime } from "./StopWatchUtils"
import StopWatchButton from './StopWatchButton';
import { StopWatchButtonProps } from './stopWatchProps';

afterEach(() => {
    jest.clearAllMocks();
});

const renderStopWatchButton = (props: StopWatchButtonProps) => {
    return render(<StopWatchButton {...props} />);
};

const mockSetIsStopped = jest.fn();
const mockSetTime = jest.fn();
const mockSetLaps = jest.fn();
const mockSetMinTime = jest.fn();
const mockSetMaxTime = jest.fn();
const mockSetCalculatedLapTimes = jest.fn();

const props: StopWatchButtonProps = {
    isStopped: true, 
    setIsStopped: mockSetIsStopped, 
    time: 0, 
    setTime: mockSetTime,
    setLaps: mockSetLaps,
    setMinTime: mockSetMinTime,
    setMaxTime: mockSetMaxTime,
    setCalculatedLapTimes: mockSetCalculatedLapTimes
}

describe('correctly starts the stopwatch', () => {
    it('test "Start" button has been called', async () => {
        const { getByText} = renderStopWatchButton({...props});

        const startButtonElement = getByText('Start');
        fireEvent.click(startButtonElement);

        expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
        expect(mockSetIsStopped).toHaveBeenCalledWith(false);

        // await waitFor(() => {
        //     expect(getByText('Stop')).toBeInTheDocument();
        // });
    })

    it('returns the correct hour in milliseconds', () => {
        expect(calculateTime(3600000)).toEqual("01:00:00:00");
    });

    it('returns the correct minute in milliseconds', () => {
        expect(calculateTime(60000)).toEqual("00:01:00:00");
    });

    it('returns the correct second in milliseconds', () => {
        expect(calculateTime(1000)).toEqual("00:00:01:00");
    });

    it('returns the correct time in hr/min/sec/ms format', () => {
        expect(calculateTime(13857634)).toEqual("03:50:57:69");
    });
});

describe('correctly stops the stopwatch', () => {
    it('test "Stop" button has been called', () => {
        const { getByText} = renderStopWatchButton({ ...props, isStopped: false, time: 12333 });

        const stopButtonElement = getByText('Stop');
        fireEvent.click(stopButtonElement);

        expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
        expect(mockSetIsStopped).toHaveBeenCalledWith(true);
        expect("00:00:12:33").toBeInTheDocument;
    })
})

describe('correctly resets the stopwatch', () => {
    it('test "Reset" button has been called', async () => {
        const { getByText} = renderStopWatchButton({ ...props });

        const resetButtonElement = getByText('Reset');
        fireEvent.click(resetButtonElement);

        expect(mockSetIsStopped).toHaveBeenCalledTimes(1);
        expect(mockSetIsStopped).toHaveBeenCalledWith(true);
        expect(mockSetTime).toHaveBeenCalledWith(0);
        expect(mockSetLaps).toHaveBeenCalledWith([]);
        expect(mockSetMinTime).toHaveBeenCalledWith(Number.POSITIVE_INFINITY);
        expect(mockSetMaxTime).toHaveBeenCalledWith(0);
        expect(mockSetCalculatedLapTimes).toHaveBeenCalledWith([]);
        expect("00:00:00:00").toBeInTheDocument;
    })
})

describe('correctly records laps', () => {
    it('test "Laps" button has been called', async () => {
        const { getByText} = renderStopWatchButton({ ...props, isStopped: false, time: 12333 });

        const lapButtonElement = getByText('Lap');
        fireEvent.click(lapButtonElement);

        expect(mockSetLaps).toHaveBeenCalledTimes(1);
    })
})