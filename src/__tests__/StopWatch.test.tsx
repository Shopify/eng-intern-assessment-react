import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../StopWatch';

test('starts, stops and resets the timer', async () => {
  render(<StopWatch />);
  const startButton = screen.getByText('Start'); // Get the start button
  const stopButton = screen.getByText('Stop'); // Get the stop button
  const resetButton = screen.getByText('Reset'); // Get the reset button
  const lapButton = screen.getByText('Lap'); // Get the lap button

  const countElement = screen.getByText('0'); // Get the count element
  expect(parseInt(countElement.textContent || '0', 10)).toBe(0); // Check if the count is 0

  // Click the start button
  fireEvent.click(startButton);

  // Used waitFor to wait for the count to be 2
  await waitFor(
    () => {
      const countAfterStart = screen.getByText(/\d+/); // Get the count element
      expect(parseInt(countAfterStart.textContent || '0', 10)).toBe(2); // Check if the count is 2
    },
    { timeout: 3000 }
  ); // Set a timeout of 3000 milliseconds (2 seconds)

  // Click the stop button
  fireEvent.click(stopButton);

  // check if the count is still 2
  const newCountElement = screen.getByText(/\d+/);
  // expect(newCountElement).toHaveTextContent(countElement.textContent);
  expect(parseInt(newCountElement.textContent || '0', 10)).toEqual(2);

  // Click the reset button
  fireEvent.click(resetButton);

  // check if the count is 0 after reset
  const resetElement = screen.getByText('0');
  expect(parseInt(resetElement.textContent || '0', 10)).toBe(0);

  // Used waitFor to wait for the count to be 0 and remain 0 after reset is clicked
  await waitFor(
    () => {
      const countAfterReset = screen.getByText(/\d+/); // Get the count element
      expect(parseInt(countAfterReset.textContent || '0', 10)).toBe(0); // Check if the count is 0 making sure it doesn't start again
    },
    { timeout: 3000 }
  ); // Set a timeout of 3000 milliseconds (2 seconds)
});
