import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from './StopWatch';
import '@testing-library/jest-dom';



describe('StopWatch', () => {
  jest.useFakeTimers();

  test('starts timer when start button is clicked', async () => {
    render(<StopWatch />);
    const startButton = screen.getByTestId('toggle-timer-button');
    fireEvent.click(startButton);
  
    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer by 1 second
    });
  
    const timeDisplayContainer = screen.getByTestId("time-display");
    expect(timeDisplayContainer.textContent).toMatch(/00:01:00/); //  regex to match time after 1s
  });


  afterEach(() => {
    jest.clearAllTimers();
  });
});