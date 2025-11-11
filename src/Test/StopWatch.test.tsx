/**
 * Unit Test for StopWatch Component
 * Testing the state of the component and functionalites of the StopWatch include the following
 * starts, stops, record laps and reset
 *
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../StopWatch';

describe('StopWatch Component Tests', () => {
  // Using fake timers to control time-dependent behavior
  jest.useFakeTimers();

  //   Test to ensure the initial state are correct
  it('renders correctly with initial state', () => {
    const { getByText } = render(<StopWatch />);
    //Intitial time should be 00:00:00
    expect(getByText(/00:00:00/)).toBeInTheDocument();
    //Start button should be visible
    expect(getByText(/Start/)).toBeInTheDocument();
  });

  //Test to ensure timer works when Start button is clicked
  it('starts timer on start button click', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    act(() => {
      //Run timer for 1 second
      jest.advanceTimersByTime(1000);
    });
    // Check if display update correctly after 1 second.
    expect(getByText(/00:01:00/)).toBeInTheDocument();
    // Lap button should be rendered
    expect(getByText(/Lap/)).toBeInTheDocument();
  });

  // Test to ensure timer stop when Stop button is clicked
  it('stops timer on stop button click', () => {
    const { getByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    //Run timer for 1 second after Start button is clicked
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    //Stop button is clicked after 1 second
    fireEvent.click(getByText('Stop'));
    //Timer should display 1 second.
    const initialTime = getByText(/00:01:00/).textContent;
    //Advancing the timer by 2 second.
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    //The timer display should not be changed.
    expect(getByText(initialTime)).toBeInTheDocument();
    //Reset button should be rendered.
    expect(getByText(/Reset/)).toBeInTheDocument();
  });

  //Test to ensure a lap time is recored by clicking Lap button.
  it('adds lap on lap button click', () => {
    const { getByText, getAllByText } = render(<StopWatch />);
    fireEvent.click(getByText('Start'));
    //Advancing 1.5 seconds after Clicking Start button
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    fireEvent.click(getByText('Lap'));
    //Check if timer display 1.5 seconds is recored fater Lap is clicked
    expect(getAllByText(/00:01:50/).length).toBeGreaterThan(0);
  });

  //To check if timer reset on clicking Reset button.
  it('resets timer on reset button click', () => {
    const { getByText } = render(<StopWatch />);
    //Click Start button, advance timer for 3 second, then Click Stop, Timer should display 3 seconds.
    fireEvent.click(getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(getByText('Stop'));
    expect(getByText(/00:03:00/)).toBeInTheDocument();
    //Click Reset button, display should be reset to 0.
    fireEvent.click(getByText('Reset'));
    expect(getByText(/00:00:00/)).toBeInTheDocument();
  });
});
