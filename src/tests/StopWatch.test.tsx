import React from 'react';
import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import StopWatch from '../components/StopWatch';
import { act } from 'react-dom/test-utils';

describe(StopWatch, () => {
  beforeEach(() => {
    render(<StopWatch isTimeRunning={false} setIsTimeRunning={()=>{}}/>);
  });

  it("Stop Watch starts time when the button that says 'Start' is clicked and stops time when 'Stop' button is clicked", async() => {
    const startButton = screen.getByText('Start');
    // expect(startButton);
    
    // fireEvent.click(startButton);
    
    // await new Promise((delay) => setTimeout(delay, 1100)); //1100 because of the time it takes to re render
    // expect(screen.getByText('00:00:01'));   
    
    // const stopButton = screen.getByText('Stop');
    // fireEvent.click(stopButton);

    // await new Promise((delay) => setTimeout(delay, 3000)); //Delay 3 seconds to see that the time is paused

    // expect(screen.getByText('00:00:01'));

    fireEvent.click(startButton);
    
    // Confirm stopwatch has started
    expect(startButton.textContent).toBe('Stop');
    await new Promise((delay) => setTimeout(delay, 1100)); //1100 because of the time it takes to re render

    fireEvent.click(startButton);
    // Confirm stopwatch has stopped
    expect(startButton.textContent).toBe('Start');
    expect(screen.getByText('00:00:01'));
  });

});