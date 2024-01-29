import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopWatch from '../StopWatch';

test('renders the StopWatch component', () => {
  render(<StopWatch />);
  const stopWatchElement = screen.getByTestId('stopwatch');
  expect(stopWatchElement).toBeInTheDocument();
});

test('starts and stops the stopwatch', () => {
  render(<StopWatch />);
  const startStopButton = screen.getByTestId('start-stop-button');
  const timeDisplay = screen.getByTestId('time-display');

  // Initially, the stopwatch should be stopped
  expect(startStopButton).toHaveTextContent('Start');
  expect(timeDisplay).toHaveTextContent('00:00:00.00');

  // Click the Start button
  fireEvent.click(startStopButton);

  // After starting, the button should change to Stop
  expect(startStopButton).toHaveTextContent('Stop');

  // Click the Stop button
  fireEvent.click(startStopButton);

  // After stopping, the button should change back to Start
  expect(startStopButton).toHaveTextContent('Start');
});

test('records lap times', () => {
  render(<StopWatch />);
  const startStopButton = screen.getByTestId('start-stop-button');
  const lapButton = screen.getByTestId('lap-button');
  fireEvent.click(startStopButton);
  // Click the Lap button
  fireEvent.click(lapButton);

  // Check if a lap time is recorded and displayed
  const lapTimesList = screen.getByTestId('lap-times');
  expect(lapTimesList.children.length).toBe(1);
});

test('resets the stopwatch', () => {
  render(<StopWatch />);
  const resetButton = screen.getByTestId('reset-button');

  // Click the Reset button
  fireEvent.click(resetButton);

  // Check if the time is reset to 00:00:00.00
  const timeDisplay = screen.getByTestId('time-display');
  expect(timeDisplay).toHaveTextContent('00:00:00.00');

  // Check if lap times are cleared
  const lapTimesList = screen.getByTestId('lap-times');
  expect(lapTimesList.children.length).toBe(0);
});
