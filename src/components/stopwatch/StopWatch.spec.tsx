/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, fireEvent, act, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatch from './StopWatch';

jest.useFakeTimers();

describe('StopWatch', () => {
  beforeEach(cleanup);

  test('renders the StopWatch component', () => {
    const {getByTestId} = render(<StopWatch />);
    const timerElement = getByTestId('timer-display');

    expect(timerElement).toBeInTheDocument();
    expect(timerElement).toHaveTextContent('00:00:00.00');
  });

  test('renders the StopWatchButton component', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const pauseButton = getByTestId('pause-button');
    const resetButton = getByTestId('reset-button');
    const lapButton = getByTestId('lap-button');

    expect(startButton).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(lapButton).toBeInTheDocument();
  });

  test('starts the stopwatch when start button is clicked', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');
  });

  test('pauses the stopwatch when pause button is clicked', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const pauseButton = getByTestId('pause-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(pauseButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');
  });

  test('resets the stopwatch when reset button is clicked', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const resetButton = getByTestId('reset-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');

    act(() => fireEvent.click(resetButton));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:00.00');

    // start again to make sure no state is left over
    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');
  });

  test('records a lap when lap button is clicked', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(lapButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('Lap 1')).toHaveTextContent('Lap 1: 00:00:01.00');
  });

  test('records multiple laps when lap button is clicked multiple times', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(lapButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(lapButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('Lap 1')).toHaveTextContent('Lap 1: 00:00:01.00');
    expect(getByTestId('Lap 2')).toHaveTextContent('Lap 2: 00:00:01.00');
  });

  test('resets laps when reset button is clicked', () => {
    const {getByTestId, queryByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');
    const resetButton = getByTestId('reset-button');

    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(lapButton));
    act(() => jest.advanceTimersByTime(3000));
    act(() => fireEvent.click(lapButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(queryByTestId('no-laps')).toEqual(null);
    expect(getByTestId('Lap 1')).toHaveTextContent('Lap 1: 00:00:01.00');
    expect(getByTestId('Lap 2')).toHaveTextContent('Lap 2: 00:00:03.00');

    act(() => fireEvent.click(resetButton));
    expect(getByTestId('no-laps')).toHaveTextContent('No laps recorded yet');
    expect(queryByTestId('Lap 1')).toEqual(null);
    expect(queryByTestId('Lap 2')).toEqual(null);
  });

  test('timer does not continue when paused', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const pauseButton = getByTestId('pause-button');

    // unpaused
    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    // paused
    act(() => fireEvent.click(pauseButton));
    act(() => jest.advanceTimersByTime(1000));
    // unpaused
    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    // paused
    act(() => fireEvent.click(pauseButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(startButton));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:02.00');
  });

  test('timer keeps running or stays paused after reset', () => {
    const {getByTestId} = render(<StopWatch />);
    const startButton = getByTestId('start-button');
    const pauseButton = getByTestId('pause-button');
    const resetButton = getByTestId('reset-button');

    // unpaused
    act(() => fireEvent.click(startButton));
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');

    // reset
    act(() => fireEvent.click(resetButton));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:00.00');

    // should still be unpaused
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:01.00');

    // reset
    act(() => fireEvent.click(pauseButton));
    act(() => fireEvent.click(resetButton));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:00.00');

    // should still be paused
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('timer-display')).toHaveTextContent('00:00:00.00');
  });
});
