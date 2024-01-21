import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../StopWatchButton';

describe('StopWatchButton component', () => {
  let getByText: (text: string) => HTMLElement,
    mockHandleStartPause: jest.Mock<void, []>,
    mockHandleReset: jest.Mock<void, []>,
    mockHandleLap: jest.Mock<void, []>,
    isPaused: boolean;

  beforeEach(() => {
    jest.clearAllMocks();

    mockHandleStartPause = jest.fn();
    mockHandleReset = jest.fn();
    mockHandleLap = jest.fn();
    isPaused = false; 

    ({ getByText } = render(
      <StopWatchButton
        handleStartPause={mockHandleStartPause}
        handleReset={mockHandleReset}
        handleLap={mockHandleLap}
        isPaused={isPaused}
      />
    ));
  });

  it('renders without crashing', () => {
    // just renders 
    // Add assertions for the initial state, styles, or content
    expect(getByText(isPaused ? 'Start' : 'Pause')).toHaveClass('custom-button', isPaused ? 'start-button' : 'pause-button');
    expect(getByText('Reset')).toHaveClass('custom-button','reset-button');
    expect(getByText('Lap')).toHaveClass('custom-button', 'lap-button');   
  });

  it('handles start/pause button click', () => {
    fireEvent.click(getByText(isPaused ? 'Start' : 'Pause'));
    expect(mockHandleStartPause).toHaveBeenCalledTimes(1);
  });

  it('handles reset button click', () => {
    fireEvent.click(getByText('Reset'));
    expect(mockHandleReset).toHaveBeenCalledTimes(1);
  });

  it('handles lap button click', () => {
    fireEvent.click(getByText('Lap'));
    expect(mockHandleLap).toHaveBeenCalledTimes(1);
  });
  // Styling tests:

  it('applies correct styles based on isPaused prop', () => {
    const button = getByText(isPaused ? 'Start' : 'Pause');
    expect(button).toHaveClass(isPaused ? 'start-button' : 'pause-button');
  });

  it('applies correct ARIA label based on isPaused prop', () => {
    const button = getByText(isPaused ? 'Start' : 'Pause');
    expect(button).toHaveAttribute('aria-label', isPaused ? 'Start' : 'Pause');
  });
  
  it('applies correct ARIA label for Reset button', () => {
    const button = getByText('Reset');
    expect(button).toHaveAttribute('aria-label', 'Reset');
  });
  
  it('applies correct ARIA label for Lap button', () => {
    const button = getByText('Lap');
    expect(button).toHaveAttribute('aria-label', 'Lap');
  });
});
