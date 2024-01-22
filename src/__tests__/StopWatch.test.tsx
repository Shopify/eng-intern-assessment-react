import React from 'react';
import { render, fireEvent, screen, act, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../components/StopWatch';

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

  test('starts and stops the stopwatch', async () => {
    const {getByText} = render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('Start'));
    });

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    act(() => {
      fireEvent.click(screen.getByText('Stop'));
    });

    const clockDisplay = document.querySelector('.clock-display');
        expect(clockDisplay.textContent).toMatch(/00:00:01/);
  });

  test('resets the stopwatch', async () => {
    render(<StopWatch />);

    act(() => {
      fireEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(1000); 
    });

    act(() => {
      fireEvent.click(screen.getByText('Stop'));
    });

    act(() => {
      fireEvent.click(screen.getByText('Reset'));
    });

    // Check if the stopwatch shows the initial time
    await waitFor(() => {
      expect(screen.getByText(/00:00:00/)).toBeInTheDocument();
    });
  });

  test('records laps', async () => {
    render(<StopWatch />);

    // Start the stopwatch and record a lap
    act(() => {
      fireEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(1000); 
    });

    act(() => {
      fireEvent.click(screen.getByText('Lap'));
    });

    // Check if the lap is recorded
    await waitFor(() => {
      expect(screen.getByText('Lap #1')).toBeInTheDocument();
    });
  });
});
