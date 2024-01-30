// StopWatchButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';

describe('StopWatchButton', () => {
  it('should set isRunning to true when Start button is clicked', () => {
    // Mock the setTimeInSec function
    const setTimeInSecMock = jest.fn();

    // Render the component
    const { getByText } = render(<StopWatchButton setTimeInSec={setTimeInSecMock} timeInSec={0} />);

    // Find the Start button and click it
    const startButton = getByText('Start');
    fireEvent.click(startButton);

    // Check if isRunning is set to true
    expect(setTimeInSecMock).toHaveBeenCalledTimes(0); // Ensure setTimeInSec is not called immediately
    expect(setTimeInSecMock).toHaveBeenCalledTimes(1); // Ensure setTimeInSec is called during the interval
  });

  it('should set isRunning to false when Stop button is clicked', () => {
    // Mock the setTimeInSec function
    const setTimeInSecMock = jest.fn();

    // Render the component
    const { getByText } = render(<StopWatchButton setTimeInSec={setTimeInSecMock} timeInSec={0} />);

    const startButton = getByText('Start');
    fireEvent.click(startButton);

    // Find and click the Stop button
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);

    // Check if isRunning is set to false
    expect(setTimeInSecMock).toHaveBeenCalledTimes(0); // Ensure setTimeInSec is not called during the interval
  });

  it('should set isRunning to false and reset time when Reset button is clicked', () => {
    // Mock the setTimeInSec function
    const setTimeInSecMock = jest.fn();

    // Render the component
    const { getByText } = render(<StopWatchButton setTimeInSec={setTimeInSecMock} timeInSec={0} />);

    // Click the Reset button
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);

    // Check if isRunning is set to false and setTimeInSec is called with 0
    expect(setTimeInSecMock).toHaveBeenCalledTimes(1);
    expect(setTimeInSecMock).toHaveBeenCalledWith(0);
  });

  it('should add lap time when Lap button is clicked', () => {
    // Mock the setTimeInSec function
    const setTimeInSecMock = jest.fn();

    // Render the component
    const { getByText } = render(<StopWatchButton setTimeInSec={setTimeInSecMock} timeInSec={20} />);

    // Click the Lap button
    const lapButton = getByText('Lap');
    fireEvent.click(lapButton);

    // Check if setLaps is called with the correct lap time
    const lapsContainer = getByText('Lap');
    expect(lapsContainer).toContain('Lap 1 00:00:20');
  });
  
});
