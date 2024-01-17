// StopWatchButton.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton'; // Adjust the import path

describe('StopWatchButton component tests', () => {
  const mockRecordLapTime = jest.fn();
  const mockSetRunning = jest.fn();
  const mockResetTimer = jest.fn();
  const mockTimer = 100;

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

  it('test Start button to call setRunning(true) when clicked and start the timer', () => {
    const setRunning = jest.fn();
    const { queryByTestId } = render(
        <StopWatchButton
            running={false}
            recordLapTime={mockRecordLapTime}
            setRunning={setRunning}
            resetTimer={mockResetTimer}
            timer={mockTimer}
        />
    );
    const startButton = queryByTestId('startButtonTest');
    fireEvent.click(startButton);
    expect(setRunning).toHaveBeenCalledTimes(1);
    expect(setRunning).toHaveBeenCalledWith(true);
  })

  it('test Stop button to call setRunning(false) when clicked and stop the timer', () => {
    const setRunning = jest.fn();
    const { queryByTestId } = render(
        <StopWatchButton
            running={true}
            recordLapTime={mockRecordLapTime}
            setRunning={setRunning}
            resetTimer={mockResetTimer}
            timer={mockTimer}
        />
    );
    const stopButton = queryByTestId('stopButtonTest');
    fireEvent.click(stopButton);
    expect(setRunning).toHaveBeenCalledTimes(1);
    expect(setRunning).toHaveBeenCalledWith(false);
  })

  it('test Reset button to call resetTimer() when clicked and reset the timer', () => {
    const resetTimer = jest.fn();
    const { queryByTestId } = render(
        <StopWatchButton
            running={false}
            recordLapTime={mockRecordLapTime}
            setRunning={mockSetRunning}
            resetTimer={resetTimer}
            timer={mockTimer}
        />
    );
    const resetButton = queryByTestId('resetButtonTest');
    fireEvent.click(resetButton);
    expect(resetTimer).toHaveBeenCalledTimes(1);
  })

  it('test Lap button to call recordLapTime() when clicked to add a lap time into the tracker', () => {
    const recordLapTime = jest.fn();
    const { queryByTestId } = render(
        <StopWatchButton
            running={true}
            recordLapTime={recordLapTime}
            setRunning={mockSetRunning}
            resetTimer={mockResetTimer}
            timer={mockTimer}
        />
    );
    const lapButton = queryByTestId('lapButtonTest');
    fireEvent.click(lapButton);
    expect(recordLapTime).toHaveBeenCalledTimes(1);
  })
});
