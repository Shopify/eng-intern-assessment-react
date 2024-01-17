import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';
import moment, { Duration } from 'moment';

/**
 * Testing is broken upp into 2 sections,
 * 
 * 1. Expected elements on the display
 * 
 *      For this I will be checking what we expect on the 
 *      display is actually on the display
 * 
 * 2. Watch Functionality
 *  
 *      For this I will be verifying that the watch buttons work
 *      as expected, and that the time element works as expected,
 *      finally that the lap aspect also works as it should.
 * 
 *      Expected problems with verification of the time, as it will
 *      be almost impossible to verify an exact time, instead i will
 *      consider possibly using a percent of accuracy of +- 5%, which
 *      if consistent should show accuracy -- didn't need.
 * 
 * 
 *  Scenarios:
 *  Start - Starts the time
 *  Stop - Stops the time
 *  Reset - Stops the time
 *  Reset - Sets time to zero
 *  Reset - Removes entries from list
 *  Lap - Adds lap to list
 * 
 * 
 *  Completed all test scenarios, have never used this testing framework
 *  I believe that this shows a rudimentary testing level, and 
 *  boosts confidence in the solution. For a greater testing level
 *  i would need to greatly increase my understanding of this test set.
 */

test('verification that Start, Stop, Reset, Lap buttons are on the page', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    const startButton = getByText("Start");
    expect(startButton).toBeDefined();

    const stopButton = getByText("Stop");
    expect(stopButton).toBeDefined();

    const resetButton = getByText("Reset");
    expect(resetButton).toBeDefined();

    const lapButton = getByText("Lap");
    expect(lapButton).toBeDefined();
});

test('start button sets isRunning to true', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Start"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
});

test('stop button sets isRunning to false', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Stop"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
});

test('reset button sets isRunning to false', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Reset"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
});

test('reset button sets time to 0', async () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);
    fireEvent.click(getByText("Start"));
    fireEvent.click(getByText("Reset"));
    expect(mockSetTime).toHaveBeenCalledWith(moment.duration(0));
});

test('adding first lap adds first lap to list', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Lap"));
    expect(mockAddLap).toHaveBeenCalledTimes(1);
});

test('lap button adds multiple laps to list', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={[]} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    expect(mockAddLap).toHaveBeenCalledTimes(3);
});

test('each lap represents records from zero', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockSetLapTime = jest.fn();
    let laps: Duration[] = [];
    const mockAddLap = jest.fn(() => {
        laps.push(moment.duration(0));
    });

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={laps} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Start"));
    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
    expect(laps[0]).toEqual(moment.duration(0));
});


test('reset button sets lap list back to empty', () => {
    const mockSetTime = jest.fn();
    const mockSetIsRunning = jest.fn();
    const mockAddLap = jest.fn();
    const mockSetLapTime = jest.fn();
    let laps: Duration[] = []

    const { getByText } = render(<StopWatchButton setTime={mockSetTime} setIsRunning={mockSetIsRunning} addLap={mockAddLap} laps={laps} lapTime={moment.duration(0)} time={moment.duration(0)} setLapTime={mockSetLapTime} />);

    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Lap"));
    fireEvent.click(getByText("Reset"));
    
    expect(laps.length).toBe(0);
});