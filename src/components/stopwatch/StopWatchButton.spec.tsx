/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatchButton from './StopWatchButton';

const mockOnResume = jest.fn();
const mockOnPause = jest.fn();
const mockOnReset = jest.fn();
const mockOnLap = jest.fn();

describe('StopWatchButton', () => {
  beforeEach(() => {
    mockOnResume.mockClear();
    mockOnPause.mockClear();
    mockOnReset.mockClear();
    mockOnLap.mockClear();
  });

  test('renders the buttons properly', () => {
    const {getByTestId} = render(
      <StopWatchButton
        onResume={mockOnResume}
        onPause={mockOnPause}
        onReset={mockOnReset}
        onLap={mockOnLap}
      />,
    );

    expect(getByTestId('start-button')).toBeInTheDocument();
    expect(getByTestId('pause-button')).toBeInTheDocument();
    expect(getByTestId('reset-button')).toBeInTheDocument();
    expect(getByTestId('lap-button')).toBeInTheDocument();
  });

  test('calls onResume when start button is clicked', () => {
    const {getByTestId} = render(
      <StopWatchButton
        onResume={mockOnResume}
        onPause={mockOnPause}
        onReset={mockOnReset}
        onLap={mockOnLap}
      />,
    );
    const startButton = getByTestId('start-button');

    startButton.click();

    expect(mockOnResume).toHaveBeenCalledTimes(1);
    expect(mockOnPause).toHaveBeenCalledTimes(0);
    expect(mockOnReset).toHaveBeenCalledTimes(0);
    expect(mockOnLap).toHaveBeenCalledTimes(0);
  });

  test('calls onPause when pause button is clicked', () => {
    const {getByTestId} = render(
      <StopWatchButton
        onResume={mockOnResume}
        onPause={mockOnPause}
        onReset={mockOnReset}
        onLap={mockOnLap}
      />,
    );
    const pauseButton = getByTestId('pause-button');

    pauseButton.click();

    expect(mockOnResume).toHaveBeenCalledTimes(0);
    expect(mockOnPause).toHaveBeenCalledTimes(1);
    expect(mockOnReset).toHaveBeenCalledTimes(0);
    expect(mockOnLap).toHaveBeenCalledTimes(0);
  });

  test('calls onReset when reset button is clicked', () => {
    const {getByTestId} = render(
      <StopWatchButton
        onResume={mockOnResume}
        onPause={mockOnPause}
        onReset={mockOnReset}
        onLap={mockOnLap}
      />,
    );
    const resetButton = getByTestId('reset-button');

    resetButton.click();

    expect(mockOnResume).toHaveBeenCalledTimes(0);
    expect(mockOnPause).toHaveBeenCalledTimes(0);
    expect(mockOnReset).toHaveBeenCalledTimes(1);
    expect(mockOnLap).toHaveBeenCalledTimes(0);
  });

  test('calls onLap when lap button is clicked', () => {
    const {getByTestId} = render(
      <StopWatchButton
        onResume={mockOnResume}
        onPause={mockOnPause}
        onReset={mockOnReset}
        onLap={mockOnLap}
      />,
    );
    const lapButton = getByTestId('lap-button');

    lapButton.click();

    expect(mockOnResume).toHaveBeenCalledTimes(0);
    expect(mockOnPause).toHaveBeenCalledTimes(0);
    expect(mockOnReset).toHaveBeenCalledTimes(0);
    expect(mockOnLap).toHaveBeenCalledTimes(1);
  });
});
