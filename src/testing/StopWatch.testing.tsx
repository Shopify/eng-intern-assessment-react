import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../StopWatch';

jest.useFakeTimers();

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('renders Stopwatch component', () => {
    render(<Stopwatch />);
    expect(screen.getByText('Stopwatch')).toBeInTheDocument();
  });

  test('starts, stops, and resets stopwatch', () => {
    render(<Stopwatch />);

    // Start
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('00:00.000')).toBeInTheDocument();

    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01.000')).toBeInTheDocument();

    // Stop
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('00:01.000')).toBeInTheDocument(); // Should not change while stopped

    // Reset
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  test('records laps', () => {
    render(<Stopwatch />);

    // Start
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 500 milliseconds
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Lap
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('00:00.500')).toBeInTheDocument();
    expect(screen.getByText('Laps')).toBeInTheDocument();
    expect(screen.getByText('00:00.500')).toBeInTheDocument();

    // Advance time by another 500 milliseconds
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Lap again
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('00:01.000')).toBeInTheDocument();
    expect(screen.getByText('Laps')).toBeInTheDocument();
    expect(screen.getAllByText('00:00.500').length).toBe(2);
  });
});
