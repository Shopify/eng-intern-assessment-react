import React from 'react';
import { render, fireEvent, screen, act, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../StopWatch';

afterEach(() => {
  cleanup();
})

describe('StopWatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('start and stop/pause stopwatch', async () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('START'));
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(screen.getByText('STOP'));
    });

    const timeDisplay = document.querySelector('.time-display');
    expect(timeDisplay.textContent).toMatch(/00:00:01.00/);
  });

  test('reset stopwatch', async () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('START'));
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(screen.getByText('STOP'));
    });

    act(() => {
      fireEvent.click(screen.getByText('RESET'));
    });
    // Make a check that the reset button resets the stopwatch
    await waitFor(() => {
      expect(screen.getByText(/00:00:00.00/)).toBeInTheDocument();
    });
  });

  test('records 2 laps', async () => {
    render(<StopWatch />);
    // Start the stopwatch and record 2 laps
    act(() => {
      fireEvent.click(screen.getByText('START'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(screen.getByText('LAP'));
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      fireEvent.click(screen.getByText('LAP'));
    });
    // Check if the lap(s) is recorded - testing 2 laps
    await waitFor(() => {
      expect(screen.getByText('Lap 1 - 00:00:01.00')).toBeInTheDocument();
      expect(screen.getByText('Lap 2 - 00:00:02.00')).toBeInTheDocument();
    });
  });

  test('reset clears laps information', async () => {
    const { queryByText } = render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('START'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(screen.getByText('LAP'));
    });
    // Pre-check if Lap 1 is displayed
    await waitFor(() => {
      expect(screen.getByText('Lap 1 - 00:00:01.00')).toBeInTheDocument();
    });
    // Reset stopwatch
    act(() => {
      fireEvent.click(screen.getByText('RESET'));
    });
    // Check that Lap 1 is no longer in the document
    expect(queryByText('Lap 1 - 00:00:01.00')).toBeNull();
  });

  test('reset and lap button disabled prior to stopwatch start', async () => {
    render(<StopWatch />);
    // Check that the "Reset" and "Lap" buttons are initially disabled
    expect(screen.getByText('RESET')).toBeDisabled();
    expect(screen.getByText('LAP')).toBeDisabled();

    // Start the stopwatch
    act(() => {
      fireEvent.click(screen.getByText('START'));
    });
    // Check that the "Reset" and "Lap" buttons are enabled after starting the stopwatch
    expect(screen.getByText('RESET')).not.toBeDisabled();
    expect(screen.getByText('LAP')).not.toBeDisabled();
  });

  test('lap button disabled when stopwatch stopped, but reset enabled', async () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('START'));
    });

    act(() => {
      fireEvent.click(screen.getByText('STOP'));
    });
    
    expect(screen.getByText('LAP')).toBeDisabled();
    expect(screen.getByText('RESET')).not.toBeDisabled();
  });
});

