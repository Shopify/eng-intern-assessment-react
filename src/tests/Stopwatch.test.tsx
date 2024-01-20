import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Stopwatch from '../StopWatch';
import useStopwatch from '../hooks/useStopwatch';

jest.mock('../hooks/useStopwatch', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    time: 0,
    isRunning: false,
    laps: [],
    start: jest.fn(),
    stop: jest.fn(),
    lap: jest.fn(),
    reset: jest.fn(),
  })),
}));

describe('Stopwatch', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Stopwatch />);
    expect(screen.getByText(/0:0:0.0/)).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('start button triggers start function', () => {
    render(<Stopwatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(jest.mocked(useStopwatch).mock.results[0].value.start).toHaveBeenCalled();
  });

  it('stop button triggers stop function', () => {
    render(<Stopwatch />);
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    expect(jest.mocked(useStopwatch).mock.results[0].value.stop).toHaveBeenCalled();
  });

  it('lap button triggers lap function when stopwatch is running', () => {

    jest.mocked(useStopwatch).mockImplementation(() => ({
      time: 0,
      lapTime: 0,
      isRunning: true, // Simulate running stopwatch
      laps: [],
      milliseconds: 0,
      start: jest.fn(),
      stop: jest.fn(),
      lap: jest.fn(),
      reset: jest.fn(),
    }));

    render(<Stopwatch />);
    const lapButton = screen.getByText('Lap');
    fireEvent.click(lapButton);

    expect(jest.mocked(useStopwatch).mock.results[0].value.lap).toHaveBeenCalled();
  });


  it('reset button triggers reset function', () => {
    render(<Stopwatch />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(jest.mocked(useStopwatch).mock.results[0].value.reset).toHaveBeenCalled();
  });
  

});
