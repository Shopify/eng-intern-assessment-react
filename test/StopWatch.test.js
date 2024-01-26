//TEST INSPIRED BY THE eng-intern-assessment-react-native-main

//Import required modules
import React from 'react'
import {fireEvent, render, act} from '@testing-library/react';
import StopWatch from '../src/StopWatch';

//Enable a timer mock from Jest that allows forward/rewinding time or test
jest.useFakeTimers();

describe('StopWatch', () => {

  //Rendering Test: Renders React element to DOM and expects the timer to be present
  test('Initial Rendering: ', () => {
    render(<Stopwatch />);
    expect(getByText("00:00:00.000")).toBeTruthy();

  });

  test('Handling Start and Stop and Resume', () => {
    render(<Stopwatch />);

    //Simulate timer starting on the 'Start' button;
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    expect(getByText("Stop")).toBeTruth();
    act(()  => jest.advancetimersByTime(1000));
    expect(queryByText('00:00:01.000')).toBeTruthy();

    //Simulate timer stopping on the 'Stop' button;
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);
    expect(getByText("Resume")).toBeTruthy();
    act(()  => jest.advancetimersByTime(1000));
    expect(queryByText('00:00:01.000')).toBeTruthy();

  });

  //Simulate the timer on Reset Button
  test('Handling Reset', () => {
    render(<StopWatch />)

    //Start simulating the Start Button first
    const startbutton = getByTest('Start');
    fireEvent.click(startButton);
    act(()  => jest.advancetimersByTime(1000));


    const resetButton = getByTest('Reset');
    fireEvent.click(resetButton);
    expect(queryByText('00:00:00.000')).toBeTruthy();

  });

  test ('Handling Lap', () => {
    render(<StopWatch />);
    const startbutton = getByTest('Start');
    fireEvent.click(startButton);
    act(()  => jest.advancetimersByTime(1000));


    const lapButton = getByTest('Lap');
    fireEvent.click(lapButton);
    expect(getAllByText(/^Lap \d:/).length).toBe(2);

  });
});
