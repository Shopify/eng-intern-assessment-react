import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import StopWatch from '../StopWatch';

// jest.useFakeTimers();

// Timeout function to test stopwatch
const timeout = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

describe('StopWatch', () => {
  describe('Initial state', () => {
    it('has buttons for start/stop, reset, and lap', () => {
      const { getAllByRole } = render(<StopWatch />);
      const button = getAllByRole('button');
      expect(button.length).toBe(3);
      expect(button[0].textContent).toContain('Start');
      expect(button[1].textContent).toContain('Reset');
      expect(button[2].textContent).toContain('Lap');
    });
    it('displays initial time of 0:00:00:00', () => {
      const { getByTestId } = render(<StopWatch />);
      const time = getByTestId('timer');
      expect(time.textContent).toContain('0:00:00:00');
    });
  });
  describe('Timer Functionality', () => {
    it('works to time 3 seconds', async () => {
      const { getByText, getByTestId } = render(<StopWatch />);
      act(async () => {
        const startStopButton = getByText('Start');
        fireEvent.click(startStopButton); // Start stopwatch
        await timeout(3000);
        // jest.advanceTimersByTime(1550);
        fireEvent.click(startStopButton); // Stop stopwatch
        const time = getByTestId('timer');
        expect(time.textContent).toContain('0:00:00:30');
      });
    }, 100000);
  });
  // describe('Lap Functionality', () => {
  //   it('has a lap at 1:00 seconds', () => {});
  //   it('has 3 laps at 1.00 second, 5.55 seconds, and 1:20:00 minutes with properly numbered laps', () => {});
  // });
});
