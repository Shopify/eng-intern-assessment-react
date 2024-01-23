import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('renders App component', () => {
  render(<App />);
  // Add assertions as needed
});

test('starts, stops, resets, and records lap correctly', () => {
  render(<App />);

  // Find and click the "Start" button
  fireEvent.click(screen.getByText('Start'));

  // Add assertions to check that the timer is running (you can check the rendered time as well)

  // Find and click the "Stop" button
  fireEvent.click(screen.getByText('Stop'));

  // Add assertions to check that the timer has stopped

  // Find and click the "Reset" button
  fireEvent.click(screen.getByText('Reset'));

  // Add assertions to check that the timer has reset

  // Find and click the "Lap" button
  fireEvent.click(screen.getByText('Lap'));

  // Add assertions to check that the lap has been recorded (check the lap list, etc.)

  // Optionally, you can repeat the process for multiple laps
  // fireEvent.click(screen.getByText('Lap'));

  // Add assertions for additional laps

  // Continue with additional tests as needed
});
