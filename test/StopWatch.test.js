//TEST INSPIRED BY THE eng-intern-assessment-react-native-main/test/StopWatch.test.js

//Import required modules
import React from 'react'
import {fireEvent, render, act} from '@testing-library/react';
import StopWatch from '../src/StopWatch';

//Enable a timer mock from Jest that allows forward/rewinding time or test
jest.useFakeTimers();

describe('StopWatch', () => {

  //Rendering Test: Renders React element to DOM and checks for initial time 
  test('Initial Rendering: ', () => {
    const { getByText } = render(<StopWatch />);
    expect(getByText('00:00:00.00')).toBeTruthy();

  });

  //
  test('Handling Start and Stop and Resume', () => {
    const { getByText, queryByText } = render(<StopWatch />);

    //Simulate timer starting on the 'Start' button and ensures the time aligns with the 1 second advance
    fireEvent.click(getByText('Start'));
    act(()  => jest.advanceTimersByTime(1000));
    expect(queryByText('00:00:01.00')).toBeTruthy();

    //Simulate timer stopping on the 'Stop' button and ensure the time remains at the 1 second advance
    fireEvent.click(getByText('Stop'));
    expect(queryByText('00:00:01.00')).toBeTruthy();
  });

  //Simulate the timer on Reset Button
  test('Handling Reset', () => {
    const { getByText } = render(<StopWatch />);

    //Start simulating the Start Button first and advance by 1 second
    fireEvent.click(getByText('Start'));
    act(()  => jest.advanceTimersByTime(1000));

    //Checks if the 'Reset' button displays the 00:00:00.00 time
    fireEvent.click(getByText('Reset'));
    expect(getByText('00:00:00.00')).toBeTruthy();


  });

  //Simulating the lap button by advancing the timer by 1 second and ensuring the lap button displays the lap time.
  test ('Handling Lap', () => {
    const { getByText} = render(<StopWatch />);
    
    fireEvent.click(getByText('Start'));
    act(() => jest.advanceTimersByTime(1000));
    fireEvent.click(getByText('Lap'));

    expect(getByText('Lap 1: 00:00:01.00')).toBeTruthy();
  });
});
