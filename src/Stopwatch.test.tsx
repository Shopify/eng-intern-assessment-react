/* 
  Testing file for the StopWatch using the React Testing Library
*/

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Stopwatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

describe('Stopwatch Component', () => {
  test('renders stopwatch component with initial time', () => {
    render(<Stopwatch isRunning={false} laps={[]} runningTime={0} />);
    const timeElement = screen.getByText(/00:00/i);
    expect(timeElement).toBeInTheDocument();
  });

  test('updates running time when started', () => {
    render(<Stopwatch isRunning={true} laps={[]} runningTime={0} />);
    const timeElement = screen.getByText(/00:01/i);
    expect(timeElement).toBeInTheDocument();
  });
});

describe('StopWatchButton Component', () => {
  test('renders start button when not running', () => {
    render(<StopWatchButton isRunning={false} onStartStopClick={() => {}} onResetLapClick={() => {}} />);
    const startButton = screen.getByText(/start/i);
    expect(startButton).toBeInTheDocument();
  });

  test('renders stop button when running', () => {
    render(<StopWatchButton isRunning={true} onStartStopClick={() => {}} onResetLapClick={() => {}} />);
    const stopButton = screen.getByText(/stop/i);
    expect(stopButton).toBeInTheDocument();
  });

  test('calls onStartStopClick when start button is clicked', () => {
    const onStartStopClickMock = jest.fn();
    render(<StopWatchButton isRunning={false} onStartStopClick={onStartStopClickMock} onResetLapClick={() => {}} />);
    const startButton = screen.getByText(/start/i);
    fireEvent.click(startButton);
    expect(onStartStopClickMock).toHaveBeenCalled();
  });

  test('calls onResetLapClick when reset button is clicked', () => {
    const onResetLapClickMock = jest.fn();
    render(<StopWatchButton isRunning={false} onStartStopClick={() => {}} onResetLapClick={onResetLapClickMock} />);
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    expect(onResetLapClickMock).toHaveBeenCalled();
  });
});
