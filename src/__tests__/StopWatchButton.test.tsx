// StopWatchButton.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton'; // Adjust the import path

describe('StopWatchButton component tests', () => {
  const mockRecordLapTime = jest.fn();
  const mockSetRunning = jest.fn();
  const mockResetTimer = jest.fn();
  const mockTimer = 100; // Example timer value

  it('render Start and Reset buttons when the timer is not running', () => {
    const { queryByTestId } = render(
      <StopWatchButton
        running={false}
        recordLapTime={mockRecordLapTime}
        setRunning={mockSetRunning}
        resetTimer={mockResetTimer}
        timer={mockTimer}
      />
    );

    const startButton = queryByTestId('startButtonTest');
    expect(startButton).toBeDefined();
    const resetButton = queryByTestId('resetButtonTest');
    expect(resetButton).toBeDefined();
  });

  it('don\'t render Start and Reset buttons when timer in running', () => {
    const { queryByTestId } = render(
      <StopWatchButton
        running={true}
        recordLapTime={mockRecordLapTime}
        setRunning={mockSetRunning}
        resetTimer={mockResetTimer}
        timer={mockTimer}
      />
    );

    const startButton = queryByTestId('startButtonTest');
    expect(startButton).toBe(null);
    const resetButton = queryByTestId('resetButtonTest');
    expect(resetButton).toBe(null);
  });

  it('render Stop and Lap buttons when the timer is not running', () => {
    const { queryByTestId } = render(
      <StopWatchButton
        running={true}
        recordLapTime={mockRecordLapTime}
        setRunning={mockSetRunning}
        resetTimer={mockResetTimer}
        timer={mockTimer}
      />
    );

    const lapButton = queryByTestId('lapButtonTest');
    expect(lapButton).toBeDefined();
    const stopButton = queryByTestId('stopButtonTest');
    expect(stopButton).toBeDefined();
  });

  it('don\'t render  Stop and Lap buttons when timer in running', () => {
    const { queryByTestId } = render(
      <StopWatchButton
        running={false}
        recordLapTime={mockRecordLapTime}
        setRunning={mockSetRunning}
        resetTimer={mockResetTimer}
        timer={mockTimer}
      />
    );

    const lapButton = queryByTestId('lapButtonTest');
    expect(lapButton).toBe(null);
    const stopButton = queryByTestId('stopButtonTest');
    expect(stopButton).toBe(null);
  });
});
