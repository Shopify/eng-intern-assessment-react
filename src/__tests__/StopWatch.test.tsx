import React from 'react';
import { fireEvent, screen, render } from "@testing-library/react";
import StopWatch from '../components/StopWatch';

describe(StopWatch, () => {
  beforeEach(() => {
    render(<StopWatch isTimeRunning={false} setIsTimeRunning={()=>{}}/>);
  });

  test("Stop Watch starts time when the button that says 'Start' is clicked and stops time when 'Stop' button is clicked", () => {
    const startButton: HTMLElement = screen.getByText('Start');
    fireEvent.click(startButton);
    
    // Confirm stopwatch has started
    expect(startButton.textContent).toBe('Stop');
    fireEvent.click(startButton);

    // Confirm stopwatch has stopped
    expect(startButton.textContent).toBe('Start');
 
  });

  test("The Stop Watch resets", async() => {
    // Find the Start button and simulate a user clicking on it
    const startButton: HTMLElement = screen.getByText('Start');
    fireEvent.click(startButton);
    
    // Wait for the time to update (for a second to pass and re-render time)
    await new Promise((delay) => setTimeout(delay, 1100)); 
    expect(screen.getByText('00:00:01'));

    // Find the Reset Button and simulate a user clicking it
    const resetButton: HTMLElement = screen.getByText('Reset');
    fireEvent.click(resetButton);

    // Check to see if the time has actually reset
    expect(screen.getByText('00:00:00'));
  });

});