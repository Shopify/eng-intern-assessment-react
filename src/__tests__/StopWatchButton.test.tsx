import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import React from 'react';

describe('StopWatchButton', () => {
  //Tests for button functionality
  
  it('should start the stopwatch on start button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} />
    );
  
    fireEvent.click(getByTitle('start'));
  
     waitFor(() => {
        expect(setTimeInSecondsMock).toHaveBeenCalled();
      });
  });

  it('should stop the stopwatch on stop button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} />
    );
  
    fireEvent.click(getByTitle('stop'));
  
     waitFor(() => { 
        expect(setTimeInSecondsMock).not.toHaveBeenCalled();
      });
  });

  it('should reset the stopwatch on reset button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={1000} />
    );
  
    fireEvent.click(getByTitle('reset'));
  
     waitFor(() => {
        expect(setTimeInSecondsMock).toHaveBeenCalledWith(0);
      });
  });

  it('should add a lap on lap button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={1000} />
    );
  
    fireEvent.click(getByTitle('lap'));
  
     waitFor(() => { 
        expect(screen.getByText(/Lap 1:/)).toBeDefined
      });
  });
})