import '@testing-library/jest-dom'
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopwatchButton from '../StopWatchButton';


describe('StopwatchButton component', () => {
  test('renders Start button when not running', () => {
    const isRunning = false;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={() => {}}
        onResetLap={() => {}}
      />
    );

    const startButton = getByText('Start');
    expect(startButton).toBeInTheDocument();
  });

  test('renders Stop button when running', () => {
    const isRunning = true;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={() => {}}
        onResetLap={() => {}}
      />
    );

    const stopButton = getByText('Stop');
    expect(stopButton).toBeInTheDocument();
  });

  test('triggers onStartStop callback when Start/Stop button is clicked', () => {
    const onStartStopMock = jest.fn();
    const isRunning = false;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={onStartStopMock}
        onResetLap={() => {}}
      />
    );

    const startButton = getByText('Start');
    fireEvent.click(startButton);

    expect(onStartStopMock).toHaveBeenCalled();
  });

  test('renders Reset button when not running', () => {
    const isRunning = false;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={() => {}}
        onResetLap={() => {}}
      />
    );

    const resetButton = getByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });

  test('renders Lap button when running', () => {
    const isRunning = true;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={() => {}}
        onResetLap={() => {}}
      />
    );

    const lapButton = getByText('Lap');
    expect(lapButton).toBeInTheDocument();
  });

  test('triggers onResetLap callback when Reset/Lap button is clicked', () => {
    const onResetLapMock = jest.fn();
    const isRunning = false;

    const { getByText } = render(
      <StopwatchButton
        isRunning={isRunning}
        onStartStop={() => {}}
        onResetLap={onResetLapMock}
      />
    );

    const resetLapButton = getByText('Reset');
    fireEvent.click(resetLapButton);

    expect(onResetLapMock).toHaveBeenCalled();
  });
});
