import { render, fireEvent, waitFor } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import React from 'react';

describe('StopWatchButton', () => {
  
  it('should start the stopwatch on start button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const timeInSeconds = 0;
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={timeInSeconds} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('start'));
  
     waitFor(() => {
        expect(timeInSeconds).toBeGreaterThan(0);
      });
  });

  it('should stop the stopwatch on stop button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} setTimerOn={setTimerOnMock}/>
    );
    fireEvent.click(getByTitle('start'));
    fireEvent.click(getByTitle('stop'));
  
     waitFor(() => { 
        expect(setTimerOnMock).toBe(false);
      });
  });

  it('should reset the stopwatch on reset button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const timeInSeconds = 1000;
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={timeInSeconds} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('reset'));
  
     waitFor(() => {
        expect(timeInSeconds).toBe(0);
      });
  });

  it('should add a lap to lap-container on lap button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle, getAllByTestId } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={1000} setTimerOn={setTimerOnMock}/>
    );
  
    fireEvent.click(getByTitle('lap'));
  
     waitFor(() => { 
        const lapTimes = getAllByTestId('lap-item');
        expect(lapTimes.length).toBeGreaterThan(0);

        lapTimes.forEach((lapTime, index) => {
          const idAttribute = lapTime.getAttribute('id');
          expect(idAttribute).toBe(`round-${index + 1}`);
        })
      });
  });

  it('should add a lap only when the time is greater than 0', () => {
    const setTimeInSecondsMock = jest.fn();
    const setTimerOnMock = jest.fn();
    const { getByTitle, getAllByTestId } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} setTimerOn={setTimerOnMock}/>
    );

    fireEvent.click(getByTitle('lap'));

    waitFor(() => {
      const lapTimes = getAllByTestId('lap-item');
      expect(lapTimes.length).toBe(0)
    })
  });
})