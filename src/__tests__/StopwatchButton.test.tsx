import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopwatchButton from '../StopwatchButton';

test('renders StopwatchButton component', () => {
  render(<StopwatchButton onStart={() => {}} onStop={() => {}} onReset={() => {}} onLap={() => {}} laps={[]} />);
  // Add assertions as needed
});

test('calls onStart, onStop, onReset, and onLap when buttons are clicked', () => {
  const onStart = jest.fn();
  const onStop = jest.fn();
  const onReset = jest.fn();
  const onLap = jest.fn();

  render(<StopwatchButton onStart={onStart} onStop={onStop} onReset={onReset} onLap={onLap} laps={[]} />);

  // Find and click each button
  fireEvent.click(screen.getByText('Start'));
  fireEvent.click(screen.getByText('Stop'));
  fireEvent.click(screen.getByText('Reset'));
  fireEvent.click(screen.getByText('Lap'));

  // Check if the respective functions are called
  expect(onStart).toHaveBeenCalled();
  expect(onStop).toHaveBeenCalled();
  expect(onReset).toHaveBeenCalled();
  expect(onLap).toHaveBeenCalled();
});

// Add more tests as needed
