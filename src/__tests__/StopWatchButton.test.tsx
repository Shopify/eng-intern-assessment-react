import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import React from 'react';

describe('StopWatchButton', () => {
  
  it('should start the stopwatch on start button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('start'));
  
     waitFor(() => {
        expect(setTimeInSecondsMock).toHaveBeenCalledWith(true);
      });
  });

  it('should stop the stopwatch on stop button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('stop'));
  
     waitFor(() => { 
        expect(setTimeInSecondsMock).toHaveBeenCalledWith(false);
      });
  });

  it('should reset the stopwatch on reset button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={1000} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('reset'));
  
     waitFor(() => {
        expect(setTimeInSecondsMock).toHaveBeenCalledWith(0);
      });
  });

  it('should add a lap on lap button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={1000} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('lap'));
  
     waitFor(() => { 
        expect(screen.getByText(/Lap 1:/)).toBeDefined
      });
  });

  it('should add a lap only when the time is greater than 0', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} setTimerOn={setTimerOnMock}/>
    );

    fireEvent.click(getByTitle('lap'));

    expect(setTimeInSecondsMock).not.toHaveBeenCalled;
    expect(setTimerOnMock).not.toHaveBeenCalled;
  });
})