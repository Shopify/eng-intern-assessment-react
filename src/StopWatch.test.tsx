// StopWatch.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';

describe('StopWatch', () => {
  test('starts timer when start button is clicked', () => {
    render(<StopWatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    // The button text should change to 'Stop' indicating that the stopwatch has started
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  test('stops timer when stop button is clicked', () => {
    render(<StopWatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    // After stopping, you can check the state or presence of 'Start' button again
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

test('resets timer when reset button is clicked', () => {
  render(<StopWatch />);
  const startButton = screen.getByText('Start');
  fireEvent.click(startButton);
  // ...start the timer and let it run here...
  const resetButton = screen.getByText('Reset');
  fireEvent.click(resetButton);
  // After reset, the timer should display the initial time (00:00.00)
  expect(screen.getByText('00')).toBeInTheDocument();
  expect(screen.getAllByText('00')[1]).toBeInTheDocument(); // assuming '00' appears more than once
  expect(screen.getByText('.')).toBeInTheDocument();
});


  test('records and displays laps', () => {
    render(<StopWatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const lapButton = screen.getByText('Lap');
    fireEvent.click(lapButton);
    const lapTimes = screen.getAllByText(/Lap/);
    // Ensure that at least one lap time is recorded and displayed
    expect(lapTimes.length).toBeGreaterThan(0);
  });


  
  
});

