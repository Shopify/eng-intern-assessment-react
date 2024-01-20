import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import React from 'react';

describe('StopWatchButton', () => {
  it('should start the stopwatch on start button click', () => {
    const setTimeInSecondsMock = jest.fn();
    const { getByTitle } = render(
      <StopWatchButton setTimeInSeconds={setTimeInSecondsMock} timeInSeconds={0} />
    );
  
    fireEvent.click(getByTitle('start'));
  
     waitFor(() => {
        // Assert that the timer has started (you might need to adjust this based on your actual implementation)
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
        // Assert that the timer has started (you might need to adjust this based on your actual implementation)
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
        // Assert that the timer has started (you might need to adjust this based on your actual implementation)
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
        // Assert that the timer has started (you might need to adjust this based on your actual implementation)
        expect(screen.getByText(/Lap 1:/)).toBeDefined
      });
  });
})