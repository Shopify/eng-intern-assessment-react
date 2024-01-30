import React from 'react'
import {fireEvent, render, act} from '@testing-library/react'
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';
import '@testing-library/jest-dom'


jest.useFakeTimers();

describe('StopWatch', () => {

//this tests checks to see if the initial time is actually set to zero
  it('initalized time at 0', () => {
    const { getByText } = render(<StopWatch />);
    expect(getByText('0:00:00:00')).toBeInTheDocument();
  });

//this test checks start start/stop functionality
  it('start/stops functionality', () => {
    const { getByText } = render(<StopWatch />);
    const startStopButton = getByText('Start');
    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(1000); 
    });
    expect(getByText(/1:/)).toBeInTheDocument();
    fireEvent.click(startStopButton);
    act(() => {
      jest.advanceTimersByTime(1000); 
    });
    expect(getByText(/1:/)).toBeInTheDocument(); 
  });
});

describe('StopWatchButton', () => {

    //checks to see if the buttons show up as they should
  it('button rendering test', () => {
    const { getByText } = render(
      <StopWatchButton active={false} startStop={() => {}} reset={() => {}} laps={() => {}} />
    );
    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
    expect(getByText('Laps')).toBeInTheDocument();
  });

  //checks functionality of lap button
  it('lap button functionality', () => {
  const { getByText, getAllByText } = render(<StopWatch />);
  const startStopButton = getByText('Start');
  const lapButton = getByText('Laps');
  fireEvent.click(startStopButton);
  act(() => {
    jest.advanceTimersByTime(1000); 
  });
  fireEvent.click(lapButton);
  //expects 1 laptime 
  const lapTimes = getAllByText(/^Lap \d: \d{1,2}:\d{2}:\d{2}:\d{2}$/);
  expect(lapTimes.length).toBe(1); 
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  fireEvent.click(lapButton);
  expect(getAllByText(/^Lap \d: \d{1,2}:\d{2}:\d{2}:\d{2}$/).length).toBe(2);
});
});