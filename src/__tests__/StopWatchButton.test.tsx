import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
});
